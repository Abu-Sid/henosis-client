import React from "react";
import Image from "next/image";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import FAQBanner from "../../../public/images/banner.png";
import { useState } from "react";
import FAQData from "../../../data/FAQData.json";

const FAQ = () => {
  const [selectedId, setSelectedId] = useState(null);
  console.log(selectedId);
  const data = FAQData.FAQ;
  const answer = data?.find((data) => data.id === selectedId)?.answer;
  console.log(answer);
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
          {selectedId && (
            <motion.div className='faq-card__answer'>
              <button onClick={() => setSelectedId(null)}>Close</button>
              <p>{answer}</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
