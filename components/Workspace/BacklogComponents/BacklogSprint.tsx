import { faEllipsisH, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactModal from "../../ReactModal/ReactModal";
import { ISprint, ITData } from "../WorkspacePages/Backlog";
import AddTaskModal from "./AddTaskModal";
import BacklogTask from "./BacklogTask";

interface IProps {
  sprint: ISprint;
  taskModal: boolean;
  setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAssignedMember: React.Dispatch<React.SetStateAction<string[]>>;
  submit: (data: ITData) => void;
}

const BacklogSprint = ({
  sprint,
  taskModal,
  setTaskModal,
  setAssignedMember,
  submit,
}: IProps) => {
  const { sprintName, startDate, endDate, tasks } = sprint;

  return (
    <div>
      <h1>{sprintName}</h1>
      <div className="sprint-section">
        <div className="sprint-section__top">
          <p>
            {new Date(startDate).toDateString()} -{" "}
            {new Date(endDate).toDateString()}
          </p>
          <div>
            <button>End Sprint</button>
            <button className="edit-btn">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
        </div>
        <div className="sprint-section__tasks">
          {tasks?.length === 0 && <h3>No Task Added</h3>}
          {tasks?.map((task, index) => (
            <BacklogTask key={task._id} task={task} index={index} />
          ))}
        </div>
        <button onClick={() => setTaskModal(true)}>
          <FontAwesomeIcon style={{ marginRight: "5px" }} icon={faPlus} /> Add
          Task
        </button>
      </div>
      <ReactModal modalIsOpen={taskModal} setIsOpen={setTaskModal}>
        <AddTaskModal submit={submit} setAssignedMember={setAssignedMember} />
      </ReactModal>
    </div>
  );
};

export default BacklogSprint;
