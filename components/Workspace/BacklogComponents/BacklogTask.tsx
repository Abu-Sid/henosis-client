import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { ITask } from "../WorkspacePages/Backlog";

interface IProps {
  task: ITask;
  index: number;
}

const BacklogTask = ({ task, index }: IProps) => {
  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const assignedMembers = members.filter((member) =>
    task.assignedMember?.includes(member.email)
  );

  return (
    <div className="single-task">
      <h2 className="task-name">
        #{index + 1} <span>{task.taskName}</span>
      </h2>
      <div className="assigned-section">
        <p
          className={
            task.currentStatus === "TO DO"
              ? "alert-error"
              : task.currentStatus === "IN PROGRESS"
              ? "in-progress"
              : "done"
          }
        >
          {task.currentStatus}
        </p>
        {assignedMembers.map(({ _id, name, photo }) => (
          <div key={_id}>
            {photo ? (
              <img className="assigned-img" src={photo} alt="" />
            ) : (
              <p className="assigned-name">{name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BacklogTask;
