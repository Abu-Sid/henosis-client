import Link from "next/link";
import React from "react";
import profileIcon from "../../public/images/user-profile-icon-png.png";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";

interface IProps {
  workspace: IWorkspace;
  index: number;
}

const WorkspaceRow = ({ workspace, index }: IProps) => {
  const { workspaceName, members, type } = workspace;

  const { photo, name } = members.find((member) => member.isCreator);

  return (
    <Link passHref href={`/workspaces/${workspace._id}`}>
      <tr>
        <td>{index + 1}</td>
        <td>{workspaceName}</td>
        <td>{type}</td>
        <td className="owner">
          <img className="owner-image" src={photo || profileIcon.src} alt="" />
          {name}
        </td>
      </tr>
    </Link>
  );
};

export default WorkspaceRow;
