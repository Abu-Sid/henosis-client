import Image from "next/image";
import React from "react";
import board from "../../../public/images/board.png";

const FeaturesSection = () => {
  return (
    <div className="features">
      <div className="features__text">
        <div data-aos="fade-up">
          <h1>
            It’s more than work. It’s a way of working <span>together</span> .
          </h1>
          <h4>
            Start with a <span>Henosis </span> board. Customize and expand with
            more features as your teamwork grows. Manage projects, organize
            tasks, and build team spirit—all in one place.
          </h4>
        </div>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-duration="500"
        data-aos-delay="500"
        className="features__image"
      >
        <Image src={board} alt="board" />
      </div>
    </div>
  );
};

export default FeaturesSection;
