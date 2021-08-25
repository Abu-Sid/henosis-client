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
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const cardVariant = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };
  const popupVariant = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className='faq'>
      <div className='faq__banner'>
        <Image src={FAQBanner} alt='banner' />
      </div>
      <div className='faq__cards-container'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={containerVariant}
          className='faq-card'
        >
          <AnimatePresence>
            {selectedId === null && (
              <>
                {data.map((data) => (
                  <motion.div
                    className='faq-card__question'
                    initial='hidden'
                    animate='visible'
                    variants={cardVariant}
                    exit={{ opacity: 0, y: -100 }}
                    key={data.id}
                    onClick={() => setSelectedId(data.id)}
                  >
                    <h2>{data.question}</h2>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {selectedId && (
              <motion.div
                className='faq-card__answer'
                initial='hidden'
                animate='visible'
                exit={{
                  opacity: 0,
                  y: -100,
                }}
                variants={popupVariant}
              >
                <button onClick={() => setSelectedId(null)}>Close</button>
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
