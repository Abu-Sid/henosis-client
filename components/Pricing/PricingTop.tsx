import React from "react";

interface IProps {
  handleIsAnnual: (annual: boolean) => void;
  isAnnual: boolean;
}

const PricingTop = ({ handleIsAnnual, isAnnual }: IProps) => {
  return (
    <div className="pricing-section__top">
      <div>
        <h1>Simple, transparent pricing.</h1>
        <h3>No contracts, no surprise fees.</h3>
      </div>
      <div>
        <button
          className={isAnnual ? "price-active" : ""}
          onClick={() => handleIsAnnual(false)}
        >
          Monthly
        </button>
        <button
          className={!isAnnual ? "price-active" : ""}
          onClick={() => handleIsAnnual(true)}
        >
          Annual
        </button>
      </div>
    </div>
  );
};

export default PricingTop;
