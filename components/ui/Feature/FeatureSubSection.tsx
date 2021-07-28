import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface IFeature {
  feature: {
    id: string;
    image: string;
    featureHeader: string;
    details: string;
    textPosition: string;
  };
}

const FeatureSubSection: React.FC<IFeature> = ({ feature }) => {
  const { id, image, featureHeader, details, textPosition } = feature;
  return (
    <div
      className={
        textPosition === "left"
          ? "features-sub-section-reverse"
          : "features-sub-section"
      }
    >
      <div
        className={
          textPosition === "left"
            ? "features-sub-section-reverse__image"
            : "features-sub-section__image"
        }
      >
        <div>
          <Image
            src={require(`../../../public/images/${image}`).default}
            alt={`${id}`}
          />
        </div>
      </div>
      <div
        className={
          textPosition === "left"
            ? "features-sub-section-reverse__info"
            : "features-sub-section__info"
        }
      >
        <h1>{featureHeader}</h1>
        <p>{details}</p>
        <div>
          <Link href='/features'>
            <a>
              Read More
              <FontAwesomeIcon className='read-more-icon' icon={faArrowRight} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeatureSubSection;
