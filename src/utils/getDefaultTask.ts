import { Dayjs } from "dayjs";
import { formatDateForDb } from "./dateFormatting";

export const getDefaultTask = (
  title: string,
  uid: string,
  date: Dayjs,
  order: number
) => ({
  title: title,
  date: formatDateForDb(date),
  isCompleted: false,
  order: order,
  color: "transparent",
  uid: uid,
});
