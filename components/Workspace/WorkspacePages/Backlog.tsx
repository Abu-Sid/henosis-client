import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import BacklogSprint from "../BacklogComponents/BacklogSprint";
import CreateSprint from "../BacklogComponents/CreateSprint";

const Backlog = () => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { workspaceName, _id } = workspace;
  console.log(_id);
  return (
    <section className="backlog-section">
      <h2>
        Backlog
        <span> / {workspaceName}</span>
      </h2>
      <BacklogSprint />
      <CreateSprint />
    </section>
  );
};

export default Backlog;
