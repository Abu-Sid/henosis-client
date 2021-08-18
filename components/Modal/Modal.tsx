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
    boxShadow: "3px 3px 20px #3b3b3b",
    width: "97%",
    maxWidth: "500px",
    backgroundColor: "#f0f1f5",
    borderRadius: "8px",
    animation: "modalAnimation 0.3s ease-in-out",
  },
};

ReactModal.setAppElement("#__next");

interface IProps {
  children: ReactElement<any, any>;
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  styles?: object;
}

const Modal = ({ children, modalIsOpen, setIsOpen, styles }: IProps) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={
        styles
          ? { content: { ...customStyles.content, ...styles } }
          : customStyles
      }
      contentLabel="Example Modal"
    >
      {!styles && (
        <button className="close-btn" onClick={closeModal}>
          <FontAwesomeIcon
            style={{ fontSize: "25px" }}
            icon={faTimes as IconProp}
          />
        </button>
      )}
      {children}
    </ReactModal>
  );
};

export default Modal;
