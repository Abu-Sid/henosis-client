import React from "react";

const UsersRow = (props) => {
  const { name, email, role = "User" } = props.info;
  const index = props.index;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
    </tr>
  );
};

export default UsersRow;
