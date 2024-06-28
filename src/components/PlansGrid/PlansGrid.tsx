import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";
import { useReorderTasks } from "../../firebase/hooks/useReorderTasks";
import { useEffect, useState } from "react";
import { TaskModal } from "../TaskModal/TaskModal";
import { Dayjs } from "dayjs";

export const PlansGrid = () => {
  const [taskIdForEditing, setTaskIdForEditing] = useState<
    string | undefined
  >();
  const [selectedDate, setSelected] = useState<Dayjs | undefined>();

  const monday = useCalendarStore((state) => state.monday);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [monday]);

  const reorderTasks = useReorderTasks();

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    reorderTasks(source, destination);
  };

  const handleOpenTaskModal = (taskId: string, date: Dayjs) => {
    setTaskIdForEditing(taskId);
    setSelected(date);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={s.grid}>
          <PlansList
            date={monday}
            onOpenTaskModal={(taskId: string) =>
              handleOpenTaskModal(taskId, monday)
            }
          />
          <PlansList
            date={monday.add(1, "day")}
            onOpenTaskModal={(taskId: string) =>
              handleOpenTaskModal(taskId, monday.add(1, "day"))
            }
          />
          <PlansList
            date={monday.add(2, "day")}
            onOpenTaskModal={(taskId: string) =>
              handleOpenTaskModal(taskId, monday.add(2, "day"))
            }
          />
          <PlansList
            date={monday.add(3, "day")}
            onOpenTaskModal={(taskId: string) =>
              handleOpenTaskModal(taskId, monday.add(3, "day"))
            }
          />
          <PlansList
            date={monday.add(4, "day")}
            onOpenTaskModal={(taskId: string) =>
              handleOpenTaskModal(taskId, monday.add(4, "day"))
            }
          />
          <PlansList
            date={monday.add(5, "day")}
            onOpenTaskModal={(taskId: string) =>
              handleOpenTaskModal(taskId, monday.add(5, "day"))
            }
          />
          <PlansList
            date={monday.add(6, "day")}
            onOpenTaskModal={(taskId: string) =>
              handleOpenTaskModal(taskId, monday.add(6, "day"))
            }
          />
        </div>
      </DragDropContext>
      {taskIdForEditing && selectedDate && (
        <TaskModal
          taskId={taskIdForEditing}
          selectedDate={selectedDate}
          isOpen={Boolean(taskIdForEditing)}
          onClose={() => setTaskIdForEditing(undefined)}
        />
      )}
    </>
  );
};
