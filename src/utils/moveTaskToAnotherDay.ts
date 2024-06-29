import { Dayjs } from "dayjs";
import { Task } from "../types/task";

export const moveTaskToAnotherDay = (
  sourcePlans: Task[],
  destinationPlans: Task[],
  sourceIndex: number,
  destinationIndex: number,
  newDate: Dayjs
) => {
  const sourcePlansClone = Array.from(sourcePlans)
    .filter((task) => !task.isDeleted)
    .sort((a, b) => a.sortingIndex - b.sortingIndex);
  const [removed] = sourcePlansClone.splice(sourceIndex, 1);

  removed.date = newDate;

  const destinationPlansClone = Array.from(destinationPlans)
    .filter((task) => !task.isDeleted)
    .sort((a, b) => a.sortingIndex - b.sortingIndex);
  destinationPlansClone.splice(destinationIndex, 0, removed);

  return [sourcePlansClone, destinationPlansClone];
};
