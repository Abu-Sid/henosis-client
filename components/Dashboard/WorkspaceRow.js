import React from "react";

const WorkspaceRow = (props) => {
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
