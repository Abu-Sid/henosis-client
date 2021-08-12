import Image from "next/image";
import React from "react";
import chat from "../../../public/images/chat.png";
const BoardSection = () => {
  return (
    <div className="chat">
      <div
        data-aos="fade-right"
        data-aos-duration="500"
        data-aos-delay="500"
        className="chat__image"
      >
        <Image src={chat} alt="chat" />
      </div>
      <div className="chat__text">
        <h4 data-aos="fade-left" data-aos-delay="100">
          Group Chat
        </h4>
        <h2 data-aos="fade-left" data-aos-delay="200">
          The board is just the <span>beginning</span>
        </h2>
        <br />
        <p data-aos="fade-left" data-aos-delay="300">
          You can <span>chat with other developers</span> in your group, while
          working on a feature or solving a problem.
        </p>
      </div>
    </div>
  );
};

export default BoardSection;
