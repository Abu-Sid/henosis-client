import React from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

const Test = () => {
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    initial: {
      x: 200,
    },
    animate: {
      x: 0,
    },
  };
  return (
    <motion.div
      variants={stagger}
      animate='animate'
      initial='initial'
      className='test-container'
    >
      <motion.div variants={item} className='test-item'>
        Mir
      </motion.div>
      <motion.div variants={item} className='test-item'>
        Mir
      </motion.div>
      <motion.div variants={item} className='test-item'>
        Mir
      </motion.div>
      <motion.div variants={item} className='test-item'>
        Mir
      </motion.div>
    </motion.div>
  );
};

export default Test;
