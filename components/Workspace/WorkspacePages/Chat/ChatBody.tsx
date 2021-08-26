import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import Send from "../../../../public/images/icons/paper-airplane.svg";
import personImage from "../../../../public/images/icons/purple.svg";
import { RootState } from "../../../../redux/reducers";
import { IChannel } from "./Chat";

interface IProps {
  channels: IChannel[];
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

const ChatBody = ({ channels, socket }: IProps) => {
  const router = useRouter();

  const id = router.query.paths[2] || channels[0]?._id;

  const { members } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const { email } = useSelector((state: RootState) => state.userReducer.user);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [messageLoading, setMessageLoading] = useState(true);

  const [inputData, setInputData] = useState("");

  const [previousRoom, setPreviousRoom] = useState("");

  const [messageError, setMessageError] = useState("");

  const currentChannel = channels.find((channel) => channel?._id === id);

  useEffect(() => {
    if (id && socket !== null) {
      setMessages([]);
      setMessageError("");
      setMessageLoading(true);
      socket.emit(
        "previous-message",
        id,
        (error: Error, messages: IMessage[]) => {
          if (error) {
            setMessageError(error.message);
            setMessageLoading(false);
          } else {
            setMessages(messages);
            setMessageLoading(false);
          }
        }
      );
    }
  }, [id, socket]);

  useEffect(() => {
    if (socket !== null) {
      socket.emit("join-channel", id, previousRoom, () => {
        setPreviousRoom(id);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, id]);

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
        channelId: id,
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

  const chatRef = useRef(null as HTMLDivElement);

  useEffect(() => {
    chatRef.current?.scrollIntoView(
      messageLoading ? {} : { behavior: "smooth" }
    );
  }, [messages, messageLoading]);

  return (
    <div className="chat-body">
      <div className="messages">
        {messageLoading && <h1>Loading...</h1>}
        {messageError && messages.length === 0 && <h1>{messageError}</h1>}
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
              <div className="main-message">
                <p>{message.message}</p>
                <small>{sender.name}</small>
              </div>
              <img src={sender.photo || personImage.src} alt="" />
            </div>
          );
        })}
        <div ref={chatRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="type-box">
        <input
          placeholder={`Send a message to # ${
            currentChannel?.chatName || "general"
          }`}
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
