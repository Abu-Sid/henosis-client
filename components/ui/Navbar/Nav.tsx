import React from "react";
import Link from "next/link";
import { useRoute } from "./Navbar";
import Logo from "../Logo";
import { INav } from "./Navbar";

const Nav: React.FC<INav> = ({ children, className }) => {
  const path = useRoute();

  let color;
  if (path === "/") {
    color = "white-bg";
  } else {
    color = "colored-bg";
  }
  return (
    <nav className={`${color} ${className}`}>
      <Link href='/' passHref>
        <div className='logo'>
          <div className='logo__image'>
            <Logo color={path === "/" ? "white" : "color"} />
          </div>
          <h1 className={path === "/" ? "blue logo__text" : "white logo__text"}>
            Henosis
          </h1>
        </div>
      </Link>
      <ul>{children}</ul>
    </nav>
  );
};

export default Nav;
