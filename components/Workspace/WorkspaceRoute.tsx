import { useRouter } from "next/router";
import React from "react";
import NotFound from "../../pages/404";
import Backlog from "./WorkspacePages/Backlog";
import Board from "./WorkspacePages/Board";

const WorkspaceRoute = () => {
  const [, path] = useRouter().query.paths;

  switch (path) {
    case undefined:
      return <h1>Home</h1>;
    case "board":
      return <Board />;
    case "backlog":
      return <Backlog />;
    default:
      return <NotFound />;
  }
};

export default WorkspaceRoute;
