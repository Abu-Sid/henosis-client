import { format, subDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const [messageCount, setMessageCount] = useState(0);

  const [messageLoading, setMessageLoading] = useState(true);

  const [scrolling, setScrolling] = useState(true);

  const [smooth, setSmooth] = useState(false);

  const [inputData, setInputData] = useState("");

  const [previousRoom, setPreviousRoom] = useState("");

  const [messageError, setMessageError] = useState("");

  const currentChannel = channels.find((channel) => channel?._id === id);

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setSmooth(false);
    setScrolling(true);
    setMessages([]);
    setMessageCount(0);
  }, [id]);

  const observer = useRef(null);
  const lastMessageRef = useCallback(
    (node) => {
      if (messageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setMessageCount((prevPageNumber) => prevPageNumber + 20);
          setScrolling(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [messageLoading, hasMore]
  );

  useEffect(() => {
    if (id && socket !== null) {
      setMessageError("");
      setMessageLoading(true);
      socket.emit(
        "previous-message",
        { channelId: id, messageCount },
        (error: Error, result: IMessage[]) => {
          if (error) {
            setMessageError(error.message);
            setMessageLoading(false);
            setScrolling(false);
            setHasMore(false);
          } else {
            setMessages((preMsg) => [...result, ...preMsg]);
            setMessageLoading(false);
            setScrolling(false);
            setHasMore(result.length > 19);
          }
        }
      );
    }
  }, [id, socket, messageCount]);

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
        setSmooth(true);
        setScrolling(true);
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
    if (scrolling) {
      chatRef.current?.scrollIntoView(smooth ? { behavior: "smooth" } : {});
    }
  }, [messages, scrolling, smooth]);

  const newArray = Array.from(Array(12));

  return (
    <div className="chat-body">
      <div className="messages">
        {messageLoading &&
          newArray.map((_, index) => (
            <div
              key={index}
              className={
                (index + 1) % 2 === 0 ? "message-right" : "message-left"
              }
            >
              <div className="main-message">
                <p className="skeleton skeleton-message"></p>
                <small className="skeleton skeleton-name"></small>
              </div>
              <div className="skeleton skeleton-img"></div>
            </div>
          ))}
        {messageError && messages.length === 0 && <h1>{messageError}</h1>}
        {messages.map((message, index) => {
          const sender = members.find(
            (member) => member._id === message.userId
          );
          let hour = new Date(message.date).getHours();
          let amPm = "AM";
          if (!hour) {
            hour = 1;
          } else if (hour > 12) {
            hour = hour - 12;
            amPm = "PM";
          }
          let minute: number | string = new Date(message.date).getMinutes();
          if (minute < 10) {
            minute = "0" + minute;
          }
          const date = new Date(message.date).toDateString();
          const anotherDate = format(new Date(message.date), "dd/MM/yyyy");
          const newDate = new Date().toDateString();
          const yesterday = subDays(new Date(), 1).toDateString();
          return (
            <div
              key={message._id}
              className={
                sender.email === email ? "message-right" : "message-left"
              }
              ref={index === 0 ? lastMessageRef : null}
            >
              <div className="main-message">
                <p>{message.message}</p>
                <small>
                  <span>{sender.name}</span> -{" "}
                  {newDate === date
                    ? "Today"
                    : date === yesterday
                    ? "Yesterday"
                    : anotherDate}{" "}
                  at {hour + ":" + minute + " " + amPm}
                </small>
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
