import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import WorkspaceError from "../../components/Workspace/WorkspaceError";
import WorkspaceRoute from "../../components/Workspace/WorkspaceRoute";
import withAuthCheck from "../../HOC/withAuthCheck";
import {
  workspaceFailure,
  workspaceSuccess,
} from "../../redux/actions/workspaceActions";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import { RootState } from "../../redux/reducers";

export interface RequestData {
  creatorEmail: string;
  workspaceName: string;
}

const Workspace = () => {
  const { query, replace } = useRouter();

  const [id] = query.paths;

  const { error } = useSelector((state: RootState) => state.workspaceReducer);

  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [requestData, setRequestData] = useState({} as RequestData);

  const [loaded, setLoaded] = useState(false);

  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  useEffect(() => {
    const socketIo = io("https://intense-peak-24388.herokuapp.com/workspace");
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket !== null) {
      if (!loaded) {
        socket.emit("workspace", { id, userEmail: email });
        setLoaded(true);
      }

      socket.on(
        "workspace-error",
        (message: string, creatorEmail: string, workspaceName: string) => {
          dispatch(workspaceFailure(message));
          setLoading(false);
          if (creatorEmail) {
            setRequestData({ creatorEmail, workspaceName });
          }
        }
      );
      socket.on("workspace-receive", (workspace: IWorkspace) => {
        dispatch(workspaceSuccess(workspace));
        setLoading(false);
        setRequestData({} as RequestData);
      });

      socket.on("mail-sended", (message: string) => {
        console.log(message);
      });
    }
  }, [replace, dispatch, email, id, loaded, socket]);

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : error ? (
        <WorkspaceError requestData={requestData} socket={socket} />
      ) : (
        <section className='workspace'>
          <Sidebar />
          <WorkspaceRoute />
        </section>
      )}
    </>
  );
};

export default withAuthCheck(Workspace);
