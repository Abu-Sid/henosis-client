import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { ITask } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";

const AssignedToMe = () => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const { tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  const userTasks = tasks.filter((task) => task.assignedMember.includes(email));

  return (
    <>
      <div className="assigned-to-me__header">
        <div className="assigned-to-me__header__task-name">
          <p>Task</p>
        </div>
        <div className="assigned-to-me__header__due-date">
          <p>Due Date</p>
        </div>
        <div className="assigned-to-me__header__status">
          <p>Status</p>
        </div>
      </div>
      {userTasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </>
  );
};

interface IProps {
  task: ITask;
}

const TaskCard: React.FC<IProps> = ({ task }) => {
  const { currentStatus, taskName, dueDate } = task;

  const status = currentStatus.toLowerCase().replace(/\s+/g, "");

  let color: string;
  if (status === "todo") {
    color = "#eb5757";
  } else if (status === "inprogress") {
    color = "#f2994a";
  } else if (status === "done") {
    color = "#27ae60";
  }
  return (
    <div className="assigned-to-me__task">
      <div className="assigned-to-me__task__task-name">
        <p>{taskName}</p>
      </div>
      <div className="assigned-to-me__task__due-date">
        <p>{format(new Date(dueDate), "dd/MM/yyyy")}</p>
      </div>
      <div className="assigned-to-me__task__status">
        <p style={{ color: color }}>{currentStatus}</p>
      </div>
    </div>
  );
};

export default AssignedToMe;
