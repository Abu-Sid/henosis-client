import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface IProps {
  icon: StaticImageData;
  className?: string;
  href?: string;
  tooltip?: string;
  pathName?: string;
}

const SidebarItem: React.FC<IProps> = ({
  icon,
  className,
  href,
  tooltip,
  pathName,
}) => {
  const [visible, setVisible] = useState(false);
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };
  return (
    <motion.li
      onHoverStart={() => {
        setVisible(!visible);
      }}
      onHoverEnd={() => {
        setVisible(!visible);
      }}
      className={className}
    >
      <Link href={href === "/" ? "/" : `${pathName}/${href}`}>
        <a>
          <Image src={icon} alt='user-icon' />
        </a>
      </Link>
      {tooltip && visible && (
        <motion.span
          initial='hidden'
          animate='visible'
          variants={variants}
          className='tooltip'
        >
          {tooltip}
        </motion.span>
      )}
    </motion.li>
  );
};

export default SidebarItem;
