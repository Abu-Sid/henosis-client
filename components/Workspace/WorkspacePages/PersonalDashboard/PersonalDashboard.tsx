import React from "react";
import PersonalDashboardHeader from "./PersonalDashboardHeader";
const PersonalDashboard = () => {
  return (
    <section className='personal-dashboard'>
      <PersonalDashboardHeader />
      <div className='personal-dashboard__chart'></div>
      <div className='personal-dashboard__progress'></div>
      <div className='personal-dashboard__to-do'></div>
      <div className='personal-dashboard__in-progress'></div>
      <div className='personal-dashboard__done'></div>
      <div className='personal-dashboard__task'></div>
      <div className='personal-dashboard__sub-task'></div>
      <div className='personal-dashboard__account'></div>
    </section>
  );
};

export default PersonalDashboard;
