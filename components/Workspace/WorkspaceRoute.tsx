import { useRouter } from "next/router";
import React from "react";

const WorkspaceRoute = () => {
  const [, pathName] = useRouter().query.paths;

  switch (pathName) {
    case undefined:
      return <h1>RootPath</h1>;
    case "board":
      return <h1>Board</h1>;
    case "backLock":
      return <h1>BackLock</h1>;
    default:
      return <h1>Not Found</h1>;
  }
};

export default WorkspaceRoute;
