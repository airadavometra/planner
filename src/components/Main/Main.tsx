import { useAuthState } from "react-firebase-hooks/auth";
import { PlansGrid } from "../PlansGrid/PlansGrid";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Main.module.css";
import { auth, db } from "../../firebase";
import { useTasksStore } from "../../state/useTasks";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { Task } from "../../types/task";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const Main = () => {
  const [user] = useAuthState(auth);

  const setTasks = useTasksStore((state) => state.setTasks);

  const dataQuery = user
    ? query(collection(db, "tasks"), where("uid", "==", user?.uid || ""))
    : null;

  const [value /*loading, error*/] = useCollectionData(dataQuery);

  useEffect(() => {
    if (value) {
      const tasks: Task[] = value.map((data) => ({
        title: data.title,
        isCompleted: data.isCompleted,
        uid: data.uid,
        date: dayjs(data.date, "DD.MM.YYYY"),
      }));

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
