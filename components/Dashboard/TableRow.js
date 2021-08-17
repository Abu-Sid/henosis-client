import React from "react";
import { MdDeleteForever } from "react-icons/md";

const TableRow = (props) => {
  const { _id, name, email, role } = props.info;
  const index = props.index;
  const handleDelete = (id) => {
    fetch(`https://intense-peak-24388.herokuapp.com/admin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert(
            "This admin information was successfully deleted from database"
          );
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <MdDeleteForever
          className="delete-icon"
          onClick={() => handleDelete(_id)}
        />
      </td>
    </tr>
  );
};

export default TableRow;
