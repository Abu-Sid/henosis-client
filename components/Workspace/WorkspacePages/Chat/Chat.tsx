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
        <div className='members'>
          <div className='members__online'>
            <h3>Online (2)</h3>
            <p>Mir Hussain</p>
            <p>Saiful Islam Sojib</p>
          </div>
          <div className='members__offline'>
            <h3>Offline (2)</h3>
            <p>Abu Siddique</p>
            <p>Md Naimur</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
