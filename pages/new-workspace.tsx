import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import SelectCategory from "../components/NewWorkspace/SelectCategory";
import WorkspaceForm from "../components/NewWorkspace/WorkspaceForm";
import withAuthCheck from "../HOC/withAuthCheck";
import { RootState } from "../redux/reducers";

interface IData {
  workspaceName: string;
  memberEmail: string;
}

const Workspace = () => {
  const [select, setSelect] = useState("");

  const { user } = useSelector((state: RootState) => state.userReducer);

  const router = useRouter();

  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  useEffect(() => {
    const socketIo = io(
      "https://henosis-server.herokuapp.com/create-workspace"
    );
    setSocket(socketIo);

    socketIo.on("workspace-created", (id) => {
      router.replace(`/workspaces/${id}`);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [router]);

  const submit = (data: IData) => {
    if (socket) {
      const workspace = {
        ...data,
        type: "Personal",
        members: [{ ...user, isCreator: true }],
      };
      socket.emit("create-workspace", workspace);
    }
  };

  const handleCategory = (category: string) => setSelect(category);

  return (
    <section className="new-workspace">
      {select === "personal" && <WorkspaceForm submit={submit} />}
      {select === "" && <SelectCategory handleCategory={handleCategory} />}
    </section>
  );
};

export default withAuthCheck(Workspace);
