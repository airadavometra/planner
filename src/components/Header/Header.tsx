import classNames from "classnames";
import { Arrow } from "../../icons/Arrow";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Header.module.css";
import { useCalendarStore } from "../../state/useCalendar";
import dayjs from "dayjs";

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
        <h1
          className={classNames(s.title, {
            [s.anotherWeek]: monday.diff(dayjs().startOf("week")) !== 0,
          })}
        >
          <button onClick={reset}>{monday.format("MMMM YYYY")}</button>
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
