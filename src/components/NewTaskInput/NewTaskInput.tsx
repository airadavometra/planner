import { FC, useRef, useState } from "react";
import s from "./NewTaskInput.module.css";
import { Input } from "@headlessui/react";
import classNames from "classnames";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDefaultTask } from "../../utils/getDefaultTask";
import { Dayjs } from "dayjs";
import { useMaxTasksCount } from "../../hooks/useMaxTasksCount";

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
  const [user] = useAuthState(auth);
  const maxTasksCount = useMaxTasksCount();

  const [taskTitle, setTaskTitle] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    const trimmedTaskTitle = taskTitle.trim();

    if (user && trimmedTaskTitle.length > 0) {
      await addDoc(
        collection(db, "tasks"),
        getDefaultTask(trimmedTaskTitle, user.uid, date, nextTaskSortingIndex)
      );
      setTaskTitle("");
    }
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
