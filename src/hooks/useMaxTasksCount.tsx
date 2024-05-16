import { useCalendarStore } from "../state/useCalendar";
import { useTasksStore } from "../state/useTasks";
import { Task } from "../types/task";
import { formatDateForDb } from "../utils/dateFormatting";

export const useMaxTasksCount = () => {
  const monday = useCalendarStore((state) => state.monday);

  const tasks = useTasksStore((state) => state.tasks);

  const tasksForSelectedWeek = tasks.filter(
    (task) =>
      task.date.isAfter(monday.add(-1, "day")) &&
      task.date.isBefore(monday.add(7, "day"))
  );

  let maxTasksCount = 0;

  const groups = new Map<string, Task[]>();

  for (const task of tasksForSelectedWeek) {
    const dateString = formatDateForDb(task.date);
    if (groups.has(dateString)) {
      groups.get(dateString)?.push(task);
    } else {
      groups.set(dateString, [task]);
    }
  }

  groups.forEach((group) => {
    if (group.length > maxTasksCount) {
      maxTasksCount = group.length;
    }
  });

  return maxTasksCount;
};
