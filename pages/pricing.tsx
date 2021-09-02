import { motion } from "framer-motion";
import React, { useState } from "react";
import PricingMain from "../components/Pricing/PricingMain";
import PricingTop from "../components/Pricing/PricingTop";
import { exit } from "../components/ui/Animation/Animation";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleIsAnnual = (annual: boolean) => {
    setIsAnnual(annual);
  };

  return (
    <motion.section
      exit={exit}
      animate="animate"
      initial="initial"
      className="pricing-section"
    >
      <PricingTop handleIsAnnual={handleIsAnnual} isAnnual={isAnnual} />
      <PricingMain isAnnual={isAnnual} />
    </motion.section>
  );
};

export default Pricing;
