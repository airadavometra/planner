import { FC } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { DesktopModal } from "./DesktopModal/DesktopModal";
import { MobileModal } from "./MobileModal/MobileModal";
import {
  formatDateForInput,
  parseDateFromInput,
} from "../../utils/dateFormatting";
import { Task } from "../../types/task";
import { useUpdateTask } from "../../firebase/hooks/useUpdateTask";
import { useDeleteTask } from "../../firebase/hooks/useDeleteTask";
import dayjs from "dayjs";

type TaskModalProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal: FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  // const [title, setTitle] = useState<string>(task.title);
  // const [date, setDate] = useState<string>(formatDateForInput(task.date));
  // const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);
  // const [color, setColor] = useState<string>(task.color);
  // const [schedule, setSchedule] = useState<string>(
  //   task.linkedRecurringTask?.schedule || ""
  // );

  const { deleteTask } = useDeleteTask();
  const { completeTask, changeTitle, changeColor, changeDate, addSchedule } =
    useUpdateTask();

  // useEffect(() => {
  //   if (!isModalOpen) {
  //     updateTask(task.id, title, color, task.title);

  //     if (date !== formatDateForInput(task.date)) {
  //       changeDate(task.id, task.date, parseDateFromInput(date));
  //     }

  //     if (isCompleted !== task.isCompleted) {
  //       completeTask(task.id, parseDateFromInput(date), isCompleted);
  //     }

  //     if (!task.linkedRecurringTask && schedule) {
  //       addSchedule(task.id, title, parseDateFromInput(date), color, schedule);
  //     }
  //   }
  // }, [isModalOpen]);

  const handleDeleteTask = async () => {
    await deleteTask(task.id);
  };

  const handleToggleIsCompleted = async () => {
    await completeTask(task.id, task.date, !task.isCompleted);
  };

  const handleChangeTitle = async (newTitle: string) => {
    await changeTitle(task.id, newTitle);
  };

  const handleChangeColor = async (newColor: string) => {
    await changeColor(task.id, newColor);
  };

  const handleChangeDate = async (newDate: string) => {
    const isValid = newDate.length > 0 && dayjs(task.date).isValid();

    if (isValid) {
      await changeDate(task.id, task.date, parseDateFromInput(newDate));
    }
  };

  const handleChangeSchedule = async (newSchedule: string) => {
    if (!task.linkedRecurringTaskId) {
      await addSchedule(task, newSchedule);
    }
  };

  const isMobile = useMediaQuery("(max-width: 64rem)");

  const modalProps = {
    title: task.title,
    onChangeTitle: handleChangeTitle,
    date: formatDateForInput(task.date),
    onChangeDate: handleChangeDate,
    isCompleted: task.isCompleted,
    onToggleIsCompleted: handleToggleIsCompleted,
    color: task.color,
    onChangeColor: handleChangeColor,
    schedule: (task.linkedRecurringTask?.schedule || "").toString(),
    onChangeSchedule: handleChangeSchedule,
    onDelete: handleDeleteTask,
    isOpen: isOpen,
    onClose: onClose,
  };

  return isMobile ? (
    <MobileModal {...modalProps} />
  ) : (
    <DesktopModal {...modalProps} />
  );
};
