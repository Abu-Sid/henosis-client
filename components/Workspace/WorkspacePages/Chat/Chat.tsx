import React from "react";
import Image from "next/image";
import ChatChannel from "./ChatChannel";
import ChatHeader from "./ChatHeader";
import Purple from "../../../../public/images/icons/purple.svg";
import Green from "../../../../public/images/icons/green.svg";
import Pink from "../../../../public/images/icons/pink.svg";
import Orange from "../../../../public/images/icons/orange.svg";
import Send from "../../../../public/images/icons/paper-airplane.svg";

const Chat = () => {
  return (
    <section className='chat-portal'>
      <ChatHeader />
      <div className='chat-portal__body'>
        <ChatChannel />
        <div className='chat-body'>
          <div className='type-box'>
            <input type='text' />
            <Image src={Send} alt='send icon' />
          </div>
        </div>
        <div className='members'>
          <div className='members__online'>
            <h3>Online (2)</h3>
            <div className='chat-member'>
              <Image width={30} src={Purple} alt='profile picture' />
              <p>Mir Hussain</p>
            </div>
            <div className='chat-member'>
              <Image width={30} src={Green} alt='profile picture' />
              <p>Saiful Islam Sojib</p>
            </div>
          </div>
          <div className='members__offline'>
            <h3>Offline (2)</h3>
            <div className='chat-member'>
              <Image width={30} src={Pink} alt='profile picture' />
              <p>Abu Siddique</p>
            </div>
            <div className='chat-member'>
              <Image width={30} src={Orange} alt='profile picture' />
              <p>Md Naimur</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
