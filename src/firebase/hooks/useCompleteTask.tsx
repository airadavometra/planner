import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { COLLECTION_NAME } from "../constants";

export const useCompleteTask = () => {
  const [user] = useAuthState(auth);

  const completeTask = async (taskId: string, isCompleted: boolean) => {
    if (user) {
      const taskRef = doc(db, COLLECTION_NAME, taskId);

      await updateDoc(taskRef, {
        isCompleted: isCompleted,
      });
    }
  };

  return completeTask;
};
