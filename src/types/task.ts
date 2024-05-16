import { Dayjs } from "dayjs";

export type Task = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  completedAt: number; //milliseconds
  date: Dayjs;
  uid: string;
  order: number;
  //color
  //schedule
};
