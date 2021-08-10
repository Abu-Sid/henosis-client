import React from "react";
import BoardHeader from "./BoardHeader";
import BoardMembers from "./BoardMembers";
import StatusBoards from "./StatusBoards";
import TaskCard from "./TaskCard";

const Board = () => {
  return (
    <section className='board-section'>
      <BoardHeader />
      <BoardMembers />
      <div className='status-board-container'>
        <StatusBoards statusName='To Do'>
          <TaskCard />
        </StatusBoards>
        <StatusBoards statusName='In Progress'></StatusBoards>
        <StatusBoards statusName='Done'> </StatusBoards>
      </div>
    </section>
  );
};

export default Board;
