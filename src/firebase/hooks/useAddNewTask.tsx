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
        const newTask = getDefaultTask(trimmedTitle, user.uid, date, 0);

        const tasks = tasksMap.get(formatDateForDb(date)) || [];

        const batch = writeBatch(db);

        const newTaskRef = doc(collection(db, TASKS_COLLECTION_NAME));
        batch.set(newTaskRef, newTask);

        for (let index = 0; index < tasks.length; index++) {
          const itemRef = doc(db, TASKS_COLLECTION_NAME, tasks[index].id);
          batch.update(itemRef, {
            sortingIndex: index + 1,
          });
        }

        await batch.commit();
      }
    },
    [tasksMap, user]
  );

  return addNewTask;
};
