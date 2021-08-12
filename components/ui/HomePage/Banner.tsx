import Image from "next/image";
import Link from "next/link";
import React from "react";
import banner from "../../../public/images/banner.png";
const Banner = () => {
  return (
    <div data-testid="banner-test" className="banner">
      <div className="banner__text">
        <div data-aos="fade-down" data-aos-duration="1000">
          <h1>
            Get your work done. <br /> <span>Together.</span>
          </h1>
          <h4>
            Project Management and Collaboration made easy by
            <span> Henosis</span>.
          </h4>
        </div>

        <Link href="/signup" passHref>
          <button
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="1000"
            className="button-primary"
          >
            GET STARTED
          </button>
        </Link>
      </div>

      <div
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-delay="1000"
        className="banner__image"
      >
        <Image src={banner} alt="banner" />
      </div>
    </div>
  );
};

export default Banner;
