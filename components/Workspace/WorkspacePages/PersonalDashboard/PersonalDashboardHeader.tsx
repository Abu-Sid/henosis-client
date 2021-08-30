import React from "react";
import CodingBanner from "./CodingBanner";

const PersonalDashboardHeader: React.FC = () => {
  const today = new Date();
  const day = today.toLocaleString("default", { weekday: "long" });
  const month = today.toLocaleString("default", { month: "long" });
  const date = today.getDate();
  const year = today.getFullYear();
  return (
    <>
      <div className='personal-dashboard__header__info'>
        <div className='info__image'>
          <CodingBanner />
        </div>
        <div className='info__text'>
          <h1>
            Hi, <span>Mir Hussain</span>
          </h1>
          <div className='personal-dashboard__header__time'>
            It is <span>{day}, </span>
            {month} {date}, {year}
          </div>
          <p>
            You have 4 tasks to finish today. You have already completed 60% of
            your tasks. Your progress is unbeatable.
          </p>
        </div>
      </div>
    </>
  );
};

export default PersonalDashboardHeader;
