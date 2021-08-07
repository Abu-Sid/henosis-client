import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import WorkspaceError from "../../../components/Workspace/WorkspaceError";
import withAuthCheck from "../../../HOC/withAuthCheck";
import {
  workspaceFailure,
  workspaceSuccess,
} from "../../../redux/actions/workspaceActions";
import { IWorkspace } from "../../../redux/actions/workspaceActions/actionInterface";
import { RootState } from "../../../redux/reducers";

const Workspace = () => {
  const { query, replace } = useRouter();

  const { workspace, loading, error } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const dispatch = useDispatch();

  const [creatorEmail, setCreatorEmail] = useState("");

  const [requestName, setRequestName] = useState("");

  const [socket, setSocket] = useState(
    null as Socket<DefaultEventsMap, DefaultEventsMap>
  );

  useEffect(() => {
    const socketIo = io("https://intense-peak-24388.herokuapp.com/workspace");
    setSocket(socketIo);

    socketIo.emit("workspace", { id: query.id, userEmail: email });
    socketIo.on(
      "workspace-error",
      (message: string, creatorsEmail: string, workspaceName: string) => {
        dispatch(workspaceFailure(message));
        if (creatorsEmail) {
          setCreatorEmail(creatorsEmail);
          setRequestName(workspaceName);
        }
      }
    );
    socketIo.on("workspace-receive", (workspace: IWorkspace) => {
      if (workspace) {
        if (workspace._id) {
          dispatch(workspaceSuccess(workspace));
          setCreatorEmail("");
        } else {
          replace("/workspaces");
        }
      }
    });

    socketIo.on("mail-sended", (message: string) => {
      console.log(message);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [query, replace, dispatch, email]);

  const { workspaceName, companyName } = workspace;

  return (
    <div className="workspace">
      {loading ? (
        <h1>Loading..</h1>
      ) : error ? (
        <WorkspaceError
          creatorEmail={creatorEmail}
          requestName={requestName}
          socket={socket}
        />
      ) : (
        <>
          <h1>
            Welcome to your workspace --{workspaceName}{" "}
            {companyName && "--" + companyName}
          </h1>
          <img
            src="https://cdn.dribbble.com/users/5246919/screenshots/11915912/media/f7b14b34de780768f18b37cce2431b0b.gif"
            alt=""
          />
        </>
      )}
    </div>
  );
};

export default withAuthCheck(Workspace);
