import { FC, useState } from "react";
import s from "./RecurringTaskConfirmationModal.module.css";
import {
  Button,
  Dialog,
  DialogPanel,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import classNames from "classnames";
import { Check } from "../../../icons/Check";
import { Circle } from "../../../icons/Circle";
import { RecurringTaskActionMode } from "../../../types/recurringTaskActionMode";

const optionTexts = [
  "Only this task",
  "This and future tasks",
  "All linked tasks",
];

type RecurringTaskConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mode: RecurringTaskActionMode) => void;
};

export const RecurringTaskConfirmationModal: FC<
  RecurringTaskConfirmationModalProps
> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedValue, setSelectedValue] = useState<RecurringTaskActionMode>(
    RecurringTaskActionMode.One
  );

  const options = Object.keys(RecurringTaskActionMode).map((color) =>
    color.toLowerCase()
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className={s.backdropFilter} aria-hidden="true">
        <div className={s.backdropColor} aria-hidden="true" />
      </div>
      <div className={s.modalContainer}>
        <DialogPanel className={s.modal}>
          <h1 className={s.title}>This task is recurring</h1>
          <span>What do you want to change?</span>
          <RadioGroup
            className={s.radioGroup}
            value={selectedValue}
            onChange={setSelectedValue}
          >
            {options.map((option, index) => (
              <Field className={s.radioItem} key={option}>
                <Radio value={option}>
                  {selectedValue === option ? (
                    <Check className={s.radioIcon} />
                  ) : (
                    <Circle className={s.radioIcon} />
                  )}
                </Radio>
                <Label>{optionTexts[index]}</Label>
              </Field>
            ))}
          </RadioGroup>
          <div className={s.buttons}>
            <Button
              className={classNames(s.button, s.primary)}
              onClick={() => onSubmit(selectedValue)}
            >
              OK
            </Button>
            <Button
              className={classNames(s.button, s.secondary)}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
