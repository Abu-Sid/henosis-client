import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../auth/authManager";
import LoadingAnimation from "../../components/ui/Animation/LoadingAnimation";
import PhoneSidebar from "../../components/ui/Sidebar/PhoneSidebar";
import Sidebar from "../../components/ui/Sidebar/Sidebar";
import WorkspaceError from "../../components/Workspace/WorkspaceError";
import WorkspaceRoute from "../../components/Workspace/WorkspaceRoute";
import withAuthCheck from "../../HOC/withAuthCheck";
import useSocket from "../../hooks/useSocket";
import { setEmptySprint } from "../../redux/actions/sprintActions";
import {
  addMembers,
  workspaceFailure,
  workspaceSuccess,
} from "../../redux/actions/workspaceActions";
import { IWorkspace } from "../../redux/actions/workspaceActions/actionInterface";
import { RootState } from "../../redux/reducers";

export interface RequestData {
  creatorEmail: string;
  workspaceName: string;
  id: string;
}

let toastId: string;

const Workspace = () => {
  const { query, replace } = useRouter();

  const [id] = query.paths || [];

  const { error } = useSelector((state: RootState) => state.workspaceReducer);

  const { email, name } = useSelector(
    (state: RootState) => state.userReducer.user
  );

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [screenSize, setScreenSize] = useState(null);

  const [requestData, setRequestData] = useState({} as RequestData);

  const [loaded, setLoaded] = useState(false);

  const socket = useSocket("/workspace");

  useEffect(() => {
    dispatch(setEmptySprint());
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("added-member", (updatedMembers: IUser[]) => {
        toast.success("Member Added Successfully!");
        if (updatedMembers) {
          dispatch(addMembers(updatedMembers));
        }
      });
    }
  }, [socket, dispatch]);

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
            setRequestData({ creatorEmail, workspaceName, id });
          }
        }
      );
      socket.on("workspace-receive", (workspace: IWorkspace) => {
        dispatch(workspaceSuccess(workspace));
        setLoading(false);
        setRequestData({} as RequestData);
      });
    }
  }, [replace, dispatch, email, id, loaded, socket]);

  useEffect(() => {
    if (socket !== null) {
      socket.on(
        "mail-sended",
        ({
          message,
          isSended,
          isRedirect,
        }: {
          message: string;
          isSended: boolean;
          isRedirect: boolean;
        }) => {
          toast.dismiss(toastId);
          if (isSended) {
            toast.success(message);
          } else {
            toast.error(message);
          }
          if (isRedirect) {
            replace("/");
          }
        }
      );
    }
  }, [socket, replace]);

  useEffect(() => {
    const currentScreenSize = window.innerWidth;
    setScreenSize(currentScreenSize);
  }, []);
  console.log(screenSize);
  const handleSendEmail = ({
    creatorEmail,
    workspaceName,
    id,
  }: RequestData) => {
    const origin = window.location.origin;
    socket.emit("send-access-email", {
      email,
      name,
      toEmail: creatorEmail,
      workspaceName,
      id,
      origin,
    });
    toastId = toast.loading("Loading...");
  };

  return (
    <>
      {loading ? (
        <LoadingAnimation />
      ) : error ? (
        <WorkspaceError
          requestData={requestData}
          handleSendEmail={handleSendEmail}
        />
      ) : (
        <section className='workspace'>
          {screenSize > 600 ? <Sidebar /> : <PhoneSidebar />}
          <WorkspaceRoute socket={socket} />
        </section>
      )}
    </>
  );
};

export default withAuthCheck(Workspace);
