import { Dayjs } from "dayjs";
import { formatDateForDb } from "./dateFormatting";

export const getDefaultTask = (
  title: string,
  uid: string,
  date: Dayjs,
  sortingIndex: number
) => ({
  title: title,
  date: formatDateForDb(date),
  isCompleted: false,
  sortingIndex: sortingIndex,
  color: "transparent",
  uid: uid,
  initialDate: formatDateForDb(date),
  linkedRecurringTaskId: "",
});

export const getDefaultRecurringTask = (
  title: string,
  uid: string,
  startDate: Dayjs,
  color: string,
  schedule: string
) => ({
  uid: uid,
  title: title,
  color: color,
  startDate: formatDateForDb(startDate),
  schedule: schedule,
  initialDate: formatDateForDb(startDate),
});
