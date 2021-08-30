import React from "react";

interface ITask {
  taskName: string;
  dueDate: string | object;
  status: string;
}

const AssignedToMe: React.FC = () => {
  return (
    <>
      <div className='assigned-to-me__header'>
        <div className='assigned-to-me__header__task-name'>
          <p>Task</p>
        </div>
        <div className='assigned-to-me__header__due-date'>
          <p>Due Date</p>
        </div>
        <div className='assigned-to-me__header__status'>
          <p>Status</p>
        </div>
      </div>
      <TaskCard taskName='Testing 1' dueDate='20/08/2021' status='Done' />
      <TaskCard taskName='Testing 2' dueDate='25/08/2021' status='To Do' />
      <TaskCard
        taskName='Testing 3'
        dueDate='30/08/2021'
        status='In progress'
      />
    </>
  );
};

const TaskCard: React.FC<ITask> = ({ taskName, dueDate, status }) => {
  const currentStatus = status.toLowerCase().replace(/\s+/g, "");

  let color;
  if (currentStatus === "todo") {
    color = "#eb5757";
  } else if (currentStatus === "inprogress") {
    color = "#f2994a";
  } else if (currentStatus === "done") {
    color = "#27ae60";
  }
  return (
    <div className='assigned-to-me__task'>
      <div className='assigned-to-me__task__task-name'>
        <p>{taskName}</p>
      </div>
      <div className='assigned-to-me__task__due-date'>
        <p>{dueDate}</p>
      </div>
      <div className='assigned-to-me__task__status'>
        <p style={{ color: color }}>{status}</p>
      </div>
    </div>
  );
};

export default AssignedToMe;
