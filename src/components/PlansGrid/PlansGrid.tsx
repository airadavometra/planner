import { useCalendarStore } from "../../state/useCalendar";
import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";

export const PlansGrid = () => {
  const monday = useCalendarStore((state) => state.monday);

  return (
    <div className={s.grid}>
      <PlansList
        title={"Mon"}
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
        title={"Tue"}
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
        title={"Wed"}
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
        title={"Thu"}
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
        title={"Fri"}
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
        title={"Sat"}
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
        title={"Sun"}
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
