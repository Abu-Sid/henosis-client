import React from "react";
import Image from "next/image";
import Tag from "../../../../public/images/icons/tag.svg";
import Bell from "../../../../public/images/icons/bell.svg";
import Search from "../../../../public/images/icons/search.svg";

const ChatHeader: React.FC = () => {
  return (
    <div className='chat-portal__header'>
      <div className='indicator-container'>
        <p className='indicator'>
          <span> chat </span> / shop nyla
        </p>
      </div>
      <div className='options-container'>
        <div className='channel-name'>
          <h2>#general</h2>
        </div>
        <div className='options-icon'>
          <Image src={Bell} alt='bell-icon' />
        </div>
        <div className='options-icon'>
          <Image src={Tag} alt='tag-icon' />
        </div>
      </div>
      <div className='search-container'>
        <div className='search-box'>
          <label htmlFor='search'>
            <Image src={Search} alt='search-icon' />
          </label>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='search...'
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
