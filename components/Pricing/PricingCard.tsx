import Link from "next/link";
import React from "react";
import { features } from "./PriceData";
import SelectIcon from "./SelectIcon";

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

const PricingCard = ({ data, isAnnual }: IProps) => {
  const { title, monthlyPrice, userLimit, annualPrice, workspaceLimit } = data;

  return (
    <div className="pricing-section__main__card">
      <h3>{title}</h3>
      {features.map(({ id, featureName, available }) => (
        <p key={id}>
          <SelectIcon isSelected={available.includes(title)} /> {featureName}{" "}
          {featureName === "User Limit"
            ? userLimit
            : featureName === "Workspace Limit"
            ? workspaceLimit
            : ""}
        </p>
      ))}
      <h3 className="pricing-section__main__card__price">
        {monthlyPrice
          ? "Price: " + (isAnnual ? annualPrice + "$" : monthlyPrice + "$")
          : "Free"}
      </h3>
      <Link href={title === "Basic" ? "/workspaces" : "/information"} passHref>
        <button>
          {title === "Basic" ? "Get Started" : "Start 7 day trial"}
        </button>
      </Link>
    </div>
  );
};

export default PricingCard;
