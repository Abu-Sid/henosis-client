import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { RootState } from "../../../redux/reducers";
import BacklogSprint from "../BacklogComponents/BacklogSprint";
import CreateSprint from "../BacklogComponents/CreateSprint";

interface ITask {
  taskName: string;
  currentStatus: string;
  taskTime: string;
  assignedMember: string;
}

export interface IData {
  sprintName: string;
  startDate: string;
  endDate: string;
}

interface ISprint {
  status: string[];
  tasks: ITask[];
  sprintName: string;
  startDate: Date;
  endDate: Date;
  workspaceId: string;
  goals: string[];
  _id?: string;
}

const Backlog = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { workspaceName, _id } = workspace;

  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  const [sprint, setSprint] = useState<ISprint>({} as ISprint);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [goals, setGoals] = useState([1]);

  useEffect(() => {
    const socketIo = io("http://localhost:5000/sprint");
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

  console.log(sprint);

  return (
    <section className="backlog-section">
      <h2>
        Backlog
        <span> / {workspaceName}</span>
      </h2>
      <BacklogSprint />
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
