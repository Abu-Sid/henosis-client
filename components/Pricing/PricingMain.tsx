import React from "react";
import { priceData } from "./PriceData";
import PricingCard from "./PricingCard";

interface IProps{
    isAnnual: boolean;
}

const PricingMain = ({isAnnual}: IProps) => {
  return (
    <div className="pricing-section__main">
      {priceData.map((data) => (
        <PricingCard key={data.id} data={data} isAnnual={isAnnual} />
      ))}
    </div>
  );
};

export default PricingMain;
