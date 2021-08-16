import React from "react";
import Image from "next/image";
import ChatHeader from "./ChatHeader";
import User from "../../../../public/images/icons/user-pp.svg";
import Gear from "../../../../public/images/icons/cog.svg";
import Mic from "../../../../public/images/icons/microphone.svg";
import Speaker from "../../../../public/images/icons/volume-up.svg";

const Chat = () => {
  return (
    <section className='chat-portal'>
      <ChatHeader />
      <div className='chat-portal__body'>
        <div className='channel'>
          <div className='channel__text'>
            <div className='channel__text-header'>
              <h1>Text Channels</h1>
              <button>+</button>
            </div>
          </div>
          <div className='channel__options'>
            <div className='options-user-pp'>
              <Image
                src={User}
                alt='user profile picture'
                height={40}
                width={40}
              />
            </div>
            <div className='options-icon'>
              <Image src={Speaker} alt='Speaker Icon' height={24} width={24} />
            </div>
            <div className='options-icon'>
              <Image src={Mic} alt='Microphone Icon' height={24} width={24} />
            </div>
            <div className='options-icon'>
              <Image src={Gear} alt='Gear Icon' height={24} width={24} />
            </div>
          </div>
        </div>
        <div className='chat-body'></div>
        <div className='members'></div>
      </div>
    </section>
  );
};

export default Chat;
