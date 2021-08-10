import Image from "next/image";
import React from "react";
import dashboard from "../../../public/images/dashboard.png";

const DashboardSection = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard__text'>
        <h5 data-aos='fade-right' data-aos-delay='100'>
          Dive into the details.
        </h5>
        <h2 data-aos='fade-right' data-aos-delay='200'>
          Your <span>dashboard</span> contains everything that you need to know.
        </h2>
        <br />
        <p data-aos='fade-right' data-aos-delay='300'>
          Your dashboard is a portal to your <span>personal work flow</span> .
          You can track your daily progress as well as overall progress. To
          better organize your task, there is a option for adding sub-tasks.
        </p>
      </div>
      <div className='dashboard__image'>
        <Image src={dashboard} alt='dashboard' />
      </div>
    </div>
  );
};

export default DashboardSection;
