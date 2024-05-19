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
  //   tasks: [
  //     {
  //       title: "Click to edit",
  //       isCompleted: false,
  //       date: dayjs().startOf("week"),
  //       uid: "anonymous",
  //     },
  //     {
  //       title: "Drag to other day",
  //       isCompleted: false,
  //       date: dayjs().startOf("week"),
  //       uid: "anonymous",
  //     },
  //     {
  //       title: "Hover to complete",
  //       isCompleted: false,
  //       date: dayjs().startOf("week"),
  //       uid: "anonymous",
  //     },
  //     {
  //       title: "Choose from colors",
  //       isCompleted: false,
  //       date: dayjs().startOf("week").add(2, "day"),
  //       uid: "anonymous",
  //     },
  //     {
  //       title: "Add schedule",
  //       isCompleted: false,
  //       date: dayjs().startOf("week").add(2, "day"),
  //       uid: "anonymous",
  //     },
  //     {
  //       title: "That's all!",
  //       isCompleted: false,
  //       date: dayjs().startOf("week").add(4, "day"),
  //       uid: "anonymous",
  //     },
  //     {
  //       title: "Enjoy simplicity",
  //       isCompleted: false,
  //       date: dayjs().startOf("week").add(5, "day"),
  //       uid: "anonymous",
  //     },
  //   ],
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

    set(() => ({
      tasks: newTasks,
      tasksMap: tasksMap,
    }));
  },
  reset: () => {
    set(initialState);
  },
}));
