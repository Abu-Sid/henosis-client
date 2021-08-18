import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
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

  const { name, email } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const { workspaceName, _id } = workspace;

  const dispatch = useDispatch();

  const socket = useSocket("/sprint");

  const [modalIsOpen, setIsOpen] = useState(false);

  const [taskModal, setTaskModal] = useState(false);

  const [goals, setGoals] = useState([1]);

  const [assignedMember, setAssignedMember] = useState<string[]>([]);

  const [selectMember, setMember] = useState<string[]>([]);

  const handleUpdateTask = ({ _id, ...rest }: ITask) => {
    const updateAble = sprint.tasks.find((task) => task._id === _id);
    const index = sprint.tasks.findIndex((task) => task._id === _id);
    const newTasks = [...sprint.tasks];
    newTasks[index] = {
      ...updateAble,
      ...rest,
      assignedMember: selectMember.length
        ? selectMember
        : updateAble.assignedMember,
    };
    if (socket !== null) {
      socket.emit("add-task", sprint._id, newTasks, {
        name,
        email,
        isUpdate: "Updated",
      });
      toastId = toast.loading("Loading...");
    }
  };

  const handleTaskDelete = (_id: string) => {
    const newTasks = sprint.tasks.filter((task) => task._id !== _id);
    if (socket !== null) {
      socket.emit("add-task", sprint._id, newTasks, {
        name,
        email,
        isUpdate: "Deleted",
      });
      toastId = toast.loading("Loading...");
    }
  };

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

      socket.on(
        "added-task",
        (
          tasks: ITask[],
          user: { name: string; email: string; isUpdate?: string }
        ) => {
          if (user) {
            toast.dismiss(toastId);
            setTaskModal(false);
            if (user.email === email) {
              toast.success(
                `Your Task ${user.isUpdate || "Added"} Successfully!`
              );
              if (user.isUpdate === "Deleted") {
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
              }
            } else {
              toast.success(`${user.name} ${user.isUpdate || "Added"} A Task!`);
            }
          }
          dispatch(addTask(tasks));
        }
      );
    }
  }, [socket, _id, dispatch, email]);

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
      if (data["goal" + goal]) {
        goalData.push(data["goal" + goal]);
      }
      delete sprintData["goal" + goal];
    });
    if (socket !== null) {
      socket.emit("create-sprint", { ...sprintData, goals: goalData });
      toastId = toast.loading("Loading...");
      setIsOpen(false);
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
        socket.emit("add-task", sprint._id, [...sprint.tasks, taskData], {
          name,
          email,
        });
        toastId = toast.loading("Loading...");
        setAssignedMember([] as string[]);
      }
    } else {
      Swal.fire("Please Assign Member!", "", "error");
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
          handleUpdateTask={handleUpdateTask}
          setMember={setMember}
          handleTaskDelete={handleTaskDelete}
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
