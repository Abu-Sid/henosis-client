import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../auth/authManager";
import { authUserLogout } from "../../../redux/actions/userActions";

interface IProps {
  icon: StaticImageData;
  className?: string;
  href?: string;
  tooltip?: string;
  pathName?: string;
  device: string;
  routeName?: string;
  replace?: boolean;
}

const SidebarItem: React.FC<IProps> = ({
  icon,
  className,
  href,
  tooltip,
  pathName,
  device,
  routeName,
  replace,
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

  const router = useRouter();
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
      {className === "sidebar__logo" && href === "/" && (
        <Link href="/" passHref>
          <a>
            {device === "phone" && (
              <Image src={icon} width={60} height={20} alt="icon" />
            )}
            {device === "desktop" && <Image src={icon} alt="icon" />}
            {device === "phone" && <p className="route-name">{routeName}</p>}
          </a>
        </Link>
      )}
      {replace && (
        <a onClick={() => router.replace(`${href}`)}>
          <Image src={icon} alt="icon" />
          {device === "phone" && <p className="route-name">{routeName}</p>}
        </a>
      )}
      {href && !replace && href !== "/" && (
        <Link href={`${pathName}/${href}`} passHref>
          <a>
            <Image src={icon} alt="icon" />
            {device === "phone" && <p className="route-name">{routeName}</p>}
          </a>
        </Link>
      )}
      {className === "sidebar__logout" && (
        <button onClick={handleLogoutClick}>
          <Image src={icon} alt="icon" />
          {device === "phone" && <p className="route-name">{routeName}</p>}
        </button>
      )}
      {tooltip && device === "desktop" && (
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
