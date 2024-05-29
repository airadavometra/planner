import { Dayjs } from "dayjs";
import { Color } from "./color";
import { RecurringTask } from "./recurringTask";

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  date: Dayjs;
  uid: string;
  sortingIndex: number;
  color: Color;
  linkedRecurringTaskId?: string;
  linkedRecurringTask?: RecurringTask;
  initialDate: Dayjs;
};
