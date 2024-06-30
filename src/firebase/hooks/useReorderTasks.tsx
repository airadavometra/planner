import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, writeBatch } from "firebase/firestore";
import { TASKS_COLLECTION_NAME } from "../constants";
import { formatDateForDb, parseDateFromDb } from "../../utils/dateFormatting";
import { useTasksStore } from "../../state/useTasks";
import { reorderPlans } from "../../utils/reorderPlans";
import { DraggableLocation } from "@hello-pangea/dnd";
import { moveTaskToAnotherDay } from "../../utils/moveTaskToAnotherDay";
import { useCallback } from "react";

export const useReorderTasks = () => {
  const [user] = useAuthState(auth);
  const tasksMap = useTasksStore((state) => state.tasksMap);

  const reorderTasks = useCallback(
    async (source: DraggableLocation, destination: DraggableLocation) => {
      if (user) {
        const batch = writeBatch(db);

        if (source.droppableId === destination.droppableId) {
          const tasks = (tasksMap.get(source.droppableId) || [])
            .filter((task) => !task.isDeleted)
            .sort((a, b) => a.sortingIndex - b.sortingIndex);

          const reorderedPlans = reorderPlans(
            tasks,
            source.index,
            destination.index
          );

          for (let index = 0; index < reorderedPlans.length; index++) {
            const itemRef = doc(
              db,
              TASKS_COLLECTION_NAME,
              reorderedPlans[index].id
            );
            batch.update(itemRef, {
              sortingIndex: index,
              date: formatDateForDb(reorderedPlans[index].date),
            });
          }
        } else {
          const sourcePlans = (tasksMap.get(source.droppableId) || [])
            .filter((task) => !task.isDeleted)
            .sort((a, b) => a.sortingIndex - b.sortingIndex);
          const destinationPlans = (tasksMap.get(destination.droppableId) || [])
            .filter((task) => !task.isDeleted)
            .sort((a, b) => a.sortingIndex - b.sortingIndex);

          const [sourcePlansMoved, destinationPlansMoved] =
            moveTaskToAnotherDay(
              sourcePlans,
              destinationPlans,
              source.index,
              destination.index,
              parseDateFromDb(destination.droppableId)
            );

          for (let index = 0; index < sourcePlansMoved.length; index++) {
            const itemRef = doc(
              db,
              TASKS_COLLECTION_NAME,
              sourcePlansMoved[index].id
            );
            batch.update(itemRef, {
              sortingIndex: index,
              date: formatDateForDb(sourcePlansMoved[index].date),
            });
          }

          for (let index = 0; index < destinationPlansMoved.length; index++) {
            const itemRef = doc(
              db,
              TASKS_COLLECTION_NAME,
              destinationPlansMoved[index].id
            );
            batch.update(itemRef, {
              sortingIndex: index,
              date: formatDateForDb(destinationPlansMoved[index].date),
            });
          }
        }

        await batch.commit();
      }
    },
    [user, tasksMap]
  );

  return reorderTasks;
};
