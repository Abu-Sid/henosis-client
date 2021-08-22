import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSocket from "../../../../hooks/useSocket";
import Green from "../../../../public/images/icons/green.svg";
import Orange from "../../../../public/images/icons/orange.svg";
import Pink from "../../../../public/images/icons/pink.svg";
import Purple from "../../../../public/images/icons/purple.svg";
import { RootState } from "../../../../redux/reducers";
import ChatBody from "./ChatBody";
import ChatChannel from "./ChatChannel";
import ChatHeader from "./ChatHeader";

export interface IChannel {
  _id?: string;
  chatName: string;
  workspaceId: string;
  users: string[];
}

const Chat = () => {
  const socket = useSocket("/chat", "https://henosis-server-bd.herokuapp.com");

  const { _id } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const [channels, setChannels] = useState<IChannel[]>([]);

  useEffect(() => {
    if (socket !== null) {
      socket.emit("join-workspace", _id);
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

  return (
    <section className="chat-portal">
      <ChatHeader />
      <div className="chat-portal__body">
        <ChatChannel channels={channels} />
        <ChatBody channel={channels[0]} socket={socket} />
        <div className="members">
          <div className="members__online">
            <h3>Online (2)</h3>
            <div className="chat-member">
              <Image width={30} src={Purple} alt="profile picture" />
              <p>Mir Hussain</p>
            </div>
            <div className="chat-member">
              <Image width={30} src={Green} alt="profile picture" />
              <p>Saiful Islam Sojib</p>
            </div>
          </div>
          <div className="members__offline">
            <h3>Offline (2)</h3>
            <div className="chat-member">
              <Image width={30} src={Pink} alt="profile picture" />
              <p>Abu Siddique</p>
            </div>
            <div className="chat-member">
              <Image width={30} src={Orange} alt="profile picture" />
              <p>Md Naimur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
