import dayjs, { Dayjs } from "dayjs";
import { collection, doc, writeBatch } from "firebase/firestore";
import { useTasksStore } from "../../state/useTasks";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { RecurringTask } from "../../types/recurringTask";
import { formatDateForDb, parseDateFromDb } from "../../utils/dateFormatting";
import { TASKS_COLLECTION_NAME } from "../constants";
import { useCalendarStore } from "../../state/useCalendar";
import { Task } from "../../types/task";
import { useEffect } from "react";
import en from "dayjs/locale/en";
dayjs.locale({
  ...en,
  weekStart: 1,
});

const isLastDayOfMonth = (date: Dayjs) => date.date() === date.daysInMonth();

function shouldCreateTaskForDay(date: Dayjs, recTask: RecurringTask): boolean {
  const startDate = recTask.startDate;

  if (!date.isBefore(startDate)) {
    switch (recTask.schedule) {
      case "daily":
        return date.day() >= startDate.day();
      case "weekly":
        return date.day() === startDate.day();
      case "biweekly": {
        const weeksDiff = date.diff(startDate, "week");
        return weeksDiff % 2 === 0 && date.day() === startDate.day();
      }
      case "monthly": {
        if (date.date() === startDate.date()) {
          return true;
        }
        if (startDate.date() > date.daysInMonth() && isLastDayOfMonth(date)) {
          return true;
        }
        return false;
      }
      case "yearly":
        return (
          date.month() === startDate.month() && date.date() === startDate.date()
        );
      default:
        return false;
    }
  }
  return false;
}

const populateWeekWithRecurringTasks = async (
  monday: Dayjs,
  recurringTasks: RecurringTask[],
  tasks: Task[],
  tasksMap: Map<string, Task[]>
) => {
  const batch = writeBatch(db);

  const newTasks = [];

  for (const recurringTask of recurringTasks) {
    if (!recurringTask.isDeleted) {
      for (let i = 0; i < 7; i++) {
        const currentDay = monday.add(i, "day");

        if (shouldCreateTaskForDay(currentDay, recurringTask)) {
          const task = {
            title: recurringTask.title,
            date: formatDateForDb(currentDay),
            isCompleted: false,
            sortingIndex: 0,
            color: recurringTask.color,
            uid: recurringTask.uid,
            initialDate: formatDateForDb(currentDay),
            linkedRecurringTaskId: recurringTask.id,
          };
          newTasks.push(task);
        }
      }
    }
  }

  for (const newTask of newTasks) {
    const taskAlreadyExists = tasks.some(
      (task) =>
        task.linkedRecurringTaskId === newTask.linkedRecurringTaskId &&
        task.initialDate.isSame(parseDateFromDb(newTask.initialDate))
    );

    if (!taskAlreadyExists) {
      const newTaskRef = doc(collection(db, TASKS_COLLECTION_NAME));
      batch.set(newTaskRef, newTask);

      const otherTasks = (tasksMap.get(newTask.date) || [])
        .filter((task) => !task.isDeleted)
        .sort((a, b) => a.sortingIndex - b.sortingIndex);

      for (let index = 0; index < otherTasks.length; index++) {
        const itemRef = doc(db, TASKS_COLLECTION_NAME, otherTasks[index].id);
        batch.update(itemRef, {
          sortingIndex: index + 1,
        });
      }
    }
  }

  await batch.commit();
};

export const usePopulateWeekWithRecurringTasks = () => {
  const [user] = useAuthState(auth);

  const { tasks, recurringTasks, tasksMap } = useTasksStore((state) => ({
    tasks: state.tasks,
    recurringTasks: state.recurringTasks,
    tasksMap: state.tasksMap,
  }));

  const monday = useCalendarStore((state) => state.monday);

  useEffect(() => {
    if (user && !monday.isBefore(dayjs().startOf("week"), "day")) {
      populateWeekWithRecurringTasks(monday, recurringTasks, tasks, tasksMap);
    }
  }, [user, monday, recurringTasks.length, tasks.length]);
};
