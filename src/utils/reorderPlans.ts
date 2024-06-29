import { Task } from "../types/task";

export const reorderPlans = (
  plans: Task[],
  sourceIndex: number,
  destinationIndex: number
): Task[] => {
  const reorderedPlans = [...plans]
    .filter((task) => !task.isDeleted)
    .sort((a, b) => a.sortingIndex - b.sortingIndex);
  const [removed] = reorderedPlans.splice(sourceIndex, 1);
  reorderedPlans.splice(destinationIndex, 0, removed);

  return reorderedPlans;
};
