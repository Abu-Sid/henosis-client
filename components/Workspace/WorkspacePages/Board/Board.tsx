import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import Swal from "sweetalert2";
import { IUser } from "../../../../auth/authManager";
import useSocket from "../../../../hooks/useSocket";
import {
  addTask,
  sendCurrentSprint,
} from "../../../../redux/actions/sprintActions";
import {
  ISprint,
  ITask,
} from "../../../../redux/actions/sprintActions/actionInterface";
import { addMembers } from "../../../../redux/actions/workspaceActions";
import { RootState } from "../../../../redux/reducers";
import LoadingAnimation from "../../../ui/Animation/LoadingAnimation";
import BoardHeader from "./BoardHeader";
import BoardMain from "./BoardMain";
import BoardMembers from "./BoardMembers";

interface IProps {
  workspaceSocket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

let toastId: string;

const Board = ({ workspaceSocket }: IProps) => {
  const socket = useSocket("/sprint");

  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { email, name } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const { loading, sprint } = useSelector(
    (state: RootState) => state.sprintReducer
  );

  const { tasks } = sprint;

  const { _id, workspaceName, previousMails } = workspace;

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

      socket.on(
        "added-task",
        (
          tasks: ITask[],
          user?: { name: string; email: string; isUpdate?: string }
        ) => {
          toast.dismiss(toastId);
          dispatch(addTask(tasks));
          if (user) {
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
        }
      );
    }
  }, [socket, _id, dispatch, email]);

  useEffect(() => {
    if (workspaceSocket !== null) {
      workspaceSocket.on("mail-sended", () => {
        toast.dismiss(toastId);
      });
    }
  }, [workspaceSocket]);

  const handleAddMember = (data: any) => {
    const newMembers = Object.values(data).join(", ");

    if (workspaceSocket !== null) {
      const origin = window.location.origin;
      workspaceSocket.emit("send-access-email", {
        email,
        name,
        toEmail: newMembers,
        workspaceName,
        id: _id,
        path: "accept-request",
        origin,
        previousMails,
      });
      toastId = toast.loading("Loading...");
      setIsOpen(false);
    }
  };

  const sendTask = (items: ITask[]) => {
    if (socket !== null) {
      socket.emit("add-task", sprint._id, items);
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    if (source.droppableId !== destination.droppableId) {
      const currentStatus = destination.droppableId;
      const findItem = items.find((item) => item._id === draggableId);
      const findIndex = items.findIndex((item) => item._id === draggableId);
      const newItems = [...items];
      newItems[findIndex] = { ...findItem, currentStatus };
      dispatch(addTask(newItems));
      sendTask(newItems);
    } else if (source.index !== destination.index) {
      dispatch(addTask(items));
      sendTask(items);
    }
  };

  const handleDelete = (_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTasks = sprint.tasks.filter((task) => task._id !== _id);
        if (socket !== null) {
          socket.emit("add-task", sprint._id, newTasks, {
            name,
            email,
            isUpdate: "Deleted",
          });
          toastId = toast.loading("Loading...");
        }
      }
    });
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
          <BoardMain
            handleOnDragEnd={handleOnDragEnd}
            handleDelete={handleDelete}
          />
        </section>
      ) : (
        <div className="board-error">
          <h1 className="alert-error">No Sprint Here</h1>
          <Link href={`/workspaces/${_id}/backlog`} passHref>
            <button className="button-primary">Create A Sprint</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Board;
