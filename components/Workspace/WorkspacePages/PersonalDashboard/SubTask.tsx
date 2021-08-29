import React from "react";

interface ISubTaskHeader {
  handleAddSubTask: () => void;
}

const SubTask: React.FC = () => {
  const handleAddSubTask = () => {
    console.log("Add sub task clicked");
  };

  return (
    <>
      <SubTaskHeader handleAddSubTask={handleAddSubTask} />
    </>
  );
};

const SubTaskHeader: React.FC<ISubTaskHeader> = ({ handleAddSubTask }) => {
  return (
    <div className='personal-dashboard__sub-task__header'>
      <h1>Add sub-task</h1>
      <div className='sub-task-add-button' onClick={handleAddSubTask}>
        <svg
          width='50'
          height='50'
          viewBox='0 0 50 50'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M25 18.75V25M25 25V31.25M25 25H31.25M25 25H18.75M43.75 25C43.75 35.3553 35.3553 43.75 25 43.75C14.6447 43.75 6.25 35.3553 6.25 25C6.25 14.6447 14.6447 6.25 25 6.25C35.3553 6.25 43.75 14.6447 43.75 25Z'
            stroke='#4A4FFF'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  );
};

export default SubTask;
