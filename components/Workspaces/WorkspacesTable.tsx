import React from "react";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import WorkspaceRow from "./WorkspaceRow";

interface IProps {
  workspaces: IWorkspace[];
}

const WorkspacesTable = ({ workspaces }: IProps) => {
  return (
    <div className='table'>
      <div className='table__header'>
        <div className='number'>No.</div>
        <div className='name'>Name</div>
        <div className='type'>Type</div>
        <div className='owner-name'>Owner</div>
      </div>
      <div className='table__row'>
        {workspaces.map((workspace, index) => (
          <WorkspaceRow
            key={workspace._id}
            workspace={workspace}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkspacesTable;
