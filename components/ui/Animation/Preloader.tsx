import React from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  const fillVariant = {
    notFilled: { fill: "#ffffff" },
    filled: {
      fill: "#171e3c",
      transition: {
        delay: 2,
        ease: "easeInOut",
      },
    },
  };
  const pathVariant = {
    hidden: { pathLength: 0 },
    animationOne: {
      pathLength: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    animationTwo: {
      pathLength: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    animationThree: {
      pathLength: 1,
      transition: {
        delay: 1,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    animationFour: {
      pathLength: 1,
      transition: {
        delay: 1.5,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div exit={{ opacity: 0 }} className='loading'>
      <motion.svg
        initial='notFilled'
        animate='filled'
        variants={fillVariant}
        width='420'
        height='119'
        viewBox='0 0 420 119'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g id='logo-outline'>
          <motion.path
            initial='hidden'
            animate='animationTwo'
            // animate='animationOne'
            variants={pathVariant}
            id='top'
            d='M224.771 1.5H254.095L225.684 24.9943L224.286 26.1503L225.684 27.3062L248.834 46.45L249.79 47.2406L250.746 46.4499L305.092 1.5H334.425L249.79 71.4904L194.963 26.1503L224.771 1.5Z'
            stroke='#171E3C'
            strokeWidth='3'
          />
          <motion.path
            initial='hidden'
            animate='animationThree'
            // animate='animationOne'
            variants={pathVariant}
            id='bottom'
            d='M194.152 117.5H164.819L193.221 94.0133L194.619 92.8574L193.221 91.7014L170.08 72.5649L169.124 71.7745L168.168 72.5648L113.822 117.5H84.4979L169.124 47.5173L223.951 92.8574L194.152 117.5Z'
            stroke='#171E3C'
            strokeWidth='3'
          />
          <motion.path
            initial='hidden'
            animate='animationFour'
            // animate='animationOne'
            variants={pathVariant}
            id='left'
            d='M385.722 1.5H415.064L274.782 117.501H245.458L385.722 1.5Z'
            stroke='#171E3C'
            strokeWidth='3'
          />
          <motion.path
            initial='hidden'
            animate='animationOne'
            variants={pathVariant}
            id='right'
            d='M144.44 1.5H173.773L33.5003 117.501H4.1676L144.44 1.5Z'
            stroke='#171E3C'
            strokeWidth='3'
          />
        </g>
      </motion.svg>
    </motion.div>
  );
};

export default Preloader;
