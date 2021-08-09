import React, { useState } from "react";
import ReactModal from "../../ReactModal/ReactModal";

const CreateSprint = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Create Sprint</button>
      <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <h1>Open Modal</h1>
      </ReactModal>
    </div>
  );
};

export default CreateSprint;
