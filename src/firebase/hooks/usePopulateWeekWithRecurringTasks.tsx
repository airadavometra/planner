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

function shouldCreateTaskForDay(date: Dayjs, recTask: RecurringTask): boolean {
  const startDate = recTask.startDate;

  switch (recTask.schedule) {
    case "daily":
      return true;
    case "weekly":
      return date.day() === startDate.day();
    case "biweekly": {
      const weeksDiff = date.diff(startDate, "week");
      return weeksDiff % 2 === 0 && date.day() === startDate.day();
    }
    case "monthly":
      return date.date() === startDate.date();
    case "yearly":
      return (
        date.month() === startDate.month() && date.date() === startDate.date()
      );
    default:
      return false;
  }
}

const populateWeekWithRecurringTasks = async (
  monday: Dayjs,
  recurringTasks: RecurringTask[],
  tasks: Task[]
) => {
  const batch = writeBatch(db);

  const newTasks = [];

  for (const recurringTask of recurringTasks) {
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

  for (const newTask of newTasks) {
    const taskAlreadyExists = tasks.some(
      (task) =>
        task.linkedRecurringTaskId === newTask.linkedRecurringTaskId &&
        task.initialDate.isSame(parseDateFromDb(newTask.initialDate))
    );

    if (!taskAlreadyExists) {
      const taskRef = doc(collection(db, TASKS_COLLECTION_NAME));
      batch.set(taskRef, newTask);
    }
  }

  await batch.commit();
};

export const usePopulateWeekWithRecurringTasks = () => {
  const [user] = useAuthState(auth);

  const { tasks, recurringTasks } = useTasksStore((state) => ({
    tasks: state.tasks,
    recurringTasks: state.recurringTasks,
  }));

  const monday = useCalendarStore((state) => state.monday);

  useEffect(() => {
    if (user && !monday.isBefore(dayjs().startOf("week"), "day")) {
      console.log("populate");
      populateWeekWithRecurringTasks(monday, recurringTasks, tasks);
    }
  }, [user, monday, recurringTasks, tasks]);
};
