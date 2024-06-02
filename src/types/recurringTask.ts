import { Dayjs } from "dayjs";
import { Color } from "./color";
import { Schedule } from "./schedule";

export type RecurringTask = {
  id: string;
  title: string;
  startDate: Dayjs;
  initialDate: Dayjs;
  uid: string;
  color: Color;
  schedule: Schedule;
  isDeleted: boolean;
};
