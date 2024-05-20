import { FC, useState } from "react";
import { TaskModalProps } from "../TaskModal";
import s from "./MobileModal.module.css";
import {
  Button,
  Dialog,
  DialogPanel,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import { Calendar } from "../../../icons/Calendar";
import {
  formatDateForInputLabel,
  parseDateFromInput,
} from "../../../utils/dateFormatting";
import { Delete } from "../../../icons/Delete";
import { Repeat } from "../../../icons/Repeat";
import { Color } from "../../../icons/Color";
import classNames from "classnames";
import { Check } from "../../../icons/Check";
import { Close } from "../../../icons/Close";
import { Color as ColorEnum } from "../../../types/color";

export const MobileModal: FC<TaskModalProps> = ({
  title,
  onChangeTitle,
  date,
  onChangeDate,
  isCompleted,
  onToggleIsCompleted,
  color,
  onChangeColor,
  onDelete,
  isOpen,
  onClose,
}) => {
  const [isChangeColorOpen, setIsChangeColorOpen] = useState<boolean>(false);

  const colors = Object.keys(ColorEnum).map((color) => color.toLowerCase());

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className={s.backdropFilter} aria-hidden="true">
        <div className={s.backdropColor} aria-hidden="true" />
      </div>
      <div className={s.modalContainer}>
        <DialogPanel
          className={classNames(s.modal, {
            [color]: true,
          })}
        >
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
              <Button className={s.actionButton} onClick={onClose}>
                <Close className={s.buttonIcon} />
              </Button>
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
            </div>
            <div className={s.buttonsArea}>
              {isChangeColorOpen && (
                <div className={s.colors}>
                  {colors.map((colorItem) => (
                    <Button
                      key={colorItem}
                      className={s.actionButton}
                      onClick={() => onChangeColor(colorItem)}
                    >
                      <div
                        className={classNames(s.buttonIcon, s.color, {
                          [colorItem]: true,
                          [s.selectedColor]: colorItem === color,
                        })}
                      />
                    </Button>
                  ))}
                </div>
              )}
              <div className={s.buttonsSection}>
                <Button className={s.actionButton} onClick={onDelete}>
                  <Delete className={s.buttonIcon} />
                </Button>
                <Button className={s.actionButton}>
                  <Repeat className={s.buttonIcon} />
                </Button>
                <Button
                  className={s.actionButton}
                  onClick={() =>
                    setIsChangeColorOpen((prevState) => !prevState)
                  }
                >
                  <Color className={s.buttonIcon} />
                </Button>
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
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
