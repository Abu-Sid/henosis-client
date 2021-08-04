import Link from "next/link";
import React from "react";
import BusinessIcon from "./BusinessIcon";
import PersonalIcon from "./PersonalIcon";

interface IProps {
  handleCategory: (category: string) => void;
}

const SelectCategory = ({ handleCategory }: IProps) => {
  return (
    <div className="workspace-select-category">
      <div className="workspace-select-category-option">
        <PersonalIcon />
        <button onClick={() => handleCategory("personal")}>Personal Use</button>
      </div>
      <div className="workspace-select-category-option">
        <BusinessIcon />
        <Link passHref href="/pricing">
          <button>Business Use</button>
        </Link>
      </div>
    </div>
  );
};

export default SelectCategory;
