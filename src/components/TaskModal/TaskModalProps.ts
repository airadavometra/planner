export type TaskModalProps = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
  date: string;
  onChangeDate: (newDate: string) => void;
  isCompleted: boolean;
  onToggleIsCompleted: () => void;
  color: string;
  onChangeColor: (newColor: string) => void;
  schedule: string;
  onChangeSchedule: (newSchedule: string) => void;
  onDelete: () => void;
  isOpen: boolean;
  onClose: () => void;
};
