import { Dayjs } from "dayjs";

export type Task = {
  title: string;
  description?: string;
  isCompleted: boolean;
  date: Dayjs;
  //color
  //schedule
};
