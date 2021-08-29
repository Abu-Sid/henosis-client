import React from "react";
import AssignedToMe from "./AssignedToMe";
import DashboardAccount from "./DashboardAccount";
import DashboardBarChart from "./DashboardBarChart";
import DashboardProgressChart from "./DashboardProgressChart";
import DashboardStatusPill from "./DashboardStatusPill";
import PersonalDashboardHeader from "./PersonalDashboardHeader";
import SubTask from "./SubTask";
const PersonalDashboard = () => {
  return (
    <section className='personal-dashboard'>
      <div className='personal-dashboard__header'>
        <PersonalDashboardHeader />
      </div>
      <div className='personal-dashboard__activity'>
        <p>Activity</p>
      </div>
      <div style={{ padding: "1em" }} className='personal-dashboard__chart'>
        <DashboardBarChart />
      </div>
      <div className='personal-dashboard__progress'>
        <DashboardProgressChart />
      </div>
      <div className='personal-dashboard__to-do'>
        <DashboardStatusPill status='Remaining' />
      </div>
      <div className='personal-dashboard__in-progress'>
        <DashboardStatusPill status='In Progress' />
      </div>
      <div className='personal-dashboard__done'>
        <DashboardStatusPill status='Done' />
      </div>
      <div className='personal-dashboard__assigned-to-me'>
        <p>Assigned to me</p>
      </div>
      <div className='personal-dashboard__task'>
        <AssignedToMe />
      </div>
      <div className='personal-dashboard__add-sub-task'>
        <p>My Sub-tasks</p>
      </div>
      <div className='personal-dashboard__sub-task'>
        <SubTask />
      </div>
      <div className='personal-dashboard__account'>
        <DashboardAccount />
      </div>
    </section>
  );
};

export default PersonalDashboard;
