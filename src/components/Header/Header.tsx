import classNames from "classnames";
import { Arrow } from "../../icons/Arrow";
import WidthContainer from "../WidthContainer/WidthContainer";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <header>
      <WidthContainer className={s.header}>
        <h1 className={s.title}>May 2024</h1>
        <div className={s.buttonsContainer}>
          <button className={s.arrowButton}>
            <Arrow className={s.arrowIcon} />
          </button>
          <button className={s.arrowButton}>
            <Arrow className={classNames(s.arrowIcon, s.rotate180)} />
          </button>
        </div>
      </WidthContainer>
    </header>
  );
};
