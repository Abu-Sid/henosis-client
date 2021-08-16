import React from "react";
import LoadingAnimation from "../../../ui/Animation/LoadingAnimation";
import ChatHeader from "./ChatHeader";

const Chat = () => {
  return (
    <section className='chat-portal'>
      <ChatHeader />
      <div className='chat-portal__body'>
        <div className='channel'>
          <div className='channel__text'></div>
          <div className='channel__options'></div>
        </div>
        <div className='chat-body'></div>
        <div className='members'></div>
      </div>
    </section>
  );
};

export default Chat;
