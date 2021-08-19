import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ITask } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";
import Modal from "../../../Modal/Modal";
import AddTaskModal from "./AddTaskModal";
import { ITData } from "./Backlog";
import BacklogTask from "./BacklogTask";

interface IProps {
  taskModal: boolean;
  setTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAssignedMember: React.Dispatch<React.SetStateAction<string[]>>;
  submit: (data: ITData) => void;
  handleUpdateTask: (data: ITask) => void;
  setMember: React.Dispatch<React.SetStateAction<string[]>>;
  handleTaskDelete: (_id: string) => void;
}

const BacklogSprint = ({
  taskModal,
  setTaskModal,
  setAssignedMember,
  submit,
  handleUpdateTask,
  setMember,
  handleTaskDelete,
}: IProps) => {
  const { sprint } = useSelector((state: RootState) => state.sprintReducer);

  const { sprintName, startDate, endDate, tasks } = sprint;

  const [updateTask, setUpdateTask] = useState<ITask>(null as ITask);

  useEffect(() => {
    if (!taskModal) {
      setUpdateTask(null as ITask);
    }
  }, [taskModal]);

  return (
    <div>
      <h1>{sprintName}</h1>
      <div className="sprint-section">
        <div className="sprint-section__inner">
          <div className="sprint-section__top">
            <p>
              {new Date(startDate).toDateString()} -{" "}
              {new Date(endDate).toDateString()}
            </p>
            <div>
              <button>End Sprint</button>
              <button className="edit-btn">
                <FontAwesomeIcon icon={faEllipsisH as IconProp} />
              </button>
            </div>
          </div>
          <div className="sprint-section__tasks">
            {tasks.length === 0 && <h3>No Task Added</h3>}
            {tasks.map((task, index) => (
              <BacklogTask
                setUpdateTask={setUpdateTask}
                key={task._id}
                task={task}
                index={index}
                setTaskModal={setTaskModal}
                handleTaskDelete={handleTaskDelete}
              />
            ))}
          </div>
          <button onClick={() => setTaskModal(true)}>
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faPlus as IconProp}
            />{" "}
            Add Task
          </button>
        </div>
      </div>
      <Modal modalIsOpen={taskModal} setIsOpen={setTaskModal}>
        {updateTask ? (
          <AddTaskModal
            submit={handleUpdateTask}
            setAssignedMember={setMember}
            updateTask={updateTask}
          />
        ) : (
          <AddTaskModal submit={submit} setAssignedMember={setAssignedMember} />
        )}
      </Modal>
    </div>
  );
};

export default BacklogSprint;
