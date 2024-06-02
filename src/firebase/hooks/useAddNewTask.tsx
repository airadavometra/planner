import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDefaultTask } from "../../utils/getDefaultTasks";
import { Dayjs } from "dayjs";
import { TASKS_COLLECTION_NAME } from "../constants";
import { useCallback } from "react";

export const useAddNewTask = () => {
  const [user] = useAuthState(auth);

  const addNewTask = useCallback(
    async (title: string, date: Dayjs, nextTaskSortingIndex: number) => {
      const trimmedTitle = title.trim();

      if (user && trimmedTitle.length > 0) {
        await addDoc(
          collection(db, TASKS_COLLECTION_NAME),
          getDefaultTask(trimmedTitle, user.uid, date, nextTaskSortingIndex)
        );
      }
    },
    [user]
  );

  return addNewTask;
};
