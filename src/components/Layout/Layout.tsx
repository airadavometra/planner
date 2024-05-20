import s from "./Layout.module.css";
import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { WelcomeOverlay } from "../WelcomeOverlay/WelcomeOverlay";

export const Layout = () => {
  return (
    <>
      <div id="layout" className={s.layout}>
        <Header />
        <Main />
        <WelcomeOverlay />
      </div>
    </>
  );
};
