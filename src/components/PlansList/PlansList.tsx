import { FC, useEffect, useRef } from "react";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import s from "./PlansList.module.css";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import isToday from "dayjs/plugin/isToday";
import { NewTaskInput } from "../NewTaskInput/NewTaskInput";
import { useTasksStore } from "../../state/useTasks";
import {
  formatDateForPlansList,
  formatWeekdayForPlansList,
} from "../../utils/dateFormatting";
dayjs.extend(isToday);

type PlansListProps = {
  title?: string;
  date: Dayjs;
};

export const PlansList: FC<PlansListProps> = ({ title, date }) => {
  const tasks = useTasksStore((state) => state.tasks);

  const plansListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (date.isToday()) {
      plansListRef.current?.scrollIntoView();
    }
  }, []);

  // const plans = tasks.filter(
  //   (task) =>
  //     (dayjs().isAfter(date) && task.date.isSame(date) && task.isCompleted) ||
  //     (date?.isToday() && task.date.isBefore(date) && !task.isCompleted) ||
  //     ((dayjs().isBefore(date) || date?.isToday()) && task.date.isSame(date))
  // );

  const plans = tasks
    .filter((task) => task.date.isSame(date))
    .sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        return a.isCompleted
          ? a.completedAt - b.completedAt
          : a.order - b.order;
      }
      return a.isCompleted ? 1 : -1;
    });

  return (
    <div ref={plansListRef} className={s.listContainer}>
      <h2 className={classNames(s.title, { [s.currentDate]: date?.isToday() })}>
        {date && (
          <>
            <span>{formatDateForPlansList(date)}</span>
            <span className={s.secondaryTitle}>
              {formatWeekdayForPlansList(date)}
            </span>
          </>
        )}
        {title && <span>{title}</span>}
      </h2>
      {plans.map((item) => (
        <TaskListItem key={item.title} task={item} />
      ))}
      <NewTaskInput
        plansCount={plans.length}
        date={date}
        nextTaskOrder={plans.length}
      />
    </div>
  );
};
