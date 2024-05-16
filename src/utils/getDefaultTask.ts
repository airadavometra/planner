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
});
