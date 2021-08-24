import React from "react";
import Image from "next/image";
import FAQBanner from "../../../public/images/banner.png";

const FAQ = () => {
  return (
    <section className='faq'>
      <div className='faq__banner'>
        <Image src={FAQBanner} alt='banner' />
      </div>
      <div className='faq__cards-container'></div>
    </section>
  );
};

export default FAQ;
