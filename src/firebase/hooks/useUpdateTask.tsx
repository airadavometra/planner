import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { TASKS_COLLECTION_NAME } from "../constants";

export const useUpdateTask = () => {
  const [user] = useAuthState(auth);

  const updateTask = async (
    taskId: string,
    title: string,
    //date: string,
    color: string,
    oldTitle: string
  ) => {
    if (user) {
      const taskRef = doc(db, TASKS_COLLECTION_NAME, taskId);

      const newTaskTitle = title.trim();

      await updateDoc(taskRef, {
        title: newTaskTitle.length > 0 ? newTaskTitle : oldTitle,
        color: color,
      });
    }
  };

  return updateTask;
};
