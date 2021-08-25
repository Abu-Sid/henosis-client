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
  // const containerVariant = {
  //   hidden: { opacity: 0, y: -100 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: 0.5,
  //       when: "beforeChildren",
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };
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
          // initial='hidden'
          // animate='visible'
          // variants={containerVariant}
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
                    whileHover={{ scale: 1.05 }}
                    variants={cardVariant}
                    exit={{ opacity: 0, y: -100 }}
                    key={data.id}
                    onClick={() => setSelectedId(data.id)}
                  >
                    <h2>{data.question}</h2>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='down-indicator'
                    >
                      <svg
                        width='20'
                        height='10'
                        viewBox='0 0 116 46'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M8 8L58 36.4672L108 8'
                          stroke='#171E3C'
                          strokeWidth='15'
                          strokeLinecap='round'
                        />
                      </svg>
                    </motion.div>
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
