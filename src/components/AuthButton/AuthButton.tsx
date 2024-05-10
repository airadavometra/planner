import { FC } from "react";
import { auth, googleProvider } from "../../firebase";
import { User } from "../../icons/User";
import { Button } from "@headlessui/react";
import s from "./AuthButton.module.css";
import { getInitials } from "../../utils/getInitials";
import classNames from "classnames";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup } from "firebase/auth";
import { LogOut } from "../../icons/LogOut";
import { LogIn } from "../../icons/LogIn";

type AuthButtonProps = {
  className?: string;
};

export const AuthButton: FC<AuthButtonProps> = ({ className }) => {
  const [user] = useAuthState(auth);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogOut = async () => {
    auth.signOut();
  };

  return (
    <>
      {user && (
        <div className={s.button}>
          {user.photoURL ? (
            <img
              className={s.photo}
              src={user.photoURL}
              referrerPolicy="no-referrer"
            />
          ) : user.displayName ? (
            getInitials(user.displayName)
          ) : (
            <User className={s.icon} />
          )}
        </div>
      )}
      <Button
        onClick={user ? handleLogOut : handleSignIn}
        className={classNames(s.button, className)}
      >
        {user ? <LogOut className={s.icon} /> : <LogIn className={s.icon} />}
      </Button>
    </>
  );
};
