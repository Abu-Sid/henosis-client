import React, { forwardRef, useState } from "react";
import { HiOutlineMinus } from "react-icons/hi";
import { useSelector } from "react-redux";
import orange from "../../../../public/images/icons/orange.svg";
import purple from "../../../../public/images/icons/purple.svg";
import warningIcon from "../../../../public/images/warning.gif";
import { ITask } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";
import PromptModal from "../../../Modal/PromptModal";

interface IProps {
  task: ITask;
  handleDelete: (_id: string) => void;
}

const TaskCard = (
  { task, handleDelete, ...rest }: IProps,
  ref: React.MutableRefObject<undefined>
) => {
  const { taskName, dueDate, assignedMember, _id } = task;

  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const assignedMembers = members.filter((member) =>
    assignedMember.includes(member.email)
  );

  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <div className="task-card" ref={ref} {...rest}>
        <div className="task-card__info">
          <div>
            <h1>{taskName}</h1>
            <p>{new Date(dueDate).toDateString()}</p>
          </div>
          <button onClick={() => setDeleteModal(true)}>
            <HiOutlineMinus />
          </button>
        </div>
        <div className="task-card__members">
          {assignedMembers.map(({ _id, photo }, index) => (
            <div className="member-icon" key={_id}>
              <img
                src={photo || (index % 2 === 0 ? orange.src : purple.src)}
                alt="user-icon"
                className="user-icon"
              />
            </div>
          ))}
        </div>
      </div>
      <PromptModal
        params={[_id]}
        modalIsOpen={deleteModal}
        setIsOpen={setDeleteModal}
        handleFunction={handleDelete}
        tittle="Are You Sure?"
        isCancelBtn
        text="If Delete You Will Not Recover The Task!"
        btnText="Delete"
        icon={warningIcon}
      />
    </>
  );
};

export default forwardRef(TaskCard);
