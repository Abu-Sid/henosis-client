import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            Track and manage everything—from day one to the deadline—with
            <span> Henosis</span>.
          </h4>
          <br />
          <h4>All your work in one place</h4>
          <div className="banner__text__key">
            <h4
              data-aos="fade-down"
              data-aos-duration="300"
              data-aos-delay="500"
            >
              <FontAwesomeIcon
                className="banner__text__key__icon"
                icon={faCheckCircle as IconProp}
              />
              &nbsp;Tasks
            </h4>
            <h4
              data-aos="fade-down"
              data-aos-duration="400"
              data-aos-delay="600"
            >
              <FontAwesomeIcon
                className="banner__text__key__icon"
                icon={faCheckCircle as IconProp}
              />
              &nbsp;Track
            </h4>
            <h4
              data-aos="fade-down"
              data-aos-duration="500"
              data-aos-delay="700"
            >
              {" "}
              <FontAwesomeIcon
                className="banner__text__key__icon"
                icon={faCheckCircle as IconProp}
              />
              &nbsp;Chat
            </h4>
            <h4
              data-aos="fade-down"
              data-aos-duration="600"
              data-aos-delay="700"
            >
              {" "}
              <FontAwesomeIcon
                className="banner__text__key__icon"
                icon={faCheckCircle as IconProp}
              />
              &nbsp;Docs & more
            </h4>
          </div>
        </div>

        <Link href="/workspaces" passHref>
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
