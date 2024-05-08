import { FC } from "react";
import s from "./TaskListItem.module.css";
import { Check } from "../../icons/Check";
import classNames from "classnames";
import { Task } from "../../types/task";

type TaskListItemProps = {
  task: Task;
};

export const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  return (
    <div className={s.container}>
      <button
        className={classNames(s.textButton, { [s.checked]: task.isCompleted })}
      >
        {task.title}
      </button>
      <button
        className={classNames(s.checkButton, { [s.checked]: task.isCompleted })}
      >
        <Check className={s.checkIcon} />
      </button>
    </div>
  );
};
