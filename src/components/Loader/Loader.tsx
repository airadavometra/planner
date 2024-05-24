import { Dialog, DialogPanel } from "@headlessui/react";
import s from "./Loader.module.css";
import { FC } from "react";

type LoaderProps = {
  isOpen: boolean;
};

export const Loader: FC<LoaderProps> = ({ isOpen }) => {
  return (
    <Dialog open={isOpen} onClose={() => {}}>
      <DialogPanel className={s.modalContainer}>
        <div className={s.loader}></div>
      </DialogPanel>
    </Dialog>
  );
};
