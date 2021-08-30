import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();
  const tooltipVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
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
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setShowTooltip(false);
      }}
      className={className}
    >
      {href && (
        <Link href={href === "/" ? "/" : `${pathName}/${href}`} passHref>
          <a>
            <Image src={icon} alt="icon" />
          </a>
        </Link>
      )}
      {className === "sidebar__logout" && (
        <button onClick={handleLogoutClick}>
          <Image src={icon} alt="icon" />
        </button>
      )}
      {tooltip && (
        <Link href={`${pathName}/${href}`} passHref>
          <AnimatePresence>
            {showTooltip && (
              <motion.span
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -50 }}
                variants={tooltipVariant}
                className="tooltip"
              >
                {tooltip}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      )}
    </motion.li>
  );
};

export default SidebarItem;
