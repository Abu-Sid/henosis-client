import Image from 'next/image';
import React from 'react';
import chat from '../../../public/images/chat.png';
const BoardSection = () => {
    return (
        <div className='chat'>
            <div className='chat__image'>
                <Image src={chat} alt='chat' />
            </div>
            <div chat__text>
                <h5>Group Chat</h5>
                <h2>The board is just the <span>beginning</span> .</h2>
                <p>You can <span>chat with other developers</span>  in your group, 
while working on a feature or solving a problem.</p>
            </div>
        </div>
    );
};

export default BoardSection;