import { FC } from "react";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import s from "./PlansList.module.css";
import { Task } from "../../types/task";
import { Dayjs } from "dayjs";

type PlansListProps = {
  title: string;
  date?: Dayjs;
  plans: Task[];
};

export const PlansList: FC<PlansListProps> = ({ title, date, plans }) => {
  return (
    <div className={s.listContainer}>
      <h2 className={s.title}>
        {date && <span>{date.format("DD.MM")}</span>}
        <span className={s.secondaryTitle}>{title}</span>
      </h2>
      {plans.map((item) => (
        <TaskListItem key={item.title} task={item} />
      ))}
    </div>
  );
};
