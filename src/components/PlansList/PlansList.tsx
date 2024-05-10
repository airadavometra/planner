import { FC } from "react";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import s from "./PlansList.module.css";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import isToday from "dayjs/plugin/isToday";
import { NewTaskButton } from "../NewTaskButton/NewTaskButton";
import { useTasksStore } from "../../state/useTasks";
dayjs.extend(isToday);

type PlansListProps = {
  title?: string;
  date?: Dayjs;
};

export const PlansList: FC<PlansListProps> = ({ title, date }) => {
  const tasks = useTasksStore((state) => state.tasks);

  const plans = tasks.filter(
    (task) =>
      (dayjs().isAfter(date) && task.date.isSame(date) && task.isCompleted) ||
      (date?.isToday() && task.date.isBefore(date) && !task.isCompleted) ||
      (dayjs().isBefore(date) && task.date.isSame(date))
  );

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
      <NewTaskButton plansCount={plans.length} />
    </div>
  );
};
