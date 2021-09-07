import Link from "next/link";
import React from "react";
import Logo from "../Logo";
import { motion } from "framer-motion";
import { INav, useRoute } from "./Navbar";

const Nav: React.FC<INav> = ({ children, className }) => {
  const path = useRoute();

  let color: string;
  console.log("color:", color);
  if (path === "/") {
    color = "white-bg";
  } else {
    color = "colored-bg";
  }
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${color} ${className}`}
    >
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
    </motion.nav>
  );
};

export default Nav;
