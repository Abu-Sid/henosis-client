import Link from "next/link";
import React from "react";
import { features } from "./PriceData";
import SelectIcon from "./SelectIcon";
import { motion } from "framer-motion";

interface IProps {
  data: {
    id: number;
    title: string;
    monthlyPrice: number;
    annualPrice: number;
    userLimit: string;
    workspaceLimit: number;
  };
  isAnnual: boolean;
}

const cardVariant = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const PricingCard = ({ data, isAnnual }: IProps) => {
  const { title, monthlyPrice, userLimit, annualPrice, workspaceLimit } = data;

  return (
    <>
      {features && (
        <motion.div
          variants={cardVariant}
          animate='animate'
          initial='initial'
          className='pricing-section__main__card'
        >
          <h3>{title}</h3>
          {features.map(({ id, featureName, available }) => (
            <p key={id}>
              <SelectIcon isSelected={available.includes(title)} />{" "}
              {featureName}{" "}
              {featureName === "User Limit"
                ? userLimit
                : featureName === "Workspace Limit"
                ? workspaceLimit
                : ""}
            </p>
          ))}
          <h3 className='pricing-section__main__card__price'>
            {monthlyPrice
              ? "Price: " + (isAnnual ? "$" + annualPrice : "$" + monthlyPrice)
              : "Free (Personal Use)"}
          </h3>
          <Link
            href={
              title === "Basic"
                ? "/new-workspace"
                : {
                    pathname: "/information",
                    query: { name: title.toLowerCase(), isAnnual },
                  }
            }
            passHref
          >
            <button>
              {title === "Basic" ? "Get Started" : "Start 7 day trial"}
            </button>
          </Link>
        </motion.div>
      )}
    </>
  );
};

export default PricingCard;
