import React from "react";
import { useSelector } from "react-redux";
import orange from "../../../../public/images/icons/orange.svg";
import purple from "../../../../public/images/icons/purple.svg";
import { RootState } from "../../../../redux/reducers";
import PlusIcon from "./PlusIcon";

const BoardMembers = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { members } = workspace;

  return (
    <div className="board-section__members-container">
      <p>Members ({members.length})</p>
      <div className="board-section__members">
        <PlusIcon />
        {members.map(({ _id, photo }, index) => (
          <div key={_id}>
            <img
              src={photo || index + (1 % 2) === 0 ? orange.src : purple.src}
              alt="user-icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardMembers;
