import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectCategory from "../components/NewWorkspace/SelectCategory";
import WorkspaceForm from "../components/NewWorkspace/WorkspaceForm";
import withAuthCheck from "../HOC/withAuthCheck";
import useSocket from "../hooks/useSocket";
import { RootState } from "../redux/reducers";

interface IData {
  workspaceName: string;
  memberEmail: string;
}

const Workspace = () => {
  const [select, setSelect] = useState("");

  const { user } = useSelector((state: RootState) => state.userReducer);

  const router = useRouter();

  const socket = useSocket("/create-workspace");

  useEffect(() => {
    if (socket !== null) {
      socket.on("workspace-created", (id) => {
        router.replace(`/workspaces/${id}`);
      });
    }
  }, [socket, router]);

  const submit = (data: IData) => {
    if (socket !== null) {
      const workspace = {
        ...data,
        type: "Personal",
        members: [{ ...user, isCreator: true }],
        previousMails: [] as string[],
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
