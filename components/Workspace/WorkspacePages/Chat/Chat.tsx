import React from "react";
import ChatBody from "./ChatBody";
import ChatChannel from "./ChatChannel";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatMembers from "./ChatMembers";

const Chat = () => {
  return (
    <ChatContainer>
      <section className="chat-portal">
        <ChatHeader />
        <div className="chat-portal__body">
          <ChatChannel />
          <ChatBody />
          <ChatMembers />
        </div>
      </section>
    </ChatContainer>
  );
};

export default Chat;
