import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useContext } from "react";
import { DropdownContext, INav, useRoute } from "./Navbar";

const NavItem: React.FC<INav> = ({ children, href, name, text, icon }) => {
  const path = useRoute();
  const { open, setOpen } = useContext(DropdownContext);

  return (
    <li className={path === "/" ? "blue" : "white"}>
      {href && (
        <Link href={href}>
          <a className={path === "/" ? "blue" : "white"}> {name} </a>
        </Link>
      )}
      {!href && (
        <button
          className={
            path === "/" ? "blue toggle-button" : "white toggle-button"
          }
          onClick={() => setOpen(!open)}
        >
          <p>{text}</p>
          <FontAwesomeIcon className="toggle-icon" icon={icon} />
        </button>
      )}
      <AnimatePresence>{open && children}</AnimatePresence>
    </li>
  );
};

export default NavItem;
