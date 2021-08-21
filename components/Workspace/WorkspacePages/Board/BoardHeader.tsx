import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/reducers";

const BoardHeader = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { sprintName, goals, startDate, endDate } = useSelector(
    (state: RootState) => state.sprintReducer.sprint
  );

  const { workspaceName } = workspace;

  return (
    <div>
      <div className="board-section__indicator">
        <p>
          <span> Board </span> / {workspaceName}
        </p>
      </div>
      <div className="board-section__header">
        <div className="board-section__objective">
          <h1>
            <span>{workspaceName}</span> / {sprintName}
          </h1>
          <ul>
            {goals.map((goal, index) => (
              <li key={index}>
                {index + 1}. {goal}
              </li>
            ))}
          </ul>
        </div>
        <div className="board-section__actions">
          <p>
            {new Date(startDate).toDateString()} -{" "}
            {new Date(endDate).toDateString()}
          </p>
          <div>
            <button className="button-primary">End Sprint</button>
            <button className="button-secondary">
              <FontAwesomeIcon icon={faEllipsisH as IconProp} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
