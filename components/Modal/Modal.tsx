import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "3px 3px 20px #adadad",
    width: "97%",
    maxWidth: "500px",
    backgroundColor: "#f0f1f5",
    borderRadius: "8px",
  },
};

ReactModal.setAppElement("#__next");

interface IProps {
  children: ReactElement<any, any>;
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, modalIsOpen, setIsOpen }: IProps) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button className="close-btn" onClick={closeModal}>
        <FontAwesomeIcon
          style={{ fontSize: "25px" }}
          icon={faTimes as IconProp}
        />
      </button>
      {children}
    </ReactModal>
  );
};

export default Modal;
