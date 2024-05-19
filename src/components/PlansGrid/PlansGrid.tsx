import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { Task } from "../../types/task";
import { useTasksStore } from "../../state/useTasks";
import { reorderPlans } from "../../utils/reorderPlans";
import { formatDateForDb, parseDateFromDb } from "../../utils/dateFormatting";
import { moveTaskToAnotherDay } from "../../utils/moveTaskToAnotherDay";

const saveReorderedPlans = async (reorderedPlans: Task[]) => {
  const batch = writeBatch(db);

  for (let index = 0; index < reorderedPlans.length; index++) {
    const itemRef = doc(db, "tasks", reorderedPlans[index].id);
    batch.update(itemRef, {
      sortingIndex: index,
      date: formatDateForDb(reorderedPlans[index].date),
    });
  }

  await batch.commit();
};

const saveMovedPlans = async (
  sourcePlansMoved: Task[],
  destinationPlansMoved: Task[]
) => {
  const batch = writeBatch(db);

  for (let index = 0; index < sourcePlansMoved.length; index++) {
    const itemRef = doc(db, "tasks", sourcePlansMoved[index].id);
    batch.update(itemRef, {
      sortingIndex: index,
      date: formatDateForDb(sourcePlansMoved[index].date),
    });
  }

  for (let index = 0; index < destinationPlansMoved.length; index++) {
    const itemRef = doc(db, "tasks", destinationPlansMoved[index].id);
    batch.update(itemRef, {
      sortingIndex: index,
      date: formatDateForDb(destinationPlansMoved[index].date),
    });
  }

  await batch.commit();
};

export const PlansGrid = () => {
  const monday = useCalendarStore((state) => state.monday);
  const tasksMap = useTasksStore((state) => state.tasksMap);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const tasks = tasksMap.get(source.droppableId) || [];

      const reorderedPlans = reorderPlans(
        tasks,
        source.index,
        destination.index
      );

      saveReorderedPlans(reorderedPlans);
    } else {
      const sourcePlans = tasksMap.get(source.droppableId) || [];
      const destinationPlans = tasksMap.get(destination.droppableId) || [];

      const [sourcePlansMoved, destinationPlansMoved] = moveTaskToAnotherDay(
        sourcePlans,
        destinationPlans,
        source.index,
        destination.index,
        parseDateFromDb(destination.droppableId)
      );

      saveMovedPlans(sourcePlansMoved, destinationPlansMoved);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={s.grid}>
        <PlansList date={monday} />
        <PlansList date={monday.add(1, "day")} />
        <PlansList date={monday.add(2, "day")} />
        <PlansList date={monday.add(3, "day")} />
        <PlansList date={monday.add(4, "day")} />
        <PlansList date={monday.add(5, "day")} />
        <PlansList date={monday.add(6, "day")} />
      </div>
    </DragDropContext>
  );
};
