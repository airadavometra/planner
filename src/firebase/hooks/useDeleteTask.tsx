import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { TASKS_COLLECTION_NAME } from "../constants";

export const useDeleteTask = () => {
  const [user] = useAuthState(auth);

  const deleteTask = async (taskId: string) => {
    if (user) {
      const taskRef = doc(db, TASKS_COLLECTION_NAME, taskId);
      await updateDoc(taskRef, {
        isDeleted: true,
      });
    }
  };

  return deleteTask;
};
