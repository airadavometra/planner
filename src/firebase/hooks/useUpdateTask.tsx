import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, doc, updateDoc, writeBatch } from "firebase/firestore";
import {
  RECURRING_TASKS_COLLECTION_NAME,
  TASKS_COLLECTION_NAME,
} from "../constants";
import { reorderPlans } from "../../utils/reorderPlans";
import { formatDateForDb } from "../../utils/dateFormatting";
import { Dayjs } from "dayjs";
import { useTasksStore } from "../../state/useTasks";
import { moveTaskToAnotherDay } from "../../utils/moveTaskToAnotherDay";
import { getDefaultRecurringTask } from "../../utils/getDefaultTasks";
import { useCallback } from "react";
import { Task } from "../../types/task";

export const useUpdateTask = () => {
  const [user] = useAuthState(auth);
  const tasksMap = useTasksStore((state) => state.tasksMap);

  const completeTask = useCallback(
    async (taskId: string, date: Dayjs, isCompleted: boolean) => {
      if (user) {
        const tasks = tasksMap.get(formatDateForDb(date)) || [];

        const taskIndex = tasks.indexOf(
          tasks.find((task) => task.id === taskId)!
        );

        const newIndex = isCompleted ? tasks.length - 1 : 0;

        if (taskIndex === newIndex) {
          const taskRef = doc(db, TASKS_COLLECTION_NAME, taskId);

          await updateDoc(taskRef, {
            isCompleted: isCompleted,
          });
        } else {
          const batch = writeBatch(db);

          const reorderedPlans = reorderPlans(tasks, taskIndex, newIndex);

          for (let index = 0; index < reorderedPlans.length; index++) {
            const itemRef = doc(
              db,
              TASKS_COLLECTION_NAME,
              reorderedPlans[index].id
            );
            if (reorderedPlans[index].id === taskId) {
              batch.update(itemRef, {
                sortingIndex: index,
                isCompleted: isCompleted,
              });
            } else {
              batch.update(itemRef, {
                sortingIndex: index,
              });
            }
          }

          await batch.commit();
        }
      }
    },
    [user, tasksMap]
  );

  const changeTitle = useCallback(
    async (taskId: string, title: string) => {
      if (user) {
        const taskRef = doc(db, TASKS_COLLECTION_NAME, taskId);

        const newTaskTitle = title.trim();

        if (newTaskTitle.length > 0) {
          await updateDoc(taskRef, {
            title: newTaskTitle,
          });
        }
      }
    },
    [user]
  );

  const changeColor = useCallback(
    async (taskId: string, color: string) => {
      if (user) {
        const taskRef = doc(db, TASKS_COLLECTION_NAME, taskId);

        await updateDoc(taskRef, {
          color: color,
        });
      }
    },
    [user]
  );

  const changeDate = useCallback(
    async (taskId: string, oldDate: Dayjs, newDate: Dayjs) => {
      if (user) {
        const oldDayTasks = tasksMap.get(formatDateForDb(oldDate)) || [];

        const taskIndex = oldDayTasks.indexOf(
          oldDayTasks.find((task) => task.id === taskId)!
        );

        const newDayTasks = tasksMap.get(formatDateForDb(newDate)) || [];

        const [oldDayTasksMoved, newDayTasksMoved] = moveTaskToAnotherDay(
          oldDayTasks,
          newDayTasks,
          taskIndex,
          0,
          newDate
        );

        const batch = writeBatch(db);

        for (let index = 0; index < oldDayTasksMoved.length; index++) {
          const itemRef = doc(
            db,
            TASKS_COLLECTION_NAME,
            oldDayTasksMoved[index].id
          );
          batch.update(itemRef, {
            sortingIndex: index,
            date: formatDateForDb(oldDayTasksMoved[index].date),
          });
        }

        for (let index = 0; index < newDayTasksMoved.length; index++) {
          const itemRef = doc(
            db,
            TASKS_COLLECTION_NAME,
            newDayTasksMoved[index].id
          );
          batch.update(itemRef, {
            sortingIndex: index,
            date: formatDateForDb(newDayTasksMoved[index].date),
          });
        }

        await batch.commit();
      }
    },
    [user, tasksMap]
  );

  const addSchedule = useCallback(
    async (task: Task, schedule: string) => {
      if (user) {
        const batch = writeBatch(db);

        const trimmedTitle = task.title.trim();

        const recurringTask = getDefaultRecurringTask(
          trimmedTitle,
          user.uid,
          task.date,
          task.color,
          schedule
        );

        const recurringTaskRef = doc(
          collection(db, RECURRING_TASKS_COLLECTION_NAME)
        );
        batch.set(recurringTaskRef, recurringTask);

        const taskRef = doc(db, TASKS_COLLECTION_NAME, task.id);

        batch.update(taskRef, {
          linkedRecurringTaskId: recurringTaskRef.id,
          initialDate: formatDateForDb(task.date),
        });

        await batch.commit();
      }
    },
    [user]
  );

  return { completeTask, changeTitle, changeColor, changeDate, addSchedule };
};
