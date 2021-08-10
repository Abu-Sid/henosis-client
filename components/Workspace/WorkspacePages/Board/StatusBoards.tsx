import React from "react";

interface IProps {
  statusName: string;
}

const StatusBoards: React.FC<IProps> = ({ statusName, children }) => {
  let color;
  if (statusName.toLowerCase() === "to do") {
    color = "red";
  } else if (statusName.toLowerCase() === "in progress") {
    color = "orange";
  } else if (statusName.toLowerCase() === "done") {
    color = "green";
  }
  return (
    <div className='status-board'>
      <p className={`status-board__indicator ${color}`}>{statusName}</p>
      <div>{children}</div>
    </div>
  );
};

export default StatusBoards;
