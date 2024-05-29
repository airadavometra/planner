import { create } from "zustand";
import dayjs from "dayjs";
import en from "dayjs/locale/en";
import { Task } from "../types/task";
import { formatDateForDb } from "../utils/dateFormatting";
import { RecurringTask } from "../types/recurringTask";
dayjs.locale({
  ...en,
  weekStart: 1,
});

type TasksState = {
  tasks: Task[];
  tasksMap: Map<string, Task[]>;
  recurringTasks: RecurringTask[];
};

type TasksActions = {
  setTasks: (newTasks: Task[], newRecurringTasks: RecurringTask[]) => void;
  reset: () => void;
};

const initialState: TasksState = {
  tasks: [],
  tasksMap: new Map<string, Task[]>(),
  recurringTasks: [],
};

export const useTasksStore = create<TasksState & TasksActions>()((set) => ({
  ...initialState,
  setTasks: (newTasks, newRecurringTasks) => {
    const tasksMap = new Map<string, Task[]>();
    const newTasksWithRecurringTasksData: Task[] = [];

    for (const task of newTasks) {
      const dateString = formatDateForDb(task.date);

      const linkedRecurringTask = newRecurringTasks.find(
        (recurringTask) => recurringTask.id === task.linkedRecurringTaskId
      );

      const taskWithRecurringTasksData = {
        ...task,
        linkedRecurringTask: linkedRecurringTask,
      };

      if (tasksMap.has(dateString)) {
        tasksMap.get(dateString)?.push(taskWithRecurringTasksData);
      } else {
        tasksMap.set(dateString, [taskWithRecurringTasksData]);
      }
      newTasksWithRecurringTasksData.push(taskWithRecurringTasksData);
    }

    tasksMap.forEach((group) =>
      group.sort((a, b) => a.sortingIndex - b.sortingIndex)
    );

    set(() => ({
      tasks: newTasksWithRecurringTasksData,
      tasksMap: tasksMap,
      recurringTasks: newRecurringTasks,
    }));
  },

  reset: () => {
    set(initialState);
  },
}));
