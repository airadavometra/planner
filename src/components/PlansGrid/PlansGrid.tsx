import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";

export const PlansGrid = () => {
  const monday = useCalendarStore((state) => state.monday);

  return (
    <div className={s.grid}>
      <PlansList
        date={monday}
        plans={[
          { title: "lalala", isCompleted: false },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
        ]}
      />
      <PlansList
        date={monday.add(1, "day")}
        plans={[
          { title: "lalala", isCompleted: false },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
        ]}
      />
      <PlansList
        date={monday.add(2, "day")}
        plans={[
          { title: "lalala", isCompleted: false },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
        ]}
      />
      <PlansList
        date={monday.add(3, "day")}
        plans={[
          { title: "lalala", isCompleted: false },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
        ]}
      />
      <PlansList
        date={monday.add(4, "day")}
        plans={[
          { title: "lalala", isCompleted: false },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
        ]}
      />
      <PlansList
        date={monday.add(5, "day")}
        plans={[
          { title: "lalala", isCompleted: false },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
        ]}
      />
      <PlansList
        date={monday.add(6, "day")}
        plans={[
          { title: "lalala", isCompleted: false },
          {
            title: "lalalalalalalalalalalalalalalalalalalalalalalala",
            isCompleted: true,
          },
        ]}
      />
    </div>
  );
};
