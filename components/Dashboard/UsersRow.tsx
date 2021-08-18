import React from "react";

interface IProps {
  info: { name: String; email: String; role: String };
  index: number;
}
const UsersRow = (props: IProps) => {
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
