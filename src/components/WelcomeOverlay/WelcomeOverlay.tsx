import { useAuthState } from "react-firebase-hooks/auth";
import s from "./WelcomeOverlay.module.css";
import { auth, googleProvider } from "../../firebase/firebase";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { signInWithPopup } from "firebase/auth";
import { LogIn } from "../../icons/LogIn";

export const WelcomeOverlay = () => {
  const [user, loading] = useAuthState(auth);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  if (user || loading) {
    return null;
  }

  return (
    <Dialog open={!user && !loading} onClose={() => {}}>
      <div className={s.backdropFilter} aria-hidden="true">
        <div className={s.backdropColor} aria-hidden="true" />
      </div>
      <div className={s.modalContainer}>
        <DialogPanel className={s.modal}>
          <div className={s.content}>
            <h1 className={s.header}>
              <span className={s.plannerName}>Just a planner</span> is a
              minimalistic daily planner & to-do list.
            </h1>
            <p className={s.text}>
              Just a planner has a week calendar view without any hourly
              scheduling. You can highlight the important stuff with colors and
              order tasks as you like.
            </p>
            <p className={s.text}>Simply login to start planning your days!</p>
            <Button className={s.loginButton} onClick={handleSignIn}>
              <LogIn className={s.icon} />
              Log in
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
