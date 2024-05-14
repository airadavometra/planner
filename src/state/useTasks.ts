import { create } from "zustand";
import dayjs from "dayjs";
import en from "dayjs/locale/en";
import { Task } from "../types/task";
dayjs.locale({
  ...en,
  weekStart: 1,
});

type TasksState = {
  tasks: Task[];
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
};

export const useTasksStore = create<TasksState & TasksActions>()((set) => ({
  ...initialState,
  setTasks: (newTasks) => {
    set(() => ({
      tasks: newTasks,
    }));
  },
  reset: () => {
    set(initialState);
  },
}));
