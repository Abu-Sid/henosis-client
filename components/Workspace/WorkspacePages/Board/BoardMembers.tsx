import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useForm from "../../../../hooks/useForm";
import orange from "../../../../public/images/icons/orange.svg";
import purple from "../../../../public/images/icons/purple.svg";
import { RootState } from "../../../../redux/reducers";
import Modal from "../../../Modal/Modal";
import PlusIcon from "./PlusIcon";

interface IProps {
  submit: (data: any) => void;
}

const BoardMembers = ({ submit }: IProps) => {
  const { workspace } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { members } = workspace;

  const [modalIsOpen, setIsOpen] = useState(false);

  const [memberInputs, setMemberInputs] = useState([1]);

  const { handleInput, handleInvalid, handleSubmit, error } = useForm();

  const lastInput = memberInputs[memberInputs.length - 1];

  return (
    <div className="board-section__members-container">
      <p>Members ({members.length})</p>
      <div className="board-section__members">
        <PlusIcon onClick={() => setIsOpen(true)} />
        {members.map(({ _id, photo }, index) => (
          <div key={_id}>
            <img
              src={photo || index + (1 % 2) === 0 ? orange.src : purple.src}
              alt="user-icon"
            />
          </div>
        ))}
      </div>
      <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <form onSubmit={handleSubmit(submit)} className="create-sprint-form">
          <h2>Add Member</h2>
          {memberInputs.map((memberInput) => (
            <div key={memberInput}>
              <div className="goal">
                <input
                  type="email"
                  name={`email${memberInput}`}
                  onChange={handleInput}
                  required
                  onInvalid={handleInvalid}
                  placeholder={"Email " + memberInput}
                />
                {memberInput === lastInput && (
                  <label
                    onClick={() =>
                      setMemberInputs((preMemberInputs) => [
                        ...preMemberInputs,
                        preMemberInputs[preMemberInputs.length - 1] + 1,
                      ])
                    }
                    className="add-btn"
                  >
                    <FontAwesomeIcon
                      style={{ fontSize: "22px" }}
                      icon={faPlus as IconProp}
                    />
                  </label>
                )}
              </div>
              {error[`email${memberInput}`] && (
                <p className="alert-error">
                  {"Email " + memberInput} is required
                </p>
              )}
            </div>
          ))}
          <button type="submit">Add Member</button>
        </form>
      </Modal>
    </div>
  );
};

export default BoardMembers;
