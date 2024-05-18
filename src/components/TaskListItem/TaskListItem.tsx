import { FC, useEffect, useState } from "react";
import s from "./TaskListItem.module.css";
import { Check } from "../../icons/Check";
import classNames from "classnames";
import { Task } from "../../types/task";
import { TaskModal } from "../TaskModal/TaskModal";
import { Button } from "@headlessui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";
import {
  formatDateForDb,
  parseDateFromInput,
  formatDateForInput,
} from "../../utils/dateFormatting";

type TaskListItemProps = {
  task: Task;
};

export const TaskListItem: FC<TaskListItemProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [user] = useAuthState(auth);

  const [title, setTitle] = useState<string>(task.title);
  const [date, setDate] = useState<string>(formatDateForInput(task.date));
  const [isCompleted, setIsCompleted] = useState<boolean>(task.isCompleted);

  useEffect(() => {
    if (!isModalOpen) {
      const saveData = async () => {
        if (user) {
          const taskRef = doc(db, "tasks", task.id);

          const newTaskTitle = title.trim();
          const newDate = parseDateFromInput(date);

          await updateDoc(taskRef, {
            title: newTaskTitle.length > 0 ? newTaskTitle : task.title,
            date: formatDateForDb(newDate),
            isCompleted: isCompleted,
          });
        }
      };
      saveData();
    }
  }, [isModalOpen]);
  const handleDeleteTask = async () => {
    if (user) {
      await deleteDoc(doc(db, "tasks", task.id));
    }
  };

  const handleCompleteTask = async (isCompleted: boolean) => {
    if (user) {
      const taskRef = doc(db, "tasks", task.id);

      await updateDoc(taskRef, {
        isCompleted: isCompleted,
      });
    }
  };

  return (
    <>
      <div className={s.container}>
        <Button
          className={classNames(s.textButton, {
            [s.checked]: task.isCompleted,
          })}
          onClick={() => setIsModalOpen(true)}
        >
          {task.title}
        </Button>
        <Button
          className={classNames(s.checkButton, {
            [s.checked]: task.isCompleted,
          })}
          onClick={() => {
            setIsCompleted((prev) => {
              handleCompleteTask(!prev);
              return !prev;
            });
          }}
        >
          <Check className={s.checkIcon} />
        </Button>
      </div>
      {isModalOpen && (
        <TaskModal
          title={title}
          onChangeTitle={setTitle}
          date={date}
          onChangeDate={(newDate: string) => {
            const isValid = newDate.length > 0 && dayjs(date).isValid();
            setDate(isValid ? newDate : formatDateForInput(task.date));
          }}
          isCompleted={isCompleted}
          onToggleIsCompleted={() => setIsCompleted((prev) => !prev)}
          onDelete={handleDeleteTask}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
