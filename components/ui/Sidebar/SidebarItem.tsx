import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
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
  const control = useAnimation();
  const variants = {
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
      onMouseEnter={() => {
        control.start({
          opacity: 1,
          x: 0,
          display: "inline-block",
        });
      }}
      onMouseLeave={() => {
        control.start({
          opacity: 0,
          x: -50,
          display: "none",
        });
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
      {tooltip && (
        <Link href={`${pathName}/${href}`} passHref>
          <motion.span
            initial='hidden'
            animate={control}
            variants={variants}
            className='tooltip'
          >
            {tooltip}
          </motion.span>
        </Link>
      )}
    </motion.li>
  );
};

export default SidebarItem;
