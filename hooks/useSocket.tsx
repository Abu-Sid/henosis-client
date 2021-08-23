import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

const useSocket = (
  path: string,
  origin = "https://henosis-server.herokuapp.com"
) => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  useEffect(() => {
    const socketIo = io(`${origin}${path}`);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [path, origin]);

  return socket;
};

export default useSocket;
