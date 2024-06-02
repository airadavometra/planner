import { FC, useRef, useState } from "react";
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
import { RecurringTaskConfirmationModal } from "./RecurringTaskConfirmationModal/RecurringTaskConfirmationModal";
import { RecurringTaskActionMode } from "../../types/recurringTaskActionMode";

type TaskModalProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal: FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  const [isRecurringTaskModalOpen, setIsRecurringTaskModalOpen] =
    useState<boolean>(false);

  const handleSubmitRef = useRef<
    ((mode: RecurringTaskActionMode) => void) | null
  >(null);

  const { deleteTask, deleteAllLinkedTasks, deleteFutureLinkedTasks } =
    useDeleteTask();
  const { completeTask, changeTitle, changeColor, changeDate, addSchedule } =
    useUpdateTask();

  const handleDeleteTask = async (mode: RecurringTaskActionMode) => {
    switch (mode) {
      case RecurringTaskActionMode.One: {
        await deleteTask(task.id);
        break;
      }
      case RecurringTaskActionMode.All: {
        if (task.linkedRecurringTaskId) {
          await deleteAllLinkedTasks(task.linkedRecurringTaskId);
        }
        break;
      }
      case RecurringTaskActionMode.Future: {
        if (task.linkedRecurringTaskId) {
          await deleteFutureLinkedTasks(task.linkedRecurringTaskId, task.date);
        }
        break;
      }
    }
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
    onDelete: () => {
      if (task.linkedRecurringTaskId) {
        setIsRecurringTaskModalOpen(true);
        handleSubmitRef.current = handleDeleteTask;
      } else {
        handleDeleteTask(RecurringTaskActionMode.One);
      }
    },
    isOpen: isOpen,
    onClose: onClose,
  };

  return isRecurringTaskModalOpen ? (
    <RecurringTaskConfirmationModal
      isOpen={isRecurringTaskModalOpen}
      onClose={() => setIsRecurringTaskModalOpen(false)}
      onSubmit={(mode: RecurringTaskActionMode) => {
        handleSubmitRef.current && handleSubmitRef.current(mode);
        setIsRecurringTaskModalOpen(false);
        onClose();
      }}
    />
  ) : isMobile ? (
    <MobileModal {...modalProps} />
  ) : (
    <DesktopModal {...modalProps} />
  );
};
