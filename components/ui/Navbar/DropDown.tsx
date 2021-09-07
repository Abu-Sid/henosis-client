import { motion } from "framer-motion";
import Link from "next/link";
import React, { useContext } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { DropdownContext, INav } from "./Navbar";

interface IDropdown {
  width: number;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownMenu: React.FC<IDropdown> = ({
  children,
  width,
  setIsOpen,
}) => {
  const { open, setOpen } = useContext(DropdownContext);
  const dropdownVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const closeDropdown = () => {
    if (setIsOpen === undefined) {
      setOpen(!open);
    } else {
      setIsOpen((preValue) => !preValue);
    }
  };

  const ref = useDetectClickOutside({ onTriggered: closeDropdown });
  return (
    <div ref={ref}>
      <motion.div
        exit={{ opacity: 0 }}
        initial="hidden"
        animate="visible"
        variants={dropdownVariant}
        style={{ width: `${width}px` }}
        className="dropdown"
      >
        {children}
      </motion.div>
    </div>
  );
};

export const DropdownItem: React.FC<INav> = ({
  children,
  href,
  functionality,
}) => {
  const { open, setOpen } = useContext(DropdownContext);
  const dropdownItemVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };
  const handleClick = () => {
    functionality();
  };
  return (
    <div className="dropdown__item">
      {!href && (
        <motion.a variants={dropdownItemVariant} onClick={handleClick}>
          {children}
        </motion.a>
      )}
      {href && (
        <Link href={href} passHref>
          <motion.a
            variants={dropdownItemVariant}
            onClick={() => setOpen(!open)}
          >
            {children}
          </motion.a>
        </Link>
      )}
    </div>
  );
};
