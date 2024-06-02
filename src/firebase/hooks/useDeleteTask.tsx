import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc, writeBatch } from "firebase/firestore";
import {
  RECURRING_TASKS_COLLECTION_NAME,
  TASKS_COLLECTION_NAME,
} from "../constants";
import { useTasksStore } from "../../state/useTasks";
import dayjs from "dayjs";

export const useDeleteTask = () => {
  const [user] = useAuthState(auth);

  const tasks = useTasksStore((state) => state.tasks);

  const deleteTask = async (taskId: string) => {
    if (user) {
      const taskRef = doc(db, TASKS_COLLECTION_NAME, taskId);
      await updateDoc(taskRef, {
        isDeleted: true,
      });
    }
  };

  const deleteAllLinkedTasks = async (recurringTaskId: string) => {
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
          });
        }
      }

      await batch.commit();
    }
  };

  const deleteFutureLinkedTasks = async (recurringTaskId: string) => {
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
          !task.initialDate.isBefore(dayjs(), "day")
        ) {
          const taskRef = doc(db, TASKS_COLLECTION_NAME, task.id);

          batch.update(taskRef, {
            isDeleted: true,
          });
        }
      }

      await batch.commit();
    }
  };

  return { deleteTask, deleteAllLinkedTasks, deleteFutureLinkedTasks };
};
