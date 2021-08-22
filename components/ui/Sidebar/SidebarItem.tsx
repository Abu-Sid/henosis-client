import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { logout } from "../../../auth/authManager";
import { authUserLogout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const variants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -50 },
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      dispatch(authUserLogout());
    } catch (error) {
      console.log(error);
    }
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
      {href && (
        <Link href={href === "/" ? "/" : `${pathName}/${href}`}>
          <a>
            <Image src={icon} alt='icon' />
          </a>
        </Link>
      )}
      {className === "sidebar__logout" && (
        <button onClick={handleLogoutClick}>
          <Image src={icon} alt='icon' />
        </button>
      )}
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
