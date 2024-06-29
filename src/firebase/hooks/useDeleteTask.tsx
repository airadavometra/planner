import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, writeBatch } from "firebase/firestore";
import {
  RECURRING_TASKS_COLLECTION_NAME,
  TASKS_COLLECTION_NAME,
} from "../constants";
import { useTasksStore } from "../../state/useTasks";
import { Dayjs } from "dayjs";
import { useCallback } from "react";
import { formatDateForDb } from "../../utils/dateFormatting";

export const useDeleteTask = () => {
  const [user] = useAuthState(auth);

  const { tasksMap, tasks } = useTasksStore((state) => ({
    tasksMap: state.tasksMap,
    tasks: state.tasks,
  }));

  const deleteTask = useCallback(
    async (taskId: string, date: Dayjs) => {
      if (user) {
        const tasks = tasksMap.get(formatDateForDb(date)) || [];

        const batch = writeBatch(db);

        const taskRef = doc(db, TASKS_COLLECTION_NAME, taskId);
        batch.update(taskRef, {
          isDeleted: true,
          sortingIndex: -1,
        });

        const otherTasks = tasks.filter((task) => task.id !== taskId);

        for (let index = 0; index < otherTasks.length; index++) {
          const itemRef = doc(db, TASKS_COLLECTION_NAME, otherTasks[index].id);
          batch.update(itemRef, {
            sortingIndex: index,
          });
        }

        await batch.commit();
      }
    },
    [tasksMap, user]
  );

  const deleteAllLinkedTasks = useCallback(
    async (recurringTaskId: string) => {
      if (user) {
        const batch = writeBatch(db);

        const recurringTaskRef = doc(
          db,
          RECURRING_TASKS_COLLECTION_NAME,
          recurringTaskId
        );

        batch.update(recurringTaskRef, {
          isDeleted: true,
        });

        for (const task of tasks) {
          if (task.linkedRecurringTaskId === recurringTaskId) {
            const taskRef = doc(db, TASKS_COLLECTION_NAME, task.id);

            batch.update(taskRef, {
              isDeleted: true,
              sortingIndex: -1,
            });

            const tasks = tasksMap.get(formatDateForDb(task.date)) || [];

            const otherTasks = tasks.filter((t) => t.id !== task.id);

            for (let index = 0; index < otherTasks.length; index++) {
              const itemRef = doc(
                db,
                TASKS_COLLECTION_NAME,
                otherTasks[index].id
              );
              batch.update(itemRef, {
                sortingIndex: index,
              });
            }
          }
        }

        await batch.commit();
      }
    },
    [user, tasks, tasksMap]
  );

  const deleteFutureLinkedTasks = useCallback(
    async (recurringTaskId: string, date: Dayjs) => {
      if (user) {
        const batch = writeBatch(db);

        const recurringTaskRef = doc(
          db,
          RECURRING_TASKS_COLLECTION_NAME,
          recurringTaskId
        );

        batch.update(recurringTaskRef, {
          isDeleted: true,
        });

        for (const task of tasks) {
          if (
            task.linkedRecurringTaskId === recurringTaskId &&
            !task.initialDate.isBefore(date, "day")
          ) {
            const taskRef = doc(db, TASKS_COLLECTION_NAME, task.id);

            batch.update(taskRef, {
              isDeleted: true,
              sortingIndex: -1,
            });

            const tasks = tasksMap.get(formatDateForDb(task.date)) || [];

            const otherTasks = tasks.filter((t) => t.id !== task.id);

            for (let index = 0; index < otherTasks.length; index++) {
              const itemRef = doc(
                db,
                TASKS_COLLECTION_NAME,
                otherTasks[index].id
              );
              batch.update(itemRef, {
                sortingIndex: index,
              });
            }
          }
        }

        await batch.commit();
      }
    },
    [user, tasks, tasksMap]
  );

  return { deleteTask, deleteAllLinkedTasks, deleteFutureLinkedTasks };
};
