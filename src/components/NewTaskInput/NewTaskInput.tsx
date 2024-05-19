import { FC, useRef, useState } from "react";
import s from "./NewTaskInput.module.css";
import { Input } from "@headlessui/react";
import classNames from "classnames";
import { Dayjs } from "dayjs";
import { useMaxTasksCount } from "../../hooks/useMaxTasksCount";
import { useAddNewTask } from "../../firebase/hooks/useAddNewTask";

type NewTaskInputProps = {
  plansCount: number;
  date: Dayjs;
  nextTaskSortingIndex: number;
};

export const NewTaskInput: FC<NewTaskInputProps> = ({
  plansCount,
  date,
  nextTaskSortingIndex,
}) => {
  const addNewTask = useAddNewTask();
  const maxTasksCount = useMaxTasksCount();

  const [taskTitle, setTaskTitle] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    await addNewTask(taskTitle, date, nextTaskSortingIndex);

    setTaskTitle("");
  };

  const extraRowsCount = maxTasksCount - plansCount;

  return (
    <>
      <div>
        <Input
          className={classNames(s.input, s.taskRow)}
          type="text"
          ref={inputRef}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
          onBlur={handleSave}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSave();
            }
          }}
        />
        {extraRowsCount > 0 && (
          <>
            {Array(extraRowsCount)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className={classNames(s.taskRow, s.extraRow)}
                  aria-hidden="true"
                  onClick={() => inputRef.current?.focus()}
                >
                  Extra row
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};
