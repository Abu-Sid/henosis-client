import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

const useSocket = (path: string) => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

  useEffect(() => {
    const socketIo = io(`https://henosis-server.herokuapp.com${path}`);
    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [path]);

  return socket;
};

export default useSocket;
