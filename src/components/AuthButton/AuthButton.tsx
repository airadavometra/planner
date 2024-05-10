import { FC, useState } from "react";
import { signInWithGooglePopup } from "../../firebase";
import { User } from "../../icons/User";
import { Button } from "@headlessui/react";
import s from "./AuthButton.module.css";
import { getInitials } from "../../utils/getInitials";
import classNames from "classnames";

type AuthButtonProps = {
  className?: string;
};

export const AuthButton: FC<AuthButtonProps> = ({ className }) => {
  const [userName, setUserName] = useState<string | null>(null);

  const handleSignIn = async () => {
    const response = await signInWithGooglePopup();
    setUserName(response.user.displayName);
  };

  const handleLogOut = async () => {
    const response = await signInWithGooglePopup();
    setUserName(response.user.displayName);
  };

  return userName && userName.length > 0 ? (
    <Button onClick={handleLogOut} className={classNames(s.button, className)}>
      {getInitials(userName)}
    </Button>
  ) : (
    <Button onClick={handleSignIn} className={classNames(s.button, className)}>
      <User className={s.icon} />
    </Button>
  );
};
