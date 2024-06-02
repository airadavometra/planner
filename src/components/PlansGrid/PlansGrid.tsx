import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";
import { useReorderTasks } from "../../firebase/hooks/useReorderTasks";
import { useState } from "react";
import { TaskModal } from "../TaskModal/TaskModal";
import { Task } from "../../types/task";

export const PlansGrid = () => {
  const [taskForEditing, setTaskForEditing] = useState<Task>();

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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={s.grid}>
          <PlansList date={monday} onOpenTaskModal={setTaskForEditing} />
          <PlansList
            date={monday.add(1, "day")}
            onOpenTaskModal={setTaskForEditing}
          />
          <PlansList
            date={monday.add(2, "day")}
            onOpenTaskModal={setTaskForEditing}
          />
          <PlansList
            date={monday.add(3, "day")}
            onOpenTaskModal={setTaskForEditing}
          />
          <PlansList
            date={monday.add(4, "day")}
            onOpenTaskModal={setTaskForEditing}
          />
          <PlansList
            date={monday.add(5, "day")}
            onOpenTaskModal={setTaskForEditing}
          />
          <PlansList
            date={monday.add(6, "day")}
            onOpenTaskModal={setTaskForEditing}
          />
        </div>
      </DragDropContext>
      {taskForEditing && (
        <TaskModal
          task={taskForEditing}
          isOpen={Boolean(taskForEditing)}
          onClose={() => setTaskForEditing(undefined)}
        />
      )}
    </>
  );
};
