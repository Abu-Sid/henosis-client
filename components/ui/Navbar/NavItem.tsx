import React, { useContext } from "react";
import Link from "next/link";
import { useRoute } from "./Navbar";
import { DropdownContext } from "./Navbar";
import { INav } from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem: React.FC<INav> = ({ children, href, name, text, icon }) => {
  const path = useRoute();
  const [open, setOpen] = useContext(DropdownContext);

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
          <FontAwesomeIcon className='toggle-icon' icon={icon} />
        </button>
      )}
      {open && children}
    </li>
  );
};

export default NavItem;
