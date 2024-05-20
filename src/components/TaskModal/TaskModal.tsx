import { FC } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { DesktopModal } from "./DesktopModal/DesktopModal";
import { MobileModal } from "./MobileModal/MobileModal";

export type TaskModalProps = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
  date: string;
  onChangeDate: (newDate: string) => void;
  isCompleted: boolean;
  onToggleIsCompleted: () => void;
  onDelete: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal: FC<TaskModalProps> = (props) => {
  const isMobile = useMediaQuery("(max-width: 64rem)");

  return isMobile ? <MobileModal {...props} /> : <DesktopModal {...props} />;
};
