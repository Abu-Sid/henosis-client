import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Bell from "../../../../public/images/icons/bell.svg";
import Search from "../../../../public/images/icons/search.svg";
import Tag from "../../../../public/images/icons/tag.svg";
import { RootState } from "../../../../redux/reducers";
import { IChannel } from "./Chat";

interface IProps {
  channels: IChannel[];
}

const ChatHeader = ({ channels }: IProps) => {
  const router = useRouter();

  const id = router.query.paths[2] || channels[0]?._id;

  const currentChannel = channels.find((channel) => channel?._id === id);

  const { workspaceName } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  return (
    <div className="chat-portal__header">
      <div className="indicator-container">
        <p className="indicator">
          <span> Chat </span> / {workspaceName}
        </p>
      </div>
      <div className="options-container">
        <div className="channel-name">
          <h2>{"# " + (currentChannel?.chatName || "general")}</h2>
        </div>
        <div className="options-icon">
          <Image src={Bell} alt="bell-icon" />
        </div>
        <div className="options-icon">
          <Image src={Tag} alt="tag-icon" />
        </div>
      </div>
      <div className="search-container">
        <div className="search-box">
          <label htmlFor="search">
            <Image src={Search} alt="search-icon" />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search..."
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
