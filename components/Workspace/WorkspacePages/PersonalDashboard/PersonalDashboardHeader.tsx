import React from "react";

const PersonalDashboardHeader = () => {
  const today = new Date();
  const day = today.toLocaleString("default", { weekday: "long" });
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();
  const year = today.getFullYear();
  return (
    <div className='personal-dashboard__header'>
      <div className='personal-dashboard__header__time'>
        <span>{day}, </span>
        {month} {date}, {year}
      </div>
      <div className='personal-dashboard__header__info'>
        <div className='info__image'></div>
        <div className='info__text'>
          <h1>
            Hi, <span>Mir Hussain</span>
          </h1>
          <p>Welcome to Henosis</p>
          <p>
            You have 4 tasks to finish today. You have already completed 60% of
            your tasks. Your progress is unbeatable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboardHeader;
