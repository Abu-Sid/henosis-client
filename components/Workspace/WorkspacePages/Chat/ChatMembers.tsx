import React, { useContext } from "react";
import { useSelector } from "react-redux";
import Purple from "../../../../public/images/icons/purple.svg";
import { RootState } from "../../../../redux/reducers";
import { chatContext } from "./ChatContainer";

const ChatMembers = () => {
  const { showActive, actives } = useContext(chatContext);

  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const offline = members.filter(
    (member) =>
      !actives.map((activeMember) => activeMember.userId).includes(member._id)
  );

  return (
    <div className={showActive ? "members active" : "members"}>
      <div className="members__online">
        <h3>Online ({actives.length})</h3>
        {actives.map((active) => {
          const { id, userId } = active;
          const activeUser = members.find((member) => member._id === userId);
          const { photo, name } = activeUser;
          return (
            <div key={id} className="chat-member">
              <img src={photo || Purple.src} alt="profile picture" />
              <p>{name}</p>
            </div>
          );
        })}
      </div>
      <div className="members__offline">
        <h3>Offline ({offline.length})</h3>
        {offline.map((member) => (
          <div key={member._id} className="chat-member">
            <img src={member.photo || Purple.src} alt="profile picture" />
            <p>{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMembers;
