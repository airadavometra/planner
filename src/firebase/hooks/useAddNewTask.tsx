import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, doc, writeBatch } from "firebase/firestore";
import { getDefaultTask } from "../../utils/getDefaultTasks";
import { Dayjs } from "dayjs";
import { TASKS_COLLECTION_NAME } from "../constants";
import { useCallback } from "react";
import { useTasksStore } from "../../state/useTasks";
import { formatDateForDb } from "../../utils/dateFormatting";

export const useAddNewTask = () => {
  const [user] = useAuthState(auth);
  const tasksMap = useTasksStore((state) => state.tasksMap);

  const addNewTask = useCallback(
    async (title: string, date: Dayjs) => {
      const trimmedTitle = title.trim();

      if (user && trimmedTitle.length > 0) {
        const tasks = (tasksMap.get(formatDateForDb(date)) || [])
          .filter((task) => !task.isDeleted)
          .sort((a, b) => a.sortingIndex - b.sortingIndex);

        const newTask = getDefaultTask(
          trimmedTitle,
          user.uid,
          date,
          tasks.length
        );

        const batch = writeBatch(db);

        const newTaskRef = doc(collection(db, TASKS_COLLECTION_NAME));
        batch.set(newTaskRef, newTask);

        await batch.commit();
      }
    },
    [tasksMap, user]
  );

  return addNewTask;
};
