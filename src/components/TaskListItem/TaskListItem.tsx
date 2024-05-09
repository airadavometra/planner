import { FC, useState } from "react";
import s from "./TaskListItem.module.css";
import { Check } from "../../icons/Check";
import classNames from "classnames";
import { Task } from "../../types/task";
import { TaskModal } from "../TaskModal/TaskModal";

type TaskListItemProps = {
  task: Task;
};

export const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={s.container}>
        <button
          className={classNames(s.textButton, {
            [s.checked]: task.isCompleted,
          })}
          onClick={() => setIsModalOpen(true)}
        >
          {task.title}
        </button>
        <button
          className={classNames(s.checkButton, {
            [s.checked]: task.isCompleted,
          })}
        >
          <Check className={s.checkIcon} />
        </button>
      </div>
      {isModalOpen && (
        <TaskModal
          task={task}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
