import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDefaultTask } from "../../utils/getDefaultTask";
import { Dayjs } from "dayjs";
import { COLLECTION_NAME } from "../constants";

export const useAddNewTask = () => {
  const [user] = useAuthState(auth);

  const addNewTask = async (
    title: string,
    date: Dayjs,
    nextTaskSortingIndex: number
  ) => {
    const trimmedTitle = title.trim();

    if (user && trimmedTitle.length > 0) {
      await addDoc(
        collection(db, COLLECTION_NAME),
        getDefaultTask(trimmedTitle, user.uid, date, nextTaskSortingIndex)
      );
    }
  };

  return addNewTask;
};
