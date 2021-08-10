import React from "react";
import BoardHeader from "./BoardHeader";
import BoardMembers from "./BoardMembers";
import StatusBoards from "./StatusBoards";

const Board = () => {
  return (
    <section className='board-section'>
      <BoardHeader />
      <BoardMembers />
      <div className='status-board-container'>
        <StatusBoards statusName='To Do' />
        <StatusBoards statusName='In Progress' />
        <StatusBoards statusName='Done' />
      </div>
    </section>
  );
};

export default Board;
