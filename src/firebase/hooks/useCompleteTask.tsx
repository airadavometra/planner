import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc, writeBatch } from "firebase/firestore";
import { COLLECTION_NAME } from "../constants";
import { useTasksStore } from "../../state/useTasks";
import { reorderPlans } from "../../utils/reorderPlans";
import { Dayjs } from "dayjs";
import { formatDateForDb } from "../../utils/dateFormatting";

export const useCompleteTask = () => {
  const [user] = useAuthState(auth);
  const tasksMap = useTasksStore((state) => state.tasksMap);

  const completeTask = async (
    taskId: string,
    date: Dayjs,
    isCompleted: boolean
  ) => {
    if (user) {
      const tasks = tasksMap.get(formatDateForDb(date)) || [];

      const taskIndex = tasks.indexOf(
        tasks.find((task) => task.id === taskId)!
      );

      const newIndex = isCompleted ? tasks.length - 1 : 0;

      if (taskIndex === newIndex) {
        const taskRef = doc(db, COLLECTION_NAME, taskId);

        await updateDoc(taskRef, {
          isCompleted: isCompleted,
        });
      } else {
        const batch = writeBatch(db);

        const reorderedPlans = reorderPlans(tasks, taskIndex, newIndex);

        for (let index = 0; index < reorderedPlans.length; index++) {
          const itemRef = doc(db, COLLECTION_NAME, reorderedPlans[index].id);
          if (reorderedPlans[index].id === taskId) {
            batch.update(itemRef, {
              sortingIndex: index,
              isCompleted: isCompleted,
            });
          } else {
            batch.update(itemRef, {
              sortingIndex: index,
            });
          }
        }

        await batch.commit();
      }
    }
  };

  return completeTask;
};
