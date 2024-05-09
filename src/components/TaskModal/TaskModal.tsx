import { FC, useState } from "react";
import s from "./TaskModal.module.css";
import { Check } from "../../icons/Check";
import { Task } from "../../types/task";
import { Dialog, DialogPanel, Input } from "@headlessui/react";
import { Calendar } from "../../icons/Calendar";
import { Delete } from "../../icons/Delete";
import { Repeat } from "../../icons/Repeat";
import { Color } from "../../icons/Color";
import classNames from "classnames";

type TaskModalProps = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal: FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  const [taskTitle, setTaskTitle] = useState<string>(task.title);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className={s.backdropFilter} aria-hidden="true">
        <div className={s.backdropColor} aria-hidden="true" />
      </div>
      <div className={s.modalContainer}>
        <DialogPanel>
          <div className={s.header}>
            <button className={s.dateButton}>
              <Calendar className={s.buttonIcon} />
              <span>{task.date.format("ddd, D MMM YYYY")}</span>
            </button>
            <div>
              <button className={s.actionButton}>
                <Delete className={s.buttonIcon} />
              </button>
              <button className={s.actionButton}>
                <Repeat className={s.buttonIcon} />
              </button>
              <button className={s.actionButton}>
                <Color className={s.buttonIcon} />
              </button>
            </div>
          </div>
          <div className={s.inputSection}>
            <Input
              className={classNames(s.input, {
                [s.checked]: task.isCompleted,
              })}
              autoFocus
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
            />
            <button
              className={classNames(s.actionButton, {
                [s.checked]: task.isCompleted,
              })}
            >
              <Check className={s.buttonIcon} />
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
