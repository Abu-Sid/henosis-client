import React from "react";
import { priceData } from "./PriceData";
import PricingCard from "./PricingCard";
import { motion } from "framer-motion";

interface IProps {
  isAnnual: boolean;
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

const PricingMain = ({ isAnnual }: IProps) => {
  return (
    <>
      {priceData && (
        <motion.div
          variants={stagger}
          animate='animate'
          initial='initial'
          className='pricing-section__main'
        >
          {priceData.map((data) => (
            <PricingCard key={data.id} data={data} isAnnual={isAnnual} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default PricingMain;
