import { FC, useState } from "react";
import s from "./NewTaskButton.module.css";
import { Button } from "@headlessui/react";
import { TaskModal } from "../TaskModal/TaskModal";

const maxTasksCount = 4;

type NewTaskButtonProps = {
  plansCount: number;
};

export const NewTaskButton: FC<NewTaskButtonProps> = ({ plansCount }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const extraRowsCount = maxTasksCount - plansCount;

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
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
      </Button>
      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
