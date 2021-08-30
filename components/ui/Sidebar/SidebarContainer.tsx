import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ISidebarContainer {
  device: string;
  children: React.ReactNode;
}

const SidebarContainer: React.FC<ISidebarContainer> = ({
  children,
  device,
}) => {
  const [hide, setHide] = useState(true);

  const sidebarVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const exit = { opacity: 0 };
  return (
    <>
      <AnimatePresence>
        {hide && device === "phone" && (
          <motion.button
            className='sidebar-toggle-button__show'
            onClick={() => setHide(false)}
            variants={sidebarVariant}
            initial='hidden'
            animate='visible'
            exit={exit}
          >
            <svg
              width='20'
              height='46'
              viewBox='0 0 116 46'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 8L58 36.4672L108 8'
                stroke='#f0f1f5'
                strokeWidth='15'
                strokeLinecap='round'
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!hide && device === "phone" && (
          <motion.div
            className='phone-sidebar-container'
            variants={sidebarVariant}
            initial='hidden'
            animate='visible'
            exit={exit}
          >
            <div className='phone-sidebar'>
              <ul>{children}</ul>
            </div>
            <button
              className='sidebar-toggle-button__hide'
              onClick={() => setHide(true)}
            >
              <svg
                width='20'
                height='46'
                viewBox='0 0 116 46'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8 8L58 36.4672L108 8'
                  stroke='#f0f1f5'
                  strokeWidth='15'
                  strokeLinecap='round'
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {device === "desktop" && (
        <div className='sidebar-container'>
          <div className='sidebar'>
            <ul>{children}</ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarContainer;
