import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { TASKS_COLLECTION_NAME } from "../constants";

export const useDeleteTask = () => {
  const [user] = useAuthState(auth);

  const deleteTask = async (taskId: string) => {
    if (user) {
      await deleteDoc(doc(db, TASKS_COLLECTION_NAME, taskId));
    }
  };

  return deleteTask;
};
