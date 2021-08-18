import React, { forwardRef } from "react";
import { HiOutlinePlus } from "react-icons/hi";

interface IProps {
  statusName: string;
  children: React.ReactNode;
  handleAddTask: (status: string) => void;
}

const StatusBoards = (
  { statusName, children, handleAddTask, ...rest }: IProps,
  ref: React.MutableRefObject<undefined>
) => {
  let color: string;
  if (statusName.toLowerCase() === "to do") {
    color = "red";
  } else if (statusName.toLowerCase() === "in progress") {
    color = "orange";
  } else if (statusName.toLowerCase() === "done") {
    color = "green";
  }

  return (
    <div className="status-board" ref={ref} {...rest}>
      <p className={`status-board__indicator ${color}`}>{statusName}</p>
      <div>{children}</div>
      <button onClick={() => handleAddTask(statusName)}>
        <HiOutlinePlus />
      </button>
    </div>
  );
};

export default forwardRef(StatusBoards);
