import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";
import { useReorderTasks } from "../../firebase/hooks/useReorderTasks";
import { useState } from "react";
import { TaskModal } from "../TaskModal/TaskModal";
import { Task } from "../../types/task";
import { Dayjs } from "dayjs";

export const PlansGrid = () => {
  const [taskForEditing, setTaskForEditing] = useState<Task>();
  const [selectedDate, setSelected] = useState<Dayjs>();

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

  const handleOpenTaskModal = (task: Task, date: Dayjs) => {
    setTaskForEditing(task);
    setSelected(date);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={s.grid}>
          <PlansList
            date={monday}
            onOpenTaskModal={(task: Task) => handleOpenTaskModal(task, monday)}
          />
          <PlansList
            date={monday.add(1, "day")}
            onOpenTaskModal={(task: Task) =>
              handleOpenTaskModal(task, monday.add(1, "day"))
            }
          />
          <PlansList
            date={monday.add(2, "day")}
            onOpenTaskModal={(task: Task) =>
              handleOpenTaskModal(task, monday.add(2, "day"))
            }
          />
          <PlansList
            date={monday.add(3, "day")}
            onOpenTaskModal={(task: Task) =>
              handleOpenTaskModal(task, monday.add(3, "day"))
            }
          />
          <PlansList
            date={monday.add(4, "day")}
            onOpenTaskModal={(task: Task) =>
              handleOpenTaskModal(task, monday.add(4, "day"))
            }
          />
          <PlansList
            date={monday.add(5, "day")}
            onOpenTaskModal={(task: Task) =>
              handleOpenTaskModal(task, monday.add(5, "day"))
            }
          />
          <PlansList
            date={monday.add(6, "day")}
            onOpenTaskModal={(task: Task) =>
              handleOpenTaskModal(task, monday.add(6, "day"))
            }
          />
        </div>
      </DragDropContext>
      {taskForEditing && selectedDate && (
        <TaskModal
          task={taskForEditing}
          selectedDate={selectedDate}
          isOpen={Boolean(taskForEditing)}
          onClose={() => setTaskForEditing(undefined)}
        />
      )}
    </>
  );
};
