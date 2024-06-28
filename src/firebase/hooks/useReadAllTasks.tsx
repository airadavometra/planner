import { useEffect } from "react";
import { parseDateFromDb } from "../../utils/dateFormatting";
import { useCollection } from "react-firebase-hooks/firestore";
import { useTasksStore } from "../../state/useTasks";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, query, where } from "firebase/firestore";
import { Task } from "../../types/task";
import {
  RECURRING_TASKS_COLLECTION_NAME,
  TASKS_COLLECTION_NAME,
} from "../constants";
import { RecurringTask } from "../../types/recurringTask";

export const useReadAllTasks = () => {
  const setTasks = useTasksStore((state) => state.setTasks);

  const [user] = useAuthState(auth);

  const tasksQuery = user
    ? query(
        collection(db, TASKS_COLLECTION_NAME),
        where("uid", "==", user?.uid || "")
      )
    : null;

  const [tasksCollection] = useCollection(tasksQuery);

  const recurringTasksQuery = user
    ? query(
        collection(db, RECURRING_TASKS_COLLECTION_NAME),
        where("uid", "==", user?.uid || "")
      )
    : null;

  const [recurringTasksCollection] = useCollection(recurringTasksQuery);

  useEffect(() => {
    const tasks: Task[] =
      tasksCollection?.docs
        .map((data) => {
          const extractedData = data.data();

          return {
            id: data.id,
            title: extractedData.title,
            isCompleted: extractedData.isCompleted,
            isDeleted: extractedData.isDeleted,
            uid: extractedData.uid,
            date: parseDateFromDb(extractedData.date),
            sortingIndex: extractedData.sortingIndex,
            color: extractedData.color,
            initialDate: parseDateFromDb(extractedData.initialDate),
            linkedRecurringTaskId: extractedData.linkedRecurringTaskId,
          };
        })
        .filter((task) => !task.isDeleted) || [];

    const recurringTasks: RecurringTask[] =
      recurringTasksCollection?.docs
        .map((data) => {
          const extractedData = data.data();

          return {
            id: data.id,
            title: extractedData.title,
            uid: extractedData.uid,
            startDate: parseDateFromDb(extractedData.startDate),
            initialDate: parseDateFromDb(extractedData.initialDate),
            color: extractedData.color,
            schedule: extractedData.schedule,
            isDeleted: extractedData.isDeleted,
          };
        })
        .filter((task) => !task.isDeleted) || [];

    setTasks(tasks, recurringTasks);
  }, [tasksCollection, recurringTasksCollection, setTasks]);
};
