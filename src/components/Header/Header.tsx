import classNames from "classnames";
import { Arrow } from "../../icons/Arrow";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Header.module.css";
import { useCalendarStore } from "../../state/useCalendar";
import dayjs from "dayjs";
import { Button } from "@headlessui/react";

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
          <Button onClick={reset}>{monday.format("MMMM YYYY")}</Button>
        </h1>
        <div className={s.buttonsContainer}>
          <Button className={s.arrowButton} onClick={goBack}>
            <Arrow className={s.arrowIcon} />
          </Button>
          <Button className={s.arrowButton} onClick={goForward}>
            <Arrow className={classNames(s.arrowIcon, s.rotate180)} />
          </Button>
        </div>
      </WidthContainer>
    </header>
  );
};
