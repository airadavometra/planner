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
  movedPlansSource: Task[],
  movedPlansDestination: Task[]
) => {
  const batch = writeBatch(db);

  for (let index = 0; index < movedPlansSource.length; index++) {
    const itemRef = doc(db, "tasks", movedPlansSource[index].id);
    batch.update(itemRef, {
      sortingIndex: index,
      date: formatDateForDb(movedPlansSource[index].date),
    });
  }

  for (let index = 0; index < movedPlansDestination.length; index++) {
    const itemRef = doc(db, "tasks", movedPlansDestination[index].id);
    batch.update(itemRef, {
      sortingIndex: index,
      date: formatDateForDb(movedPlansDestination[index].date),
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
      const sourceTasks = tasksMap.get(source.droppableId) || [];
      const sourceTasksClone = Array.from(sourceTasks);
      const [removed] = sourceTasksClone.splice(source.index, 1);

      removed.date = parseDateFromDb(destination.droppableId);

      const destinationTasks = tasksMap.get(destination.droppableId) || [];
      const destinationTasksClone = Array.from(destinationTasks);
      destinationTasksClone.splice(destination.index, 0, removed);

      saveMovedPlans(sourceTasksClone, destinationTasksClone);
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
