import { useEffect } from "react";
import { parseDateFromDb } from "../../utils/dateFormatting";
import { useCollection } from "react-firebase-hooks/firestore";
import { useTasksStore } from "../../state/useTasks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { Task } from "../../types/task";
import { TASKS_COLLECTION_NAME } from "../constants";

export const useReadAllTasks = () => {
  const setTasks = useTasksStore((state) => state.setTasks);

  const [user] = useAuthState(auth);

  const dataQuery = user
    ? query(
        collection(db, TASKS_COLLECTION_NAME),
        where("uid", "==", user?.uid || "")
      )
    : null;

  const [value] = useCollection(dataQuery);

  useEffect(() => {
    if (value) {
      const tasks: Task[] = value.docs.map((data) => {
        const extractedData = data.data();

        return {
          id: data.id,
          title: extractedData.title,
          isCompleted: extractedData.isCompleted,
          uid: extractedData.uid,
          date: parseDateFromDb(extractedData.date),
          sortingIndex: extractedData.sortingIndex,
          color: extractedData.color,
          initialDate: parseDateFromDb(extractedData.initialDate),
          //linkedRecurringTask: extractedData.linkedRecurringTaskId,
        };
      });

      setTasks(tasks);
    }
  }, [value, setTasks]);
};
