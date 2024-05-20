import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { COLLECTION_NAME } from "../constants";
import {
  formatDateForDb,
  parseDateFromInput,
} from "../../utils/dateFormatting";

export const useUpdateTask = () => {
  const [user] = useAuthState(auth);

  const updateTask = async (
    taskId: string,
    title: string,
    date: string,
    color: string,
    oldTitle: string
  ) => {
    if (user) {
      const taskRef = doc(db, COLLECTION_NAME, taskId);

      const newTaskTitle = title.trim();
      const newDate = parseDateFromInput(date);

      await updateDoc(taskRef, {
        title: newTaskTitle.length > 0 ? newTaskTitle : oldTitle,
        date: formatDateForDb(newDate),
        color: color,
      });
    }
  };

  return updateTask;
};
