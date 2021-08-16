import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import NotFound from "../../pages/404";
import AcceptRequest from "./WorkspacePages/AcceptRequest";
import Backlog from "./WorkspacePages/Backlog/Backlog";
import Board from "./WorkspacePages/Board/Board";
import Chat from "./WorkspacePages/Chat/Chat";
import Notification from "./WorkspacePages/Notification";
import PersonalDashboard from "./WorkspacePages/PersonalDashboard";
import Settings from "./WorkspacePages/Settings";

interface IProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const WorkspaceRoute = ({ socket }: IProps) => {
  const [id, path] = useRouter().query.paths;

  useEffect(() => {
    if (socket !== null) {
      socket.emit("join-workspace", id);
    }
  }, [socket, id]);

  switch (path) {
    case undefined:
      return <PersonalDashboard />;
    case "board":
      return <Board workspaceSocket={socket} />;
    case "backlog":
      return <Backlog />;
    case "chat":
      return <Chat />;
    case "notifications":
      return <Notification />;
    case "settings":
      return <Settings />;
    case "acceptRequest":
      return <AcceptRequest socket={socket} />;
    default:
      return <NotFound />;
  }
};

export default WorkspaceRoute;
