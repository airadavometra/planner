import { FC, useState } from "react";
import s from "./TaskModal.module.css";
import { Check } from "../../icons/Check";
import { Task } from "../../types/task";
import { Button, Dialog, DialogPanel, Input } from "@headlessui/react";
import { Calendar } from "../../icons/Calendar";
import { Delete } from "../../icons/Delete";
import { Repeat } from "../../icons/Repeat";
import { Color } from "../../icons/Color";
import classNames from "classnames";
import { Dayjs } from "dayjs";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

type TaskModalProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal: FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  const [user] = useAuthState(auth);

  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const [taskDate /*setTaskDate*/] = useState<Dayjs>(task.date);
  const [taskIsCompleted, setTaskIsCompleted] = useState<boolean>(
    task.isCompleted
  );

  const handleSaveTitle = async () => {
    if (user && taskTitle.length > 0) {
      const taskRef = doc(db, "tasks", task.id);

      await updateDoc(taskRef, {
        title: taskTitle,
      });

      // await setDoc(collection(db, "tasks", task.id), {
      //   title: taskTitle,
      //   date: dayjs().format("DD.MM.YYYY"),
      //   isCompleted: false,
      //   order: 0,
      //   color: "red",
      //   uid: user.uid,
      //   id: task.id,
      // });
    }
  };

  const handleDeleteTask = async () => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className={s.backdropFilter} aria-hidden="true">
        <div className={s.backdropColor} aria-hidden="true" />
      </div>
      <div className={s.modalContainer}>
        <DialogPanel>
          <div className={s.content}>
            <div className={s.header}>
              <Button className={s.dateButton}>
                <Calendar className={s.buttonIcon} />
                <span>{taskDate.format("ddd, D MMM YYYY")}</span>
              </Button>
              <div>
                <Button className={s.actionButton} onClick={handleDeleteTask}>
                  <Delete className={s.buttonIcon} />
                </Button>
                <Button className={s.actionButton}>
                  <Repeat className={s.buttonIcon} />
                </Button>
                <Button className={s.actionButton}>
                  <Color className={s.buttonIcon} />
                </Button>
              </div>
            </div>
            <div className={s.inputSection}>
              <Input
                className={classNames(s.input, {
                  [s.checked]: taskIsCompleted,
                })}
                autoFocus
                type="text"
                value={taskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                }}
                onBlur={handleSaveTitle}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSaveTitle;
                  }
                }}
              />
              <Button
                className={classNames(s.actionButton, {
                  [s.checked]: taskIsCompleted,
                })}
                onClick={() => setTaskIsCompleted((prevValue) => !prevValue)}
              >
                <Check className={s.buttonIcon} />
              </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
