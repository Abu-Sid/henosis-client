import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useSocket from "../../../../hooks/useSocket";
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

interface IActive {
  id?: string;
  userId: string;
  workspaceId: string;
}

const Chat = () => {
  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const { _id, members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const router = useRouter();

  const [channels, setChannels] = useState<IChannel[]>([]);

  const [actives, setActives] = useState<IActive[]>([]);

  const socket = useSocket("/chat", "http://localhost:5000");

  const offline = members.filter(
    (member) =>
      !actives.map((activeMember) => activeMember.userId).includes(member._id)
  );

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
    });
  };

  return (
    <section className="chat-portal">
      <ChatHeader channels={channels} />
      <div className="chat-portal__body">
        <ChatChannel channels={channels} handleAddChannel={handleAddChannel} />
        <ChatBody channels={channels} socket={socket} />
        <div className="members">
          <div className="members__online">
            <h3>Online ({actives.length})</h3>
            {actives.map((active) => {
              const { id, userId } = active;
              const activeUser = members.find(
                (member) => member._id === userId
              );
              const { photo, name } = activeUser;
              return (
                <div key={id} className="chat-member">
                  <img src={photo || Purple.src} alt="profile picture" />
                  <p>{name}</p>
                </div>
              );
            })}
          </div>
          <div className="members__offline">
            <h3>Offline ({offline.length})</h3>
            {offline.map((member) => (
              <div key={member._id} className="chat-member">
                <img src={member.photo || Purple.src} alt="profile picture" />
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
