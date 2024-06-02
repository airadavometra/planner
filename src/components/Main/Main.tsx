import { PlansGrid } from "../PlansGrid/PlansGrid";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Main.module.css";
import { useReadAllTasks } from "../../firebase/hooks/useReadAllTasks";
import { usePopulateWeekWithRecurringTasks } from "../../firebase/hooks/usePopulateWeekWithRecurringTasks";
import { useMoveUnfinishedTasks } from "../../firebase/hooks/useMoveUnfinishedTasks";

export const Main = () => {
  useReadAllTasks();
  usePopulateWeekWithRecurringTasks();
  useMoveUnfinishedTasks();

  return (
    <main>
      <WidthContainer className={s.main}>
        <PlansGrid />
      </WidthContainer>
    </main>
  );
};
