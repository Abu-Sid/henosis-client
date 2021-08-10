import React from "react";
import Image from "next/image";
import purple from "../../../../public/images/icons/purple.svg";
const TaskCard = () => {
  return (
    <div className='task-card'>
      <div className='task-card__info'>
        <h1>This is a Demo task</h1>
        <p>10 July - 12 July</p>
      </div>
      <div className='task-card__members'>
        <div className='member-icon'>
          <Image src={purple} alt='user-icon' />
        </div>
        <div className='member-icon'>
          <Image src={purple} alt='user-icon' />
        </div>
        <div className='member-icon'>
          <Image src={purple} alt='user-icon' />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
