import { useRouter } from "next/router";
import React from "react";
import NotFound from "../../pages/404";
import Backlog from "./WorkspacePages/Backlog/Backlog";
import Board from "./WorkspacePages/Board/Board";
import Chat from "./WorkspacePages/Chat";
import Notification from "./WorkspacePages/Notification";
import PersonalDashboard from "./WorkspacePages/PersonalDashboard";
import Settings from "./WorkspacePages/Settings";

const WorkspaceRoute = () => {
  const [, path] = useRouter().query.paths;

  switch (path) {
    case undefined:
      return <PersonalDashboard />;
    case "board":
      return <Board />;
    case "backlog":
      return <Backlog />;
    case "chat":
      return <Chat />;
    case "notifications":
      return <Notification />;
    case "settings":
      return <Settings />;
    default:
      return <NotFound />;
  }
};

export default WorkspaceRoute;
