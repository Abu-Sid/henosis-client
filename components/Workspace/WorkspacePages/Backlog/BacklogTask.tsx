import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ITask } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";
import { DropdownItem, DropdownMenu } from "../../../ui/Navbar/DropDown";

interface IProps {
  task: ITask;
  index: number;
  setUpdateTask: React.Dispatch<React.SetStateAction<ITask>>;
  setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BacklogTask = ({ task, index, setUpdateTask, setTaskModal }: IProps) => {
  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const assignedMembers = members.filter((member) =>
    task.assignedMember?.includes(member.email)
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (name: "edit" | "delete", task: ITask) => {
    if (name === "edit") {
      setUpdateTask(task);
      setTaskModal(true);
      setIsOpen(false);
    } else {
      // handleDelete
    }
  };

  return (
    <div className="single-task">
      <h2 className="task-name">
        #{index + 1} <span>{task.taskName}</span>
      </h2>
      <div className="assigned-section">
        <p
          className={
            task.currentStatus === "TO DO"
              ? "alert-error task-status"
              : task.currentStatus === "IN PROGRESS"
              ? "in-progress task-status"
              : "done task-status"
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
        <button onClick={() => setIsOpen(true)} className="edit-btn">
          <FontAwesomeIcon icon={faEllipsisH as IconProp} />
        </button>
        {isOpen && (
          <div className="backlog-dropdown">
            <DropdownMenu width={100} setIsOpen={setIsOpen}>
              <DropdownItem functionality={() => handleClick("edit", task)}>
                Edit
              </DropdownItem>
              <DropdownItem functionality={() => handleClick("delete", task)}>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default BacklogTask;
