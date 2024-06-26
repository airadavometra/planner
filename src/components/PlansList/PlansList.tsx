import { FC, useEffect, useRef } from "react";
import { TaskListItem } from "../TaskListItem/TaskListItem";
import s from "./PlansList.module.css";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import isToday from "dayjs/plugin/isToday";
import { NewTaskInput } from "../NewTaskInput/NewTaskInput";
import { useTasksStore } from "../../state/useTasks";
import {
  formatDateForDb,
  formatDateForPlansList,
  formatWeekdayForPlansList,
} from "../../utils/dateFormatting";
import { Droppable } from "@hello-pangea/dnd";
import { useCalendarStore } from "../../state/useCalendar";
dayjs.extend(isToday);

type PlansListProps = {
  title?: string;
  date: Dayjs;
  onOpenTaskModal: (taskId: string) => void;
};

export const PlansList: FC<PlansListProps> = ({
  title,
  date,
  onOpenTaskModal,
}) => {
  const tasksMap = useTasksStore((state) => state.tasksMap);

  const monday = useCalendarStore((state) => state.monday);

  const plans = (tasksMap.get(formatDateForDb(date)) || [])
    .filter((task) => !task.isDeleted)
    .sort((a, b) => a.sortingIndex - b.sortingIndex);

  const plansListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (date.isToday()) {
      setTimeout(function () {
        plansListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [monday]);

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
      <Droppable
        key={formatDateForDb(date)}
        droppableId={formatDateForDb(date)}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {plans.map((item, index) => (
              <TaskListItem
                key={item.id}
                task={item}
                index={index}
                onOpenTaskModal={() => onOpenTaskModal(item.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <NewTaskInput plansCount={plans.length} date={date} />
    </div>
  );
};
