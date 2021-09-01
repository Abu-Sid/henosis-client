import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
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
          Real Time Communication
        </h4>
        <h2 data-aos="fade-left" data-aos-delay="200">
          The board is just the <span>beginning</span>
        </h2>
        <br />
        <p data-aos="fade-left" data-aos-delay="300">
          Add comments and tag your team on any task or document. Assign action
          items,<span>chat in real-time</span> , share attachments, and never
          miss a beat with fluid team communication
        </p>
        <div>
          <Link href="/features">
            <a>
              Read More
              <FontAwesomeIcon
                className="read-more-icon"
                icon={faArrowRight as IconProp}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardSection;
