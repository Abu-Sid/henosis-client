import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { RootState } from "../../../redux/reducers";
import BacklogSprint from "../BacklogComponents/BacklogSprint";
import CreateSprint from "../BacklogComponents/CreateSprint";

export interface ITask {
  _id?: string;
  taskName: string;
  currentStatus: string;
  dueDate: Date;
  assignedMember: string[];
}

export interface IData {
  sprintName: string;
  startDate: string;
  endDate: string;
}

export interface ITData {
  taskName: string;
  dueDate: string;
}

export interface ISprint {
  status: string[];
  tasks: ITask[];
  sprintName: string;
  startDate: Date;
  endDate: Date;
  workspaceId: string;
  goals: string[];
  _id?: string;
}

let toastId: string;

const Backlog = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { workspaceName, _id } = workspace;

  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  const [sprint, setSprint] = useState<ISprint>({} as ISprint);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [taskModal, setTaskModal] = useState(false);

  const [goals, setGoals] = useState([1]);

  const [assignedMember, setAssignedMember] = useState<string[]>([]);

  useEffect(() => {
    const socketIo = io("https://intense-peak-24388.herokuapp.com/sprint");
    setSocket(socketIo);

    socketIo.emit("join-sprint", _id);

    socketIo.emit("current-sprint", _id);

    return () => {
      socketIo.disconnect();
    };
  }, [_id]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("send-current-sprint", (currentSprint: ISprint) => {
        setSprint(currentSprint);
      });

      socket.on("created-sprint", (createdSprint: ISprint) => {
        setIsOpen(false);
        alert("created Successfully");
        if (!sprint._id) {
          setSprint(createdSprint);
        }
      });

      socket.on("added-task", (tasks) => {
        toast.dismiss(toastId);
        setTaskModal(false);
        setSprint((preValue) => ({ ...preValue, tasks }));
      });
    }
  }, [sprint, socket, setSprint]);

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
      <BacklogSprint
        sprint={sprint}
        taskModal={taskModal}
        setTaskModal={setTaskModal}
        submit={handleSubmit}
        setAssignedMember={setAssignedMember}
      />
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
