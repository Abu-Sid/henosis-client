import React from "react";
import Image from "next/image";
import dashboard from "../public/images/dashboard.svg";
import purpleDots from "../public/images/purple-dots.svg";
import grayDots from "../public/images/gray-dots.svg";
import invitations from "../public/images/invitation.svg";
import tasks from "../public/images/tasks.svg";
import workspace from "../public/images/workspace.svg";

const Home = () => {
  return (
    <section className='home-section'>
      <div className='intro-text'>
        <h1>Get your work done. Together</h1>
        <p>Project management and collaboration made easy.</p>
      </div>
      <div className='dashboard'></div>
    </section>
  );
};

export default Home;
