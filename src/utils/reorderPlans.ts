import { Task } from "../types/task";

export const reorderPlans = (
  list: Task[],
  startIndex: number,
  endIndex: number
): Task[] => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
