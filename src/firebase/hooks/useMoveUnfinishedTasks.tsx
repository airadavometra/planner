import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useTasksStore } from "../../state/useTasks";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { formatDateForDb } from "../../utils/dateFormatting";
import { doc, writeBatch } from "firebase/firestore";
import { Task } from "../../types/task";
import { moveTaskToAnotherDay } from "../../utils/moveTaskToAnotherDay";
import { TASKS_COLLECTION_NAME } from "../constants";

const moveUnfinishedTasks = async (tasksMap: Map<string, Task[]>) => {
  const yesterday = dayjs().add(-1, "day");

  const yesterdayTasks = tasksMap.get(formatDateForDb(yesterday)) || [];

  const todayTasks = tasksMap.get(formatDateForDb(dayjs())) || [];

  if (yesterdayTasks && yesterdayTasks.length > 0) {
    const batch = writeBatch(db);

    for (let index = 0; index < yesterdayTasks.length; index++) {
      const yesterdayTask = yesterdayTasks[index];

      if (!yesterdayTask.isDeleted && !yesterdayTask.isCompleted) {
        const [oldDayTasksMoved, newDayTasksMoved] = moveTaskToAnotherDay(
          yesterdayTasks,
          todayTasks,
          index,
          todayTasks.length - 1,
          dayjs()
        );

        for (let index = 0; index < oldDayTasksMoved.length; index++) {
          const itemRef = doc(
            db,
            TASKS_COLLECTION_NAME,
            oldDayTasksMoved[index].id
          );
          batch.update(itemRef, {
            sortingIndex: index,
            date: formatDateForDb(oldDayTasksMoved[index].date),
          });
        }

        for (let index = 0; index < newDayTasksMoved.length; index++) {
          const itemRef = doc(
            db,
            TASKS_COLLECTION_NAME,
            newDayTasksMoved[index].id
          );
          batch.update(itemRef, {
            sortingIndex: index,
            date: formatDateForDb(newDayTasksMoved[index].date),
          });
        }
      }
    }

    await batch.commit();
  }
};

export const useMoveUnfinishedTasks = () => {
  const [alreadyMoved, setAlreadyMoved] = useState<boolean>(false);

  const [user] = useAuthState(auth);

  const tasksMap = useTasksStore((state) => state.tasksMap);

  useEffect(() => {
    if (user && tasksMap.size > 0 && !alreadyMoved) {
      moveUnfinishedTasks(tasksMap).then(() => setAlreadyMoved(true));
    }
  }, [user, alreadyMoved, tasksMap]);
};
