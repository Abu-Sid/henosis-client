import React from "react";
import Image from "next/image";
import Purple from "../../../../public/images/icons/purple.svg";
import pink from "../../../../public/images/icons/pink.svg";
import green from "../../../../public/images/icons/green.svg";
import blue from "../../../../public/images/icons/blue.svg";
import orange from "../../../../public/images/icons/orange.svg";

const BoardMembers = () => {
  return (
    <div className='board-section__members-container'>
      <p>Members (5)</p>
      <div className='board-section__members'>
        <button title='Add members'> + </button>
        <div>
          <Image src={Purple} alt='user-icon' />
        </div>
        <div>
          <Image src={blue} alt='user-icon' />
        </div>
        <div>
          <Image src={green} alt='user-icon' />
        </div>
        <div>
          <Image src={pink} alt='user-icon' />
        </div>
        <div>
          <Image src={orange} alt='user-icon' />
        </div>
      </div>
    </div>
  );
};

export default BoardMembers;
