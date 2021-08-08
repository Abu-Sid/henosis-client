import React from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { RequestData } from "../../pages/workspaces/[...paths]";
import { RootState } from "../../redux/reducers";

interface IProps {
  requestData: RequestData;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const WorkspaceError = ({ requestData, socket }: IProps) => {
  const { error } = useSelector((state: RootState) => state.workspaceReducer);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { creatorEmail, workspaceName } = requestData;

  const handleSendEmail = (email: string, workspaceName: string) => {
    socket.emit("send-access-email", user, email, workspaceName);
  };

  return (
    <div className="workspace-error">
      <h1>{error}</h1>
      {creatorEmail && (
        <>
          <h2>If you are a member of this team, Please request for access</h2>
          <button onClick={() => handleSendEmail(creatorEmail, workspaceName)}>
            Request For Access
          </button>
        </>
      )}
    </div>
  );
};

export default WorkspaceError;
