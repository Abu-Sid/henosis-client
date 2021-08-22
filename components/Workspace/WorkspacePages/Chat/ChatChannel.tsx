import Image from "next/image";
import React from "react";
import Gear from "../../../../public/images/icons/cog.svg";
import Mic from "../../../../public/images/icons/microphone.svg";
import User from "../../../../public/images/icons/user-pp.svg";
import Speaker from "../../../../public/images/icons/volume-up.svg";
import { IChannel } from "./Chat";

interface IProps {
  channels: IChannel[];
}

const ChatChannel = ({ channels }: IProps) => {
  return (
    <section className="chat-channel">
      <div className="chat-channel__text">
        <div className="chat-channel__text-header">
          <h1>Text Channels</h1>
          <button>+</button>
        </div>
        <div className="chat-channels">
          {channels.map(({ _id, chatName }) => (
            <p key={_id} className="chat-member">
              #{chatName}
            </p>
          ))}
        </div>
      </div>
      <div className="chat-channel__options">
        <div className="options-user-pp">
          <Image src={User} alt="user profile picture" height={40} width={40} />
        </div>
        <div className="options-icon">
          <Image src={Speaker} alt="Speaker Icon" height={24} width={24} />
        </div>
        <div className="options-icon">
          <Image src={Mic} alt="Microphone Icon" height={24} width={24} />
        </div>
        <div className="options-icon">
          <Image src={Gear} alt="Gear Icon" height={24} width={24} />
        </div>
      </div>
    </section>
  );
};

export default ChatChannel;
