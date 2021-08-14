import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import orange from "../../../../public/images/icons/orange.svg";
import purple from "../../../../public/images/icons/purple.svg";
import { ITask } from "../../../../redux/actions/sprintActions/actionInterface";
import { RootState } from "../../../../redux/reducers";

interface IProps {
  task: ITask;
}

const TaskCard = (
  { task, ...rest }: IProps,
  ref: React.MutableRefObject<undefined>
) => {
  const { taskName, dueDate, assignedMember } = task;

  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const assignedMembers = members.filter((member) =>
    assignedMember.includes(member.email)
  );

  return (
    <div className="task-card" ref={ref} {...rest}>
      <div className="task-card__info">
        <h1>{taskName}</h1>
        <p>{new Date(dueDate).toDateString()}</p>
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
  );
};

export default forwardRef(TaskCard);
