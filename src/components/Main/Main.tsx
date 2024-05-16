import { useAuthState } from "react-firebase-hooks/auth";
import { PlansGrid } from "../PlansGrid/PlansGrid";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Main.module.css";
import { auth, db } from "../../firebase";
import { useTasksStore } from "../../state/useTasks";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { Task } from "../../types/task";
import { parseDateFromDb } from "../../utils/dateFormatting";

export const Main = () => {
  const setTasks = useTasksStore((state) => state.setTasks);

  const [user] = useAuthState(auth);

  const dataQuery = user
    ? query(collection(db, "tasks"), where("uid", "==", user?.uid || ""))
    : null;

  const [value /*loading, error*/] = useCollection(dataQuery);

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
        };
      });

      setTasks(tasks);
    }
  }, [value, setTasks]);

  return (
    <main>
      <WidthContainer className={s.main}>
        <PlansGrid />
      </WidthContainer>
    </main>
  );
};
