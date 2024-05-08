import { PlansList } from "../PlansList/PlansList";
import s from "./PlansGrid.module.css";

export const PlansGrid = () => {
  return (
    <div className={s.grid}>
      <PlansList
        title={"Mon"}
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
