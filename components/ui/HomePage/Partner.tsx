import React, { useState } from "react";
import { useEffect } from "react";
import PartnerData from "../../../data/PartnerData.json";

const Partner: React.FC = () => {
  const data = PartnerData.partners;
  return (
    <div className='partner'>
      <h1>Trusted by companies from all corners of the world</h1>
      <div className='partner__image'>
        <div className='partner__image__logo'>
          {data &&
            data?.map((p) => <img key={p.name} src={p.image} alt={p.name} />)}
        </div>
      </div>
    </div>
  );
};

export default Partner;
