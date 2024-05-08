import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";
import en from "dayjs/locale/en";

dayjs.locale({
  ...en,
  weekStart: 1,
});

type CalendarState = {
  monday: Dayjs;
};

type CalendarActions = {
  goBack: () => void;
  goForward: () => void;
  reset: () => void;
};

const initialState: CalendarState = {
  monday: dayjs().startOf("week"),
};

export const useCalendarStore = create<CalendarState & CalendarActions>()(
  (set) => ({
    ...initialState,
    goBack: () => {
      set((state) => ({
        monday: state.monday.add(-1, "week"),
      }));
    },
    goForward: () => {
      set((state) => ({
        monday: state.monday.add(1, "week"),
      }));
    },
    reset: () => {
      set(initialState);
    },
  })
);
