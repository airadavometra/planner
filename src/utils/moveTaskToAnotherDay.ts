import { Dayjs } from "dayjs";
import { Task } from "../types/task";

export const moveTaskToAnotherDay = (
  sourcePlans: Task[],
  destinationPlans: Task[],
  sourceIndex: number,
  destinationIndex: number,
  newDate: Dayjs
) => {
  const sourcePlansClone = Array.from(sourcePlans);
  const [removed] = sourcePlansClone.splice(sourceIndex, 1);

  removed.date = newDate;

  const destinationPlansClone = Array.from(destinationPlans);
  destinationPlansClone.splice(destinationIndex, 0, removed);

  return [sourcePlansClone, destinationPlansClone];
};
