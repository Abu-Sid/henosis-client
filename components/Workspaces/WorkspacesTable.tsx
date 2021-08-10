import React from "react";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import WorkspaceRow from "./WorkspaceRow";

interface IProps {
  workspaces: IWorkspace[];
}

const WorkspacesTable = ({ workspaces }: IProps) => {
  return (
    <table className="workspace__table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Type</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {workspaces.map((workspace, index) => (
          <WorkspaceRow
            key={workspace._id}
            workspace={workspace}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
};

export default WorkspacesTable;
