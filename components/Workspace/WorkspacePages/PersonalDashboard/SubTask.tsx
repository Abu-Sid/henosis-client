import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { addTask } from "../../../../redux/actions/sprintActions";
import { RootState } from "../../../../redux/reducers";
import SubTaskModal from "./SubTaskModal";

interface ISubTaskHeader {
  handleAddSubTask: () => void;
}

interface ISubTaskCard {
  subTaskName: string;
  taskName: string;
}

interface IOption {
  value: string;
  label: string;
}

interface IData {
  subtaskName: string;
}

interface IProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const SubTask: React.FC<IProps> = ({ socket }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState("");

  const [selectError, setSelectError] = useState(false);

  const { tasks } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  const dispatch = useDispatch();

  const handleAddSubTask = () => {
    setIsOpen(true);
  };

  console.log(tasks);

  const submit = (data: IData) => {
    if (selectedTask) {
      setSelectError(false);
      //socket
      const newTasks = [...tasks];
      const index = tasks.findIndex((task) => task._id === selectedTask);
      const task = tasks.find((task) => task._id === selectedTask);
      const subtasks = [...task.subTasks, data.subtaskName];
      task.subTasks = subtasks;
      newTasks[index] = task;
      dispatch(addTask(tasks));
    } else {
      setSelectError(true);
    }
  };

  const handleChange = (value: IOption) => {
    setSelectError(!value.value);
    setSelectedTask(value.value);
  };

  return (
    <>
      <SubTaskHeader handleAddSubTask={handleAddSubTask} />
      <SubTaskCard subTaskName="testing 1.1" taskName="testing 1" />
      <SubTaskModal
        submit={submit}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        handleChange={handleChange}
        selectError={selectError}
      />
    </>
  );
};

const SubTaskHeader: React.FC<ISubTaskHeader> = ({ handleAddSubTask }) => {
  return (
    <div className="personal-dashboard__sub-task__header">
      <h1>Add sub-task</h1>
      <div className="sub-task-add-button" onClick={handleAddSubTask}>
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 18.75V25M25 25V31.25M25 25H31.25M25 25H18.75M43.75 25C43.75 35.3553 35.3553 43.75 25 43.75C14.6447 43.75 6.25 35.3553 6.25 25C6.25 14.6447 14.6447 6.25 25 6.25C35.3553 6.25 43.75 14.6447 43.75 25Z"
            stroke="#4A4FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

const SubTaskCard: React.FC<ISubTaskCard> = ({ subTaskName, taskName }) => {
  const [cutLine, setCutLine] = useState(false);
  return (
    <div className="personal-dashboard__sub-task__card">
      <div className="card-info">
        <h1
          className={
            cutLine
              ? "card-info__sub-task-name cut-line"
              : "card-info__sub-task-name"
          }
        >
          {subTaskName}
        </h1>
        <p
          className={
            cutLine
              ? "card-info__sub-task-name cut-line"
              : "card-info__sub-task-name"
          }
        >
          sub task of {taskName}
        </p>
      </div>
      <div className="card-checkbox">
        <input type="checkbox" onChange={() => setCutLine(!cutLine)} />
      </div>
    </div>
  );
};

export default SubTask;
