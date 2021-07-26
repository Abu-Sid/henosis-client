import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logo from "../../public/images/logo.svg";
import Logo from "./Logo";

const Navbar = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <nav className={path === "/" ? "white" : "color"}>
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
      <ul>
        <li>
          <Link href='/features'>
            <a className={path === "/" ? "blue" : "white"}>Features</a>
          </Link>
        </li>
        <li>
          <Link href='/pricing'>
            <a className={path === "/" ? "blue" : "white"}>Pricing</a>
          </Link>
        </li>
        <li>
          <Link href='/signin'>
            <a className={path === "/" ? "blue" : "white"}>Sign In</a>
          </Link>
        </li>
        <li>
          <Link href='/signup'>
            <a className={path === "/" ? "blue" : "white"}>Sign Up</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
