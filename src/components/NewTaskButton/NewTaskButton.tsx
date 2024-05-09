import { FC } from "react";
import s from "./NewTaskButton.module.css";

const maxTasksCount = 4;

type NewTaskButtonProps = {
  plansCount: number;
};

export const NewTaskButton: FC<NewTaskButtonProps> = ({ plansCount }) => {
  const extraRowsCount = maxTasksCount - plansCount;

  return (
    <button>
      <div className={s.taskRow}>Add new task</div>
      {extraRowsCount > 0 && (
        <>
          {Array(extraRowsCount)
            .fill(0)
            .map((_, index) => (
              <div key={index} className={s.taskRow} aria-hidden="true">
                Extra row
              </div>
            ))}
        </>
      )}
    </button>
  );
};
