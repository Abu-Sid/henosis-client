import React, { useState } from "react";
import PricingMain from "../components/Pricing/PricingMain";
import PricingTop from "../components/Pricing/PricingTop";
import { motion } from "framer-motion";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleIsAnnual = (annual: boolean) => {
    setIsAnnual(annual);
  };

  return (
    <motion.section
      exit={{ opacity: 0 }}
      animate='animate'
      initial='initial'
      className='pricing-section'
    >
      <PricingTop handleIsAnnual={handleIsAnnual} isAnnual={isAnnual} />
      <PricingMain isAnnual={isAnnual} />
    </motion.section>
  );
};

export default Pricing;
