import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import deleteImg from "../../public/images/warning.gif";
import Image from "next/image";

interface IProps {
  info: { _id: Number; name: String; email: String; role: String };
  index: number;
}

interface IDelete {
  handleDelete: (id: Number) => void;
}

const AdminRow = (props: IProps & IDelete) => {
  const { _id, name, email, role } = props.info;
  const index = props.index;
  const handleDelete = props.handleDelete;

  // modal
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td>
        <MdDeleteForever className="delete-icon" onClick={onOpenModal} title="Remove Admin" />
        <Modal open={open} onClose={onCloseModal} center>
          <div className="admin-info delete-confirm">
            <Image src={deleteImg} alt="" />
            <div className="text">
              <h2>Are you sure?</h2>
              <p>This action cannot be undone</p>
            </div>
            <div id="button-group">
              <button className="cancel-button" onClick={onCloseModal}>
                Cancel
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default AdminRow;
