import React from "react";
import { useSelector } from "react-redux";
import { RequestData } from "../../pages/workspaces/[...paths]";
import { RootState } from "../../redux/reducers";

interface IProps {
  requestData: RequestData;
  handleSendEmail: (requestData: RequestData) => void;
}

const WorkspaceError = ({ requestData, handleSendEmail }: IProps) => {
  const { error } = useSelector((state: RootState) => state.workspaceReducer);

  const { creatorEmail } = requestData;

  return (
    <div className="workspace-error">
      <h1>{error}</h1>
      {creatorEmail && (
        <>
          <h2>If you are a member of this team, Please request for access</h2>
          <button onClick={() => handleSendEmail(requestData)}>
            Request For Access
          </button>
        </>
      )}
    </div>
  );
};

export default WorkspaceError;
