import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import withAuthCheck from "../../../HOC/withAuthCheck";
import { workspaceSuccess } from "../../../redux/actions/workspaceActions";
import { IWorkspace } from "../../../redux/actions/workspaceActions/actionInterface";
import { RootState } from "../../../redux/reducers";

const Workspace = () => {
  const { query, replace } = useRouter();

  const { workspace, loading } = useSelector(
    (state: RootState) => state.workspaceReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const socketIo = io("https://henosis-server.herokuapp.com/workspace");

    socketIo.emit("workspace", query.id);

    socketIo.on("workspace-receive", (workspace: IWorkspace) => {
      if (workspace) {
        if (workspace._id) {
          dispatch(workspaceSuccess(workspace));
        } else {
          replace("/workspaces");
        }
      }
    });

    return () => {
      socketIo.disconnect();
    };
  }, [query, replace, dispatch]);

  const { workspaceName } = workspace;
  console.log(workspace);

  return (
    <div className="workspace">
      {loading ? <h1>Loading..</h1> : <h1>{workspaceName}</h1>}
    </div>
  );
};

export default withAuthCheck(Workspace);
