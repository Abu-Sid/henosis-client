import React from "react";
interface IProps {
  info: { workspaceName: String; type: String; members: Number[] };
  index: number;
}

const WorkspaceRow = (props: IProps) => {
  const { workspaceName, type, members } = props.info;
  const index = props.index;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{workspaceName}</td>
      <td>{type}</td>
      <td>{members.length}</td>
    </tr>
  );
};

export default WorkspaceRow;
