import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../../../hooks/useSocket";
import {
  addTask,
  createdSprint,
  sendCurrentSprint,
} from "../../../../redux/actions/sprintActions";
import {
  ISprint,
  ITask,
} from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";
import LoadingAnimation from "../../../ui/Animation/LoadingAnimation";
import BacklogSprint from "./BacklogSprint";
import CreateSprint from "./CreateSprint";

export interface IData {
  sprintName: string;
  startDate: string;
  endDate: string;
}

export interface ITData {
  taskName: string;
  dueDate: string;
}

let toastId: string;

const Backlog = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { loading, sprint } = useSelector(
    (state: RootState) => state.sprintReducer
  );

  const { workspaceName, _id } = workspace;

  const dispatch = useDispatch();

  const socket = useSocket("/sprint");

  const [modalIsOpen, setIsOpen] = useState(false);

  const [taskModal, setTaskModal] = useState(false);

  const [goals, setGoals] = useState([1]);

  const [assignedMember, setAssignedMember] = useState<string[]>([]);

  useEffect(() => {
    if (socket !== null) {
      socket.emit("join-sprint", _id);

      socket.emit("current-sprint", _id);

      socket.on("send-current-sprint", (currentSprint: ISprint) => {
        dispatch(sendCurrentSprint(currentSprint));
      });

      socket.on("created-sprint", (currentSprint: ISprint) => {
        setIsOpen(false);
        toast.dismiss(toastId);
        toast.success("created Successfully!");
        dispatch(createdSprint(currentSprint));
      });

      socket.on("added-task", (tasks) => {
        toast.dismiss(toastId);
        setTaskModal(false);
        toast.success("Task Added Successfully!");
        dispatch(addTask(tasks));
      });
    }
  }, [socket, _id, dispatch]);

  const submit = (data: IData) => {
    const goalData: string[] = [];
    const sprintData: ISprint = {
      workspaceId: _id,
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: ["TO DO", "IN PROGRESS", "DONE"],
      tasks: [] as ITask[],
      goals: goalData,
    };
    goals.forEach((goal) => {
      goalData.push(data["goal" + goal]);
      delete sprintData["goal" + goal];
    });
    if (socket !== null) {
      socket.emit("create-sprint", { ...sprintData, goals: goalData });
      toastId = toast.loading("Loading...");
    }
  };

  const handleSubmit = (data: ITData) => {
    if (assignedMember.length) {
      const taskData = {
        ...data,
        assignedMember,
        currentStatus: "TO DO",
        dueDate: new Date(data.dueDate),
      };
      if (socket !== null) {
        socket.emit("add-task", sprint._id, [...sprint.tasks, taskData]);
        toastId = toast.loading("Loading...");
      }
    } else {
      alert("Please Assign Member");
    }
  };

  return (
    <section className="backlog-section">
      <h2>
        Backlog
        <span> / {workspaceName}</span>
      </h2>
      {loading ? (
        <LoadingAnimation />
      ) : sprint._id ? (
        <BacklogSprint
          taskModal={taskModal}
          setTaskModal={setTaskModal}
          submit={handleSubmit}
          setAssignedMember={setAssignedMember}
        />
      ) : (
        <h1
          style={{ textAlign: "center", color: "red" }}
          className="alert-error"
        >
          No Sprint Here
        </h1>
      )}
      <CreateSprint
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        submit={submit}
        goals={goals}
        setGoals={setGoals}
      />
    </section>
  );
};

export default Backlog;
