import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import Send from "../../../../public/images/icons/paper-airplane.svg";
import personImage from "../../../../public/images/icons/purple.svg";
import { RootState } from "../../../../redux/reducers";
import { IChannel } from "./Chat";

interface IProps {
  channel: IChannel;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

interface IMessage {
  _id?: string;
  channelId: string;
  message: string;
  userId: string;
  date: Date;
  seen: string[];
}

const ChatBody = ({ channel, socket }: IProps) => {
  const { _id } = channel || {};

  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [inputData, setInputData] = useState("");

  useEffect(() => {
    if (_id && socket !== null) {
      socket.emit(
        "previous-message",
        _id,
        (error: Error, messages: IMessage[]) => {
          if (error) {
            console.log(error);
          } else {
            setMessages(messages);
          }
        }
      );
      socket.emit("join-channel", _id);
    }
  }, [_id, socket]);

  useEffect(() => {
    if (socket !== null) {
      socket.on("message-sended", (newMessage: IMessage) => {
        setMessages((preMessages) => [...preMessages, newMessage]);
      });
    }
  }, [socket]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputData("");
    if (socket !== null && inputData) {
      const user = members.find((member) => member.email === email);
      const newMessage = {
        message: inputData,
        channelId: _id,
        userId: user._id,
        date: new Date(),
        seen: [],
      };
      socket.emit("message-send", newMessage);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.currentTarget.value);
  };

  return (
    <div className="chat-body">
      <div className="messages">
        {messages.map((message) => {
          const sender = members.find(
            (member) => member._id === message.userId
          );
          return (
            <div
              key={message._id}
              className={
                sender.email === email ? "message-right" : "message-left"
              }
            >
              <p>{message.message}</p>
              <img src={sender.photo || personImage.src} alt="" />
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="type-box">
        <input
          placeholder="send a message"
          onChange={handleInput}
          value={inputData}
          type="text"
        />
        <button type="submit">
          <Image src={Send} alt="send icon" />
        </button>
      </form>
    </div>
  );
};

export default ChatBody;
