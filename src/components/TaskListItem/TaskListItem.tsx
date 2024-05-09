import { FC, useState } from "react";
import s from "./TaskListItem.module.css";
import { Check } from "../../icons/Check";
import classNames from "classnames";
import { Task } from "../../types/task";
import { TaskModal } from "../TaskModal/TaskModal";
import { Button } from "@headlessui/react";

type TaskListItemProps = {
  task: Task;
};

export const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={s.container}>
        <Button
          className={classNames(s.textButton, {
            [s.checked]: task.isCompleted,
          })}
          onClick={() => setIsModalOpen(true)}
        >
          {task.title}
        </Button>
        <Button
          className={classNames(s.checkButton, {
            [s.checked]: task.isCompleted,
          })}
        >
          <Check className={s.checkIcon} />
        </Button>
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
