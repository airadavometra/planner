import { PlansGrid } from "../PlansGrid/PlansGrid";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Main.module.css";
import { useReadAllTasks } from "../../firebase/hooks/useReadAllTasks";
import { usePopulateWeekWithRecurringTasks } from "../../firebase/hooks/usePopulateWeekWithRecurringTasks";

export const Main = () => {
  useReadAllTasks();
  usePopulateWeekWithRecurringTasks();

  return (
    <main>
      <WidthContainer className={s.main}>
        <PlansGrid />
      </WidthContainer>
    </main>
  );
};
