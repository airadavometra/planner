import { Dayjs } from "dayjs";
import { Color } from "./color";
import { Schedule } from "./schedule";

export type RecurringTask = {
  id: string;
  title: string;
  startDate: Dayjs;
  uid: string;
  color: Color;
  schedule: Schedule;
};
