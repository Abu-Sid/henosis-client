import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import Bell from "../../../../public/images/icons/bell.svg";
import Search from "../../../../public/images/icons/search.svg";
import Tag from "../../../../public/images/icons/tag.svg";
import { RootState } from "../../../../redux/reducers";
import { DropdownItem, DropdownMenu } from "../../../ui/Navbar/DropDown";
import { IChannel } from "./Chat";

interface IProps {
  channels: IChannel[];
  setShowChannel: React.Dispatch<React.SetStateAction<boolean>>;
  setShowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader = ({ channels, setShowChannel, setShowActive }: IProps) => {
  const router = useRouter();

  const id = router.query.paths[2] || channels[0]?._id;

  const currentChannel = channels.find((channel) => channel?._id === id);

  const { workspaceName } = useSelector(
    (state: RootState) => state.workspaceReducer.workspace
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleChannel = () => {
    setShowChannel((preValue) => !preValue);
    setIsOpen(false);
    setShowActive(false);
  };

  const handleActive = () => {
    setShowActive((preValue) => !preValue);
    setIsOpen(false);
    setShowChannel(false);
  };

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
        <button
          className="button-primary chat-toggle"
          onClick={() => setIsOpen(true)}
        >
          {isOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
        <div className="options-right">
          <div className="options-icons">
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
        {isOpen && (
          <div className="chat-dropdown">
            <DropdownMenu width={230} setIsOpen={setIsOpen}>
              <div className="options-right display">
                <div className="options-icons">
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
              <DropdownItem functionality={handleChannel}>
                Channels
              </DropdownItem>
              <DropdownItem functionality={handleActive}>Active</DropdownItem>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
