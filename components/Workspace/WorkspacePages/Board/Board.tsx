import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../../../hooks/useSocket";
import { sendCurrentSprint } from "../../../../redux/actions/sprintActions";
import { ISprint } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";
import LoadingAnimation from "../../../ui/Animation/LoadingAnimation";
import BoardHeader from "./BoardHeader";
import BoardMembers from "./BoardMembers";
import StatusBoards from "./StatusBoards";
import TaskCard from "./TaskCard";

const Board = () => {
  const socket = useSocket("/sprint");

  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { loading } = useSelector((state: RootState) => state.sprintReducer);

  const { _id } = workspace;

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket !== null) {
      socket.emit("join-sprint", _id);

      socket.emit("current-sprint", _id);

      socket.on("send-current-sprint", (currentSprint: ISprint) => {
        dispatch(sendCurrentSprint(currentSprint));
      });

      // socket.on("added-task", (tasks) => {
      //   toast.dismiss(toastId);
      //   setTaskModal(false);
      //   toast.success("Task Added Successfully!");
      //   dispatch(addTask(tasks));
      // });
    }
  }, [socket, _id, dispatch]);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <section className="board-section">
          <BoardHeader />
          <BoardMembers />
          <div className="status-board-container">
            <StatusBoards statusName="To Do">
              <TaskCard />
            </StatusBoards>
            <StatusBoards statusName="In Progress"></StatusBoards>
            <StatusBoards statusName="Done"> </StatusBoards>
          </div>
        </section>
      )}
    </>
  );
};

export default Board;
