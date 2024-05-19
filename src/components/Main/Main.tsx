import { PlansGrid } from "../PlansGrid/PlansGrid";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Main.module.css";
import { useReadAllTasks } from "../../firebase/hooks/useReadAllTasks";

export const Main = () => {
  useReadAllTasks();

  return (
    <main>
      <WidthContainer className={s.main}>
        <PlansGrid />
      </WidthContainer>
    </main>
  );
};
