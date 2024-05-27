import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, writeBatch } from "firebase/firestore";
import { TASKS_COLLECTION_NAME } from "../constants";
import { formatDateForDb } from "../../utils/dateFormatting";
import { Dayjs } from "dayjs";
import { useTasksStore } from "../../state/useTasks";
import { moveTaskToAnotherDay } from "../../utils/moveTaskToAnotherDay";

export const useChangeDate = () => {
  const [user] = useAuthState(auth);
  const tasksMap = useTasksStore((state) => state.tasksMap);

  const changeDate = async (taskId: string, oldDate: Dayjs, newDate: Dayjs) => {
    if (user) {
      const oldDayTasks = tasksMap.get(formatDateForDb(oldDate)) || [];

      const taskIndex = oldDayTasks.indexOf(
        oldDayTasks.find((task) => task.id === taskId)!
      );

      const newDayTasks = tasksMap.get(formatDateForDb(newDate)) || [];

      const [oldDayTasksMoved, newDayTasksMoved] = moveTaskToAnotherDay(
        oldDayTasks,
        newDayTasks,
        taskIndex,
        0,
        newDate
      );

      const batch = writeBatch(db);

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

      await batch.commit();
    }
  };

  return changeDate;
};
