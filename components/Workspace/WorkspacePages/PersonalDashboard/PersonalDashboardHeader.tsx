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
        This is personal dashboard__header
      </div>
    </div>
  );
};

export default PersonalDashboardHeader;
