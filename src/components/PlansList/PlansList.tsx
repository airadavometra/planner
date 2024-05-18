import { FC, useEffect, useRef } from "react";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import s from "./PlansList.module.css";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import isToday from "dayjs/plugin/isToday";
import { NewTaskInput } from "../NewTaskInput/NewTaskInput";
import { useTasksStore } from "../../state/useTasks";
import { writeBatch, doc } from "firebase/firestore";
import { db } from "../../firebase";
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
  /* Tasks for this day */
  const tasks = useTasksStore((state) => state.tasks);

  const plans = tasks
    .filter((task) => task.date.isSame(date))
    .sort((a, b) => a.sortingIndex - b.sortingIndex);

  /* Scroll today into view */
  const plansListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (date.isToday()) {
      plansListRef.current?.scrollIntoView();
    }
  }, []);

  const saveReorderedPlans = async (reorderedPlans: Task[]) => {
    const batch = writeBatch(db);

    for (let index = 0; index < reorderedPlans.length; index++) {
      const itemRef = doc(db, "tasks", reorderedPlans[index].id);
      batch.update(itemRef, { sortingIndex: index });
    }
    await batch.commit();
  };

  /* Drag n drop to reorder list of tasks */

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
        nextTaskSortingIndex={plans.length}
      />
    </div>
  );
};
