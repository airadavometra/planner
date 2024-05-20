import { create } from "zustand";
import dayjs from "dayjs";
import en from "dayjs/locale/en";
import { Task } from "../types/task";
import { formatDateForDb } from "../utils/dateFormatting";
dayjs.locale({
  ...en,
  weekStart: 1,
});

type TasksState = {
  tasks: Task[];
  tasksMap: Map<string, Task[]>;
};

type TasksActions = {
  setTasks: (newTasks: Task[]) => void;
  reset: () => void;
};

const initialState: TasksState = {
  tasks: [],
  tasksMap: new Map<string, Task[]>(),
};

export const useTasksStore = create<TasksState & TasksActions>()((set) => ({
  ...initialState,
  setTasks: (newTasks) => {
    const tasksMap = new Map<string, Task[]>();

    for (const task of newTasks) {
      const dateString = formatDateForDb(task.date);
      if (tasksMap.has(dateString)) {
        tasksMap.get(dateString)?.push(task);
      } else {
        tasksMap.set(dateString, [task]);
      }
    }

    tasksMap.forEach((group) =>
      group.sort((a, b) => a.sortingIndex - b.sortingIndex)
    );

    set(() => ({
      tasks: newTasks,
      tasksMap: tasksMap,
    }));
  },
  reset: () => {
    set(initialState);
  },
}));
