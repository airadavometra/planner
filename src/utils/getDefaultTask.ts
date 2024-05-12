import { Dayjs } from "dayjs";

export const getDefaultTask = (
  title: string,
  uid: string,
  date: Dayjs,
  order: number
) => ({
  title: title,
  date: date.format("DD.MM.YYYY"),
  isCompleted: false,
  order: order,
  color: "transparent",
  uid: uid,
});
