import Link from "next/link";
import React from "react";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import WorkspaceRow from "./WorkspaceRow";

interface IProps {
  workspaces: IWorkspace[];
}

const WorkspacesTable = ({ workspaces }: IProps) => {
  return (
    <div>
      <div className="workspaces-header">
        <h1>Workspaces</h1>
        <Link href="/new-workspace" passHref>
          <button className="button-primary">Create new project</button>
        </Link>
      </div>

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
    </div>
  );
};

export default WorkspacesTable;
