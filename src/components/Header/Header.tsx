import classNames from "classnames";
import { Arrow } from "../../icons/Arrow";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Header.module.css";
import { useCalendarStore } from "../../state/useCalendar";

export const Header = () => {
  const { monday, goBack, goForward, reset } = useCalendarStore((state) => ({
    monday: state.monday,
    goBack: state.goBack,
    goForward: state.goForward,
    reset: state.reset,
  }));

  return (
    <header>
      <WidthContainer className={s.header}>
        <h1 className={s.title}>
          <button onClick={reset}>{monday.format("MMM YYYY")}</button>
        </h1>
        <div className={s.buttonsContainer}>
          <button className={s.arrowButton} onClick={goBack}>
            <Arrow className={s.arrowIcon} />
          </button>
          <button className={s.arrowButton} onClick={goForward}>
            <Arrow className={classNames(s.arrowIcon, s.rotate180)} />
          </button>
        </div>
      </WidthContainer>
    </header>
  );
};
