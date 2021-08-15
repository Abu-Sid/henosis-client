import React from "react";
import LoadingAnimation from "../../ui/Animation/LoadingAnimation";

const Chat = () => {
  return (
    <section className='chat-portal'>
      <div className='chat-portal__header'></div>
      <div className='chat-portal__body'>
        <div className='channel'></div>
        <div className='chat-body'></div>
        <div className='members'></div>
      </div>
    </section>
  );
};

export default Chat;
