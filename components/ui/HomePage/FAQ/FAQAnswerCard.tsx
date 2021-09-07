import { motion, useAnimation } from "framer-motion";
import React from "react";

interface IAnswer {
  answer: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const FAQAnswerCard: React.FC<IAnswer> = ({ answer, setSelectedId }) => {
  const control = useAnimation();
  console.log(answer);
  const popupVariant = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className="faq-card__answer"
      initial="hidden"
      animate="visible"
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
          viewBox="0 0 130 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="65" cy="65" r="65" fill="#E6E8EA" />
          <path
            d="M29.1445 30.1521L100.856 99.8481"
            stroke="#171E3C"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M99.8481 29.1445L30.1522 100.856"
            stroke="#171E3C"
            strokeWidth="15"
            strokeLinecap="round"
          />
        </motion.svg>
      </motion.button>
      <p>{answer}</p>
    </motion.div>
  );
};

export default FAQAnswerCard;
