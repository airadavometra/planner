import { PlansGrid } from "../PlansGrid/PlansGrid";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Main.module.css";
import { useReadAllTasks } from "../../firebase/hooks/useReadAllTasks";
import { Loader } from "../Loader/Loader";

export const Main = () => {
  const loading = useReadAllTasks();

  return (
    <main>
      <WidthContainer className={s.main}>
        <PlansGrid />
      </WidthContainer>
      {loading && <Loader isOpen={loading} />}
    </main>
  );
};
