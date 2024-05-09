import { FC } from "react";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import s from "./PlansList.module.css";
import { Task } from "../../types/task";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

type PlansListProps = {
  title?: string;
  date?: Dayjs;
  plans: Task[];
};

export const PlansList: FC<PlansListProps> = ({ title, date, plans }) => {
  return (
    <div className={s.listContainer}>
      <h2 className={classNames(s.title, { [s.currentDate]: date?.isToday() })}>
        {date && (
          <>
            <span>{date.format("DD.MM")}</span>
            <span className={s.secondaryTitle}>{date.format("ddd")}</span>
          </>
        )}
        {title && <span>{title}</span>}
      </h2>
      {plans.map((item) => (
        <TaskListItem key={item.title} task={item} />
      ))}
    </div>
  );
};
