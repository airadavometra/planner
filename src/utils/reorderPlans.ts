import { Task } from "../types/task";

export const reorderPlans = (
  plans: Task[],
  sourceIndex: number,
  destinationIndex: number
): Task[] => {
  const reorderedPlans = [...plans];
  const [removed] = reorderedPlans.splice(sourceIndex, 1);
  reorderedPlans.splice(destinationIndex, 0, removed);

  return reorderedPlans;
};
