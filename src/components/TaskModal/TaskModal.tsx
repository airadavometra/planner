import { FC, useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { DesktopModal } from "./DesktopModal/DesktopModal";
import { MobileModal } from "./MobileModal/MobileModal";
import {
  formatDateForInput,
  parseDateFromInput,
} from "../../utils/dateFormatting";
import { useUpdateTask } from "../../firebase/hooks/useUpdateTask";
import { useDeleteTask } from "../../firebase/hooks/useDeleteTask";
import dayjs, { Dayjs } from "dayjs";
import { RecurringTaskConfirmationModal } from "./RecurringTaskConfirmationModal/RecurringTaskConfirmationModal";
import { RecurringTaskActionMode } from "../../types/recurringTaskActionMode";
import { useTasksStore } from "../../state/useTasks";

type TaskModalProps = {
  taskId: string;
  selectedDate: Dayjs;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal: FC<TaskModalProps> = ({
  taskId,
  isOpen,
  selectedDate,
  onClose,
}) => {
  const isMobile = useMediaQuery("(max-width: 64rem)");

  const tasks = useTasksStore((state) => state.tasks);

  const task = tasks.find((item) => item.id === taskId);

  const [isRecurringTaskModalOpen, setIsRecurringTaskModalOpen] =
    useState<boolean>(false);

  const handleSubmitRef = useRef<
    ((mode: RecurringTaskActionMode) => void) | null
  >(null);

  const { deleteTask, deleteAllLinkedTasks, deleteFutureLinkedTasks } =
    useDeleteTask();
  const {
    completeTask,
    changeTitle,
    changeAllLinkedTasksTitle,
    changeFutureLinkedTasksTitle,
    changeColor,
    changeAllLinkedTasksColor,
    changeFutureLinkedTasksColor,
    changeDate,
    addSchedule,
    changeSchedule,
  } = useUpdateTask();

  if (task === undefined) {
    return null;
  }

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
    onClose();
  };

  const handleToggleIsCompleted = async () => {
    await completeTask(task.id, task.date, !task.isCompleted);
  };

  const handleChangeTitle = async (
    newTitle: string,
    mode: RecurringTaskActionMode
  ) => {
    switch (mode) {
      case RecurringTaskActionMode.One: {
        await changeTitle(task.id, newTitle);
        break;
      }
      case RecurringTaskActionMode.All: {
        if (task.linkedRecurringTaskId) {
          await changeAllLinkedTasksTitle(task.linkedRecurringTaskId, newTitle);
        }
        break;
      }
      case RecurringTaskActionMode.Future: {
        if (task.linkedRecurringTaskId) {
          await changeFutureLinkedTasksTitle(
            task.linkedRecurringTaskId,
            task.date,
            newTitle
          );
        }
        break;
      }
    }
  };

  const handleChangeColor = async (
    newColor: string,
    mode: RecurringTaskActionMode
  ) => {
    switch (mode) {
      case RecurringTaskActionMode.One: {
        await changeColor(task.id, newColor);
        break;
      }
      case RecurringTaskActionMode.All: {
        if (task.linkedRecurringTaskId) {
          await changeAllLinkedTasksColor(task.linkedRecurringTaskId, newColor);
        }
        break;
      }
      case RecurringTaskActionMode.Future: {
        if (task.linkedRecurringTaskId) {
          await changeFutureLinkedTasksColor(
            task.linkedRecurringTaskId,
            task.date,
            newColor
          );
        }
        break;
      }
    }
  };

  const handleChangeDate = async (newDate: string) => {
    const isValid = newDate.length > 0 && dayjs(task.date).isValid();

    if (isValid) {
      await changeDate(task.id, task.date, parseDateFromInput(newDate));
    }
  };

  const handleChangeSchedule = async (newSchedule: string) => {
    if (task.linkedRecurringTaskId) {
      await changeSchedule(
        task.linkedRecurringTaskId,
        newSchedule,
        selectedDate
      );
    } else {
      await addSchedule(task, newSchedule);
    }
  };

  const modalProps = {
    title: task.title,
    onChangeTitle: (newTitle: string) => {
      if (task.linkedRecurringTaskId) {
        setIsRecurringTaskModalOpen(true);
        handleSubmitRef.current = (mode: RecurringTaskActionMode) =>
          handleChangeTitle(newTitle, mode);
      } else {
        handleChangeTitle(newTitle, RecurringTaskActionMode.One);
      }
    },
    date: formatDateForInput(task.date),
    onChangeDate: handleChangeDate,
    isCompleted: task.isCompleted,
    onToggleIsCompleted: handleToggleIsCompleted,
    color: task.color,
    onChangeColor: (newColor: string) => {
      if (task.linkedRecurringTaskId) {
        setIsRecurringTaskModalOpen(true);
        handleSubmitRef.current = (mode: RecurringTaskActionMode) =>
          handleChangeColor(newColor, mode);
      } else {
        handleChangeColor(newColor, RecurringTaskActionMode.One);
      }
    },
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
