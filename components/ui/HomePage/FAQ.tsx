import React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import FAQBanner from "../../../public/images/banner.png";
import { useState } from "react";
import FAQData from "../../../data/FAQData.json";

const FAQ = () => {
  const [selectedId, setSelectedId] = useState(null);
  const data = FAQData.FAQ;
  const answer = data?.find((data) => data.id === selectedId)?.answer;

  const control = useAnimation();
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
                    <motion.div>
                      <p>{data.question}</p>
                      <div className='down-indicator'>
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
                            strokeWidth='10'
                            strokeLinecap='round'
                          />
                        </svg>
                      </div>
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
                <motion.button
                  onHoverStart={() => {
                    control.start({
                      width: 25,
                      height: 25,
                    });
                  }}
                  onHoverEnd={() => {
                    control.start({
                      width: 20,
                      height: 20,
                    });
                  }}
                  onTapStart={() => {
                    control.start({
                      width: 20,
                      height: 20,
                    });
                  }}
                  onClick={() => setSelectedId(null)}
                >
                  <motion.svg
                    initial={{ width: 20, height: 20 }}
                    animate={control}
                    viewBox='0 0 130 130'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='65' cy='65' r='65' fill='#E6E8EA' />
                    <path
                      d='M29.1445 30.1521L100.856 99.8481'
                      stroke='#171E3C'
                      strokeWidth='15'
                      strokeLinecap='round'
                    />
                    <path
                      d='M99.8481 29.1445L30.1522 100.856'
                      stroke='#171E3C'
                      strokeWidth='15'
                      strokeLinecap='round'
                    />
                  </motion.svg>
                </motion.button>
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
