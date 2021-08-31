import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import useSocket from "../../../../hooks/useSocket";
import { RootState } from "../../../../redux/reducers";

export interface IChannel {
  _id?: string;
  chatName: string;
  workspaceId: string;
  users: string[];
}

interface IActive {
  id?: string;
  userId: string;
  workspaceId: string;
}

interface IProps {
  children: React.ReactNode;
}

interface IContext {
  channels: IChannel[];
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  showChannel: boolean;
  setShowChannel: React.Dispatch<React.SetStateAction<boolean>>;
  showActive: boolean;
  setShowActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddChannel: (data: IChannel) => void;
  actives: IActive[];
}

export const chatContext = createContext<IContext>({} as IContext);

const ChatContainer = ({ children }: IProps) => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const { _id, members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const router = useRouter();

  const [channels, setChannels] = useState<IChannel[]>([]);

  const [actives, setActives] = useState<IActive[]>([]);

  const socket = useSocket("/chat", "https://henosis-server-bd.herokuapp.com");

  const [showChannel, setShowChannel] = useState(false);

  const [showActive, setShowActive] = useState(false);

  useEffect(() => {
    if (socket !== null) {
      socket.on("change-activeList", (activeList: IActive[]) => {
        setActives(activeList);
      });
    }
  }, [socket]);

  useEffect(() => {
    const currentUser = members.find((member) => member.email === email);
    if (socket !== null) {
      socket.emit("join-workspace", { _id, userId: currentUser._id });
    }
  }, [socket, _id, email, members]);

  useEffect(() => {
    if (socket !== null) {
      socket.emit(
        "workspace-channels",
        _id,
        (error: Error, channels: IChannel[]) => {
          if (error) {
            console.log(error.message);
          } else {
            setChannels(channels);
          }
        }
      );
    }
  }, [socket, _id]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("created-channel", (channel: IChannel) => {
        setChannels((preChannels) => [...preChannels, channel]);
      });
    }
  }, [socket]);

  const handleAddChannel = (data: IChannel) => {
    const loadingId = toast.loading("loading...");
    socket.emit("create-channel", data, (id: string) => {
      toast.dismiss(loadingId);
      toast.success("Channel Created Successfully!");
      router.replace(`/workspaces/${_id}/chat/${id}`);
      setShowChannel(false);
    });
  };
  return (
    <chatContext.Provider
      value={{
        channels,
        socket,
        actives,
        showChannel,
        setShowChannel,
        showActive,
        setShowActive,
        handleAddChannel,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ChatContainer;
