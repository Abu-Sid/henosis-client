import React from "react";
import SideBar from "../../components/Dashboard/SideBar";

const workspaces = () => {
  return (
    <div className="d-container">
      <div className="d-row">
        <div className="col-left">
          <SideBar />
        </div>
        <div className="col-right">
          <h1>Workspaces</h1>
        </div>
      </div>
    </div>
  );
};

export default workspaces;
