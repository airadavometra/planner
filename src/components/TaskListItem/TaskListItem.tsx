import { FC, useEffect, useState } from "react";
import s from "./TaskListItem.module.css";
import { Check } from "../../icons/Check";
import classNames from "classnames";
import { Task } from "../../types/task";
import { TaskModal } from "../TaskModal/TaskModal";
import { Button } from "@headlessui/react";
import dayjs from "dayjs";
import {
  formatDateForInput,
  parseDateFromInput,
} from "../../utils/dateFormatting";
import { Draggable } from "@hello-pangea/dnd";
import { useDeleteTask } from "../../firebase/hooks/useDeleteTask";
import { useCompleteTask } from "../../firebase/hooks/useCompleteTask";
import { useUpdateTask } from "../../firebase/hooks/useUpdateTask";

type TaskListItemProps = {
  task: Task;
  index: number;
};

export const TaskListItem: FC<TaskListItemProps> = ({ task, index }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(task.title);
  const [date, setDate] = useState<string>(formatDateForInput(task.date));
  const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);
  const [color, setColor] = useState<string>(task.color);
  const [schedule, setSchedule] = useState<string>(
    task.recurringTask?.schedule || ""
  );

  const deleteTask = useDeleteTask();
  const completeTask = useCompleteTask();
  const updateTask = useUpdateTask();

  useEffect(() => {
    if (!isModalOpen) {
      updateTask(task.id, title, date, color, task.title);

      if (isCompleted !== task.isCompleted) {
        completeTask(task.id, parseDateFromInput(date), isCompleted);
      }
    }
  }, [isModalOpen]);

  const handleDeleteTask = async () => {
    await deleteTask(task.id);
  };

  const handleCompleteTask = async (isCompleted: boolean) => {
    await completeTask(task.id, parseDateFromInput(date), isCompleted);
  };

  return (
    <>
      <Draggable
        key={task.id}
        draggableId={task.id}
        index={index}
        disableInteractiveElementBlocking
      >
        {(provided) => (
          <div
            className={s.container}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          >
            <Button
              className={classNames(s.textButton, {
                [s.checked]: task.isCompleted,
              })}
              onClick={() => setIsModalOpen(true)}
            >
              <span
                className={classNames(s.text, {
                  [task.color]: true,
                })}
              >
                {task.title}
              </span>
            </Button>
            <Button
              className={classNames(s.checkButton, {
                [s.checked]: task.isCompleted,
              })}
              onClick={() => {
                setIsCompleted((prev) => {
                  handleCompleteTask(!prev);
                  return !prev;
                });
              }}
            >
              <Check className={s.checkIcon} />
            </Button>
          </div>
        )}
      </Draggable>
      {isModalOpen && (
        <TaskModal
          title={title}
          onChangeTitle={setTitle}
          date={date}
          onChangeDate={(newDate: string) => {
            const isValid = newDate.length > 0 && dayjs(date).isValid();
            setDate(isValid ? newDate : formatDateForInput(task.date));
          }}
          isCompleted={isCompleted}
          onToggleIsCompleted={() => setIsCompleted((prev) => !prev)}
          color={color}
          onChangeColor={setColor}
          schedule={schedule}
          onChangeSchedule={setSchedule}
          onDelete={handleDeleteTask}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
