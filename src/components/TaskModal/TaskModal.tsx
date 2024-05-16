import { FC } from "react";
import s from "./TaskModal.module.css";
import { Check } from "../../icons/Check";
import {
  Button,
  Dialog,
  DialogPanel,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { Calendar } from "../../icons/Calendar";
import { Delete } from "../../icons/Delete";
import { Repeat } from "../../icons/Repeat";
import { Color } from "../../icons/Color";
import classNames from "classnames";
import {
  formatDateForInputLabel,
  parseDateFromInput,
} from "../../utils/dateFormatting";

type TaskModalProps = {
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

export const TaskModal: FC<TaskModalProps> = ({
  title,
  onChangeTitle,
  date,
  onChangeDate,
  isCompleted,
  onToggleIsCompleted,
  onDelete,
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className={s.backdropFilter} aria-hidden="true">
        <div className={s.backdropColor} aria-hidden="true" />
      </div>
      <div className={s.modalContainer}>
        <DialogPanel className={s.modal}>
          <div className={s.content}>
            <div className={s.header}>
              <Field className={s.inputContainer}>
                <Label className={s.inputLabel}>
                  <Calendar className={s.buttonIcon} />
                  <span>
                    {formatDateForInputLabel(parseDateFromInput(date))}
                  </span>
                </Label>
                <div className={s.dateInputContainer}>
                  <Input
                    className={s.dateInput}
                    type="date"
                    value={date}
                    onChange={(e) => {
                      onChangeDate(e.target.value);
                    }}
                  />
                </div>
              </Field>
              <div>
                <Button className={s.actionButton} onClick={onDelete}>
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
                  [s.checked]: isCompleted,
                })}
                autoFocus
                type="text"
                value={title}
                onChange={(e) => {
                  onChangeTitle(e.target.value);
                }}
              />
              <Button
                className={classNames(s.actionButton, {
                  [s.checked]: isCompleted,
                })}
                onClick={onToggleIsCompleted}
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
