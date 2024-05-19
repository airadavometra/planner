import { Dayjs } from "dayjs";

export type Task = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  date: Dayjs;
  uid: string;
  sortingIndex: number;
  color: string;
  //schedule
};
