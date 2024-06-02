import { FC } from "react";
import s from "./TaskListItem.module.css";
import { Check } from "../../icons/Check";
import classNames from "classnames";
import { Task } from "../../types/task";
import { Button } from "@headlessui/react";
import { Draggable } from "@hello-pangea/dnd";
import { useUpdateTask } from "../../firebase/hooks/useUpdateTask";
import { Repeat } from "../../icons/Repeat";

type TaskListItemProps = {
  task: Task;
  index: number;
  onOpenTaskModal: () => void;
};

export const TaskListItem: FC<TaskListItemProps> = ({
  task,
  index,
  onOpenTaskModal,
}) => {
  const { completeTask } = useUpdateTask();

  const handleCompleteTask = async (isCompleted: boolean) => {
    await completeTask(task.id, task.date, isCompleted);
  };

  return (
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
            onClick={onOpenTaskModal}
          >
            <span
              className={classNames(s.textContainer, {
                [task.color]: true,
              })}
            >
              {task.linkedRecurringTaskId && (
                <Repeat className={s.repeatIcon} />
              )}
              <span className={s.text}>{task.title}</span>
            </span>
          </Button>
          <Button
            className={classNames(s.checkButton, {
              [s.checked]: task.isCompleted,
            })}
            onClick={() => handleCompleteTask(!task.isCompleted)}
          >
            <Check className={s.checkIcon} />
          </Button>
        </div>
      )}
    </Draggable>
  );
};
