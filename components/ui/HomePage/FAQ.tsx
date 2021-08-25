import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FAQBanner from "../../../public/images/banner.png";
import { useState } from "react";
import FAQData from "../../../data/FAQData.json";

const FAQ = () => {
  const [selectedId, setSelectedId] = useState(null);
  const data = FAQData.FAQ;
  const answer = data?.find((data) => data.id === selectedId)?.answer;
  const popupVariant = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
      },
    },
  };
  return (
    <section className='faq'>
      <div className='faq__banner'>
        <Image src={FAQBanner} alt='banner' />
      </div>
      <div className='faq__cards-container'>
        <div className='faq-card'>
          {data.map((data) => (
            <motion.div className='faq-card__question' key={data.id}>
              <motion.div onClick={() => setSelectedId(data.id)}>
                <h2>{data.question}</h2>
              </motion.div>
            </motion.div>
          ))}
          <AnimatePresence>
            {selectedId && (
              <motion.div
                className='faq-card__answer'
                initial='hidden'
                animate='visible'
                exit={{ opacity: 0 }}
                variants={popupVariant}
              >
                <button onClick={() => setSelectedId(null)}>Close</button>
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
