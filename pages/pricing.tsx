import React, { useState } from "react";
import PricingMain from "../components/Pricing/PricingMain";
import PricingTop from "../components/Pricing/PricingTop";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleIsAnnual = (annual: boolean) => {
    setIsAnnual(annual);
  };

  return (
    <section className="pricing-section">
      <PricingTop handleIsAnnual={handleIsAnnual} isAnnual={isAnnual} />
      <PricingMain isAnnual={isAnnual} />
    </section>
  );
};

export default Pricing;
