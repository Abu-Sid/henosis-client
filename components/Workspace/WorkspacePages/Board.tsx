import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";

const Board = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { workspaceName } = workspace;

  return (
    <div>
      <h3>Board/{workspaceName}</h3>
      <h1>
        {workspaceName}/ <span></span>
      </h1>
    </div>
  );
};

export default Board;
