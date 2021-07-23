import React from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "../../public/images/Logo.png";

const Navbar = () => {
  return (
    <nav>
      <Link href='/' passHref>
        <div className='logo'>
          <div className='logo__image'>
            <Image src={logo} alt='logo' layout='fill' objectFit='contain' />
          </div>
          <h1 className='logo__text'>Henosis</h1>
        </div>
      </Link>
      <ul>
        <li>
          <Link href='/features'>Features</Link>
        </li>
        <li>
          <Link href='/pricing'>Pricing</Link>
        </li>
        <li>
          <Link href='/signin'>Sign In</Link>
        </li>
        <li>
          <Link href='/signup'>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
