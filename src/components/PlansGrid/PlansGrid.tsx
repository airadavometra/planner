import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";

export const PlansGrid = () => {
  const monday = useCalendarStore((state) => state.monday);

  return (
    <div className={s.grid}>
      <PlansList date={monday} />
      <PlansList date={monday.add(1, "day")} />
      <PlansList date={monday.add(2, "day")} />
      <PlansList date={monday.add(3, "day")} />
      <PlansList date={monday.add(4, "day")} />
      <PlansList date={monday.add(5, "day")} />
      <PlansList date={monday.add(6, "day")} />
    </div>
  );
};
