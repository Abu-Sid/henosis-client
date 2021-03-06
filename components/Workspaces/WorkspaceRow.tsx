import Link from "next/link";
import React from "react";
import profileIcon from "../../public/images/user-profile-icon-png.png";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import { motion } from "framer-motion";

interface IProps {
  workspace: IWorkspace;
  index: number;
}

const WorkspaceRow = ({ workspace, index }: IProps) => {
  const { workspaceName, members, type } = workspace;

  const { photo, name } = members.find((member) => member.isCreator);

  return (
    <div>
      <Link passHref href={`/workspaces/${workspace._id}/dashboard`}>
        <div className='row-container'>
          <div className='number'>{index + 1}</div>
          <div className='name'>{workspaceName}</div>
          <div className='type'>{type}</div>
          <div className='owner owner-name'>
            <img
              className='owner-image'
              src={photo || profileIcon.src}
              alt=''
            />
            {name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WorkspaceRow;
