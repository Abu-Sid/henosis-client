import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SelectCategory from "../components/NewWorkspace/SelectCategory";
import WorkspaceForm from "../components/NewWorkspace/WorkspaceForm";
import withAuthCheck from "../HOC/withAuthCheck";
import useSocket from "../hooks/useSocket";
import { RootState } from "../redux/reducers";
import { IWorkspaceData } from "./information";
import { motion } from "framer-motion";
import { exit } from "../components/ui/Animation/Animation";

let loadingId: string;

const Workspace = () => {
  const [select, setSelect] = useState("");

  const { user } = useSelector((state: RootState) => state.userReducer);

  const router = useRouter();

  const socket = useSocket("/create-workspace");

  const socket2 = useSocket("/chat", "https://henosis-server-bd.herokuapp.com");

  useEffect(() => {
    if (socket !== null) {
      socket.on("workspace-created", (id) => {
        socket2.emit(
          "create-channel",
          {
            chatName: "general",
            workspaceId: id,
            users: [],
          },
          () => {
            toast.dismiss(loadingId);
            toast.success("Workspace Created Successfully!");
            router.replace(`/workspaces/${id}`);
          }
        );
      });
    }
  }, [socket, router, socket2]);

  const submit = (data: IWorkspaceData) => {
    if (socket !== null) {
      const workspace = {
        ...data,
        type: "Personal",
        members: [{ ...user, isCreator: true }],
        previousMails: [] as string[],
      };
      socket.emit("create-workspace", workspace);
      loadingId = toast.loading("Loading...");
    }
  };

  const handleCategory = (category: string) => setSelect(category);

  return (
    <motion.section exit={exit} className='new-workspace'>
      {select === "personal" && <WorkspaceForm submit={submit} />}
      {select === "" && <SelectCategory handleCategory={handleCategory} />}
    </motion.section>
  );
};

export default withAuthCheck(Workspace);
