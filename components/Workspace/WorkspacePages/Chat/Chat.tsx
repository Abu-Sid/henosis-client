import React from "react";
import ChatChannel from "./ChatChannel";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <section className='chat-portal'>
      <ChatHeader />
      <div className='chat-portal__body'>
        <ChatChannel />
        <div className='chat-body'></div>
        <div className='members'></div>
      </div>
    </section>
  );
};

export default Chat;
