import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FAQData from "../../../../data/FAQData.json";
import FAQQuestionCard from "./FAQQuestionCard";
import FAQAnswerCard from "./FAQAnswerCard";
import FAQBanner from "./FAQBanner";

const FAQ = () => {
  const [selectedId, setSelectedId] = useState(null);
  const data = FAQData.FAQ;
  const answer = data?.find((data) => data.id === selectedId)?.answer;
  return (
    <section className='faq-section'>
      <h1>
        Some <span>F</span>requently <span>A</span>sked <span>Q</span>uestions
      </h1>
      <div className='faq'>
        <div className='faq__banner'>
          <FAQBanner />
        </div>
        <div className='faq__cards-container'>
          <motion.div className='faq-card'>
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
