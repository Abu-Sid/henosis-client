import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { IUser } from "../../../auth/authManager";
import useForm from "../../../hooks/useForm";
import { RootState } from "../../../redux/reducers";
import ReactModal from "../../ReactModal/ReactModal";

interface IForm {
  handleInput: (e: any) => void;
  handleInvalid: (e: any) => void;
  handleSubmit: (submit: (data: any) => void) => (e: any) => void;
  error: any;
}

interface ITask {
  taskName: string;
  currentStatus: string;
  taskTime: string;
  assignedMember: IUser;
}

interface ISprint {
  status: string[];
  tasks: ITask[];
  sprintName: string;
  startDate: string;
  endDate: string;
  workspaceId: string;
  goals: string[];
}

interface IData {
  sprintName: string;
  startDate: string;
  endDate: string;
}

const inputData = [
  {
    title: "Sprint Name",
    name: "sprintName",
    type: "text",
  },
  {
    title: "Start Date",
    name: "startDate",
    type: "date",
  },
  {
    title: "End Date",
    name: "endDate",
    type: "date",
  },
];

const CreateSprint = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [goals, setGoals] = useState([1]);

  const { _id } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  const { handleInput, handleInvalid, handleSubmit, error }: IForm = useForm();

  useEffect(() => {
    const socketIo = io(
      "https://intense-peak-24388.herokuapp.com/create-sprint"
    );
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const submit = (data: IData) => {
    const goalData: string[] = [];
    const sprintData: ISprint = {
      workspaceId: _id,
      ...data,
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

  const lastGoal = goals[goals.length - 1];

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create Sprint</button>
      <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
          <h2>Sprint Information</h2>
          {inputData.map(({ title, name, type }, index) => (
            <div key={index}>
              <label htmlFor={name}>{title}</label>
              <input
                id={name}
                type={type}
                name={name}
                placeholder={title}
                onChange={handleInput}
                required
                onInvalid={handleInvalid}
              />
              {error[name] && (
                <p className="alert-error">{title} is required</p>
              )}
            </div>
          ))}
          <label>
            Goal <span>(optional)</span>
          </label>
          {goals.map((goal) => (
            <div key={goal} className="goal">
              <input
                type="text"
                name={"goal" + goal}
                placeholder={"Goal " + goal}
                onChange={handleInput}
              />
              {goal === lastGoal && (
                <label
                  onClick={() =>
                    setGoals((preGoals) => [
                      ...preGoals,
                      preGoals[preGoals.length - 1] + 1,
                    ])
                  }
                  className="add-btn"
                >
                  <FontAwesomeIcon style={{ fontSize: "22px" }} icon={faPlus} />
                </label>
              )}
            </div>
          ))}
          <button type="submit">Create Sprint</button>
        </form>
      </ReactModal>
    </div>
  );
};

export default CreateSprint;
