import Image from "next/image";
import React from "react";
import dashboard from "../../../public/images/dashboard.png";

const DashboardSection = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__text">
        <h4 data-aos="fade-right" data-aos-delay="100">
          Manage everything in one workspace .
        </h4>
        <h2 data-aos="fade-right" data-aos-delay="200">
          Your <span>dashboard</span> contains everything that you need to know.
        </h2>
        <br />
        <p data-aos="fade-right" data-aos-delay="300">
          Your dashboard is a portal to your <span>personal work flow</span> .
          You can track your daily progress as well as overall progress. To
          better organize your task, there is a option for adding sub-tasks.
        </p>
      </div>
      <div
        data-aos="fade-left"
        data-aos-duration="500"
        data-aos-delay="500"
        className="dashboard__image"
      >
        <Image src={dashboard} alt="dashboard" />
      </div>
    </div>
  );
};

export default DashboardSection;
