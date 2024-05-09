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
import dayjs from "dayjs";

type TaskModalProps = {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal: FC<TaskModalProps> = ({ task, isOpen, onClose }) => {
  const [taskTitle, setTaskTitle] = useState<string>(task?.title || "");

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
                <span>{(task?.date || dayjs()).format("ddd, D MMM YYYY")}</span>
              </Button>
              <div>
                <Button className={s.actionButton}>
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
                  [s.checked]: task?.isCompleted,
                })}
                autoFocus
                value={taskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                }}
              />
              <Button
                className={classNames(s.actionButton, {
                  [s.checked]: task?.isCompleted,
                })}
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
