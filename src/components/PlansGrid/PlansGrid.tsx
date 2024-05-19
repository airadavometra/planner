import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";
import { useReorderTasks } from "../../firebase/hooks/useReorderTasks";

export const PlansGrid = () => {
  const monday = useCalendarStore((state) => state.monday);

  const reorderTasks = useReorderTasks();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    reorderTasks(source, destination);
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
