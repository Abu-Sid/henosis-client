import React from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { RootState } from "../../redux/reducers";

interface IProps {
  creatorEmail: string;
  requestName: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const WorkspaceError = ({ creatorEmail, requestName, socket }: IProps) => {
  const { error } = useSelector((state: RootState) => state.workspaceReducer);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const handleSendEmail = (email: string, requestName: string) => {
    socket.emit("send-access-email", user, email, requestName);
  };

  return (
    <div className="workspace-error">
      <h1>{error}</h1>
      {creatorEmail && (
        <>
          <h2>If you are a member of this team, Please request for access</h2>
          <button onClick={() => handleSendEmail(creatorEmail, requestName)}>
            Request For Access
          </button>
        </>
      )}
    </div>
  );
};

export default WorkspaceError;
