import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../../../auth/authManager";
import useSocket from "../../../../hooks/useSocket";
import { sendCurrentSprint } from "../../../../redux/actions/sprintActions";
import { ISprint } from "../../../../redux/actions/sprintActions/actionInterface";
import { addMembers } from "../../../../redux/actions/workspaceActions";
import { RootState } from "../../../../redux/reducers";
import LoadingAnimation from "../../../ui/Animation/LoadingAnimation";
import BoardHeader from "./BoardHeader";
import BoardMembers from "./BoardMembers";
import StatusBoards from "./StatusBoards";
import TaskCard from "./TaskCard";

let toastId: string;

const Board = () => {
  const socket = useSocket("/sprint");

  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { loading, sprint } = useSelector(
    (state: RootState) => state.sprintReducer
  );

  const { _id, members } = workspace;

  const { status, tasks } = sprint || {};

  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket !== null) {
      socket.emit("join-sprint", _id);

      socket.emit("current-sprint", _id);

      socket.on("send-current-sprint", (currentSprint: ISprint) => {
        dispatch(sendCurrentSprint(currentSprint));
      });

      socket.on("added-member", (members: IUser[]) => {
        toast.dismiss(toastId);
        dispatch(addMembers(members));
        toast.success("Member Added Successfully!");
      });

      // socket.on("added-task", (tasks) => {
      //   toast.dismiss(toastId);
      //   setTaskModal(false);
      //   toast.success("Task Added Successfully!");
      //   dispatch(addTask(tasks));
      // });
    }
  }, [socket, _id, dispatch]);

  const handleAddMember = (data: any) => {
    const newMembers = Object.values(data).map((email: string) => ({
      email,
      name: email.split("@")[0],
      photo: "",
      emailVerified: true,
    }));
    if (socket !== null) {
      socket.emit("add-member", _id, [...members, ...newMembers]);
      toastId = toast.loading("Loading...");
      setIsOpen(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : sprint._id ? (
        <section className="board-section">
          <BoardHeader />
          <BoardMembers
            submit={handleAddMember}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
          />
          <div className="status-board-container">
            {status?.map((status) => (
              <StatusBoards key={status} statusName={status}>
                {tasks?.map((task) =>
                  task.currentStatus === status ? (
                    <TaskCard key={task._id} task={task} />
                  ) : null
                )}
              </StatusBoards>
            ))}
          </div>
        </section>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "red" }} className="alert-error">
            No Sprint Here
          </h1>
          <Link href={`/workspaces/${_id}/backlog`} passHref>
            <button className="button-primary">Create A Sprint</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Board;
