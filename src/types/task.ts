import { Dayjs } from "dayjs";
import { Color } from "./color";

export type Task = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  date: Dayjs;
  uid: string;
  sortingIndex: number;
  color: Color;
  //schedule
};
