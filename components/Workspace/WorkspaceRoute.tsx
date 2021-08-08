import { useRouter } from "next/router";
import React from "react";
import Board from "./WorkspacePages/Board";

const WorkspaceRoute = () => {
  const [, pathName] = useRouter().query.paths;

  switch (pathName) {
    case undefined:
      return <h1>Home</h1>;
    case "board":
      return <Board />;
    case "backlog":
      return <h1>Backlog</h1>;
    default:
      return <h1>Not Found</h1>;
  }
};

export default WorkspaceRoute;
