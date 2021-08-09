import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

const Board = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { workspaceName } = workspace;

  return (
    <section className='board-section'>
      <div className='board-section__indicator'>
        <p>
          <span> Board </span> /{workspaceName}
        </p>
      </div>
      <div className='board-section__header'>
        <div className='board-section__objective'>
          <h1>
            <span>{workspaceName}</span> / Sprint 1 objective
          </h1>
          <ul>
            <li>Getting started with project.</li>
            <li>Setting up initials.</li>
            <li>Designing the homepage.</li>
          </ul>
        </div>
        <div className='board-section__actions'>
          <p>Starts from 18 Jul, Ends in 25 Jul</p>
          <button className='button-primary'>End Scrum</button>
          <button>...</button>
        </div>
      </div>
    </section>
  );
};

export default Board;
