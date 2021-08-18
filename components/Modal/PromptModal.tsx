import React from "react";
import Modal from "./Modal";

interface IProps {
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFunction?: (params: string) => void;
  params?: any[];
  tittle?: string;
  isCancelBtn?: boolean;
  text?: string;
  btnText?: string;
  icon?: StaticImageData;
  iconHeight?: string;
  isOk?: boolean;
}

const PromptModal = ({
  modalIsOpen,
  setIsOpen,
  handleFunction,
  params,
  tittle,
  isCancelBtn,
  text,
  btnText,
  icon,
  iconHeight,
  isOk,
}: IProps) => {
  const handleClick = () => {
    handleFunction.apply(null, params);
    setIsOpen(false);
  };

  const styles = {
    animation: "modalAnimation2 0.3s ease-in-out",
  };

  return (
    <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} styles={styles}>
      <div style={{ textAlign: "center" }}>
        {icon && (
          <img
            src={icon.src}
            height={iconHeight || "190px"}
            width="250px"
            style={{ borderRadius: "10px" }}
            alt=""
          />
        )}
        <h1 style={{ margin: "15px 0", color: "#4a4fff" }}>
          {tittle || "Hello World!"}
        </h1>
        {text && <p style={{ marginBottom: "15px" }}>{text}</p>}
        {btnText && (
          <button
            style={{ display: "inline" }}
            className="close-btn"
            onClick={handleClick}
          >
            {btnText}
          </button>
        )}
        {(isCancelBtn || isOk) && (
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => setIsOpen(false)}
            className="button-primary"
          >
            {isOk ? "Ok" : "Cancel"}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default PromptModal;
