import { FC } from "react";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import s from "./PlansList.module.css";
import { Task } from "../../types/task";

type PlansListProps = {
  title: string;
  date?: string;
  plans: Task[];
};

export const PlansList: FC<PlansListProps> = ({ title, plans }) => {
  return (
    <div className={s.listContainer}>
      <h2 className={s.title}>{title}</h2>
      {plans.map((item) => (
        <TaskListItem key={item.title} task={item} />
      ))}
    </div>
  );
};
