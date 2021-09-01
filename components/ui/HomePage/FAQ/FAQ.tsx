import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import FAQData from "../../../../data/FAQData.json";
import FAQAnswerCard from "./FAQAnswerCard";
import FAQBanner from "./FAQBanner";
import FAQQuestionCard from "./FAQQuestionCard";

const FAQ = () => {
  const [selectedId, setSelectedId] = useState(null);
  const data = FAQData.FAQ;
  const answer = data?.find((data) => data.id === selectedId)?.answer;

  const cardContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <section className="faq-section">
      <h1 data-aos="fade-zoom-in">
        Some{" "}
        <span data-aos="fade-down" data-aos-duration="200" data-aos-delay="400">
          F
        </span>
        requently{" "}
        <span data-aos="fade-down" data-aos-duration="300" data-aos-delay="500">
          A
        </span>
        sked{" "}
        <span data-aos="fade-down" data-aos-duration="400" data-aos-delay="600">
          Q
        </span>
        uestions
      </h1>
      <div className="faq">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="faq__banner"
        >
          <FAQBanner />
        </div>
        <div className="faq__cards-container">
          <motion.div
            variants={cardContainerVariant}
            initial="hidden"
            animate="visible"
            className="faq-card"
          >
            <AnimatePresence>
              {selectedId === null && (
                <>
                  {data.map((data) => (
                    <FAQQuestionCard
                      key={data.id}
                      id={data.id}
                      question={data.question}
                      setSelectedId={setSelectedId}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedId && (
                <FAQAnswerCard answer={answer} setSelectedId={setSelectedId} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
