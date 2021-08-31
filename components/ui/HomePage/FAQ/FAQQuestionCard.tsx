import { motion } from "framer-motion";
import React from "react";

interface IQuestion {
  id: string;
  question: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const FAQQuestionCard: React.FC<IQuestion> = ({
  id,
  question,
  setSelectedId,
}) => {
  const cardVariant = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className="faq-card__question"
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      variants={cardVariant}
      exit={{ opacity: 0, y: -100 }}
      onClick={() => setSelectedId(id)}
    >
      <motion.div>
        <p>{question}</p>
        <div className="down-indicator">
          <svg
            width="20"
            height="10"
            viewBox="0 0 116 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8L58 36.4672L108 8"
              stroke="#171E3C"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQQuestionCard;
