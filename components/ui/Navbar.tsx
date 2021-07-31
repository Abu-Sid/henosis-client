import React, { Children, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Logo from "./Logo";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

interface INav {
  children?: object | string;
  name?: string;
  text?: string;
  href?: string;
  icon?: any;
}

const Navbar = () => {
  const router = useRouter();
  const path = router.pathname;

  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    // <nav
    //   style={visibility}
    //   className={path === "/" ? "white-bg" : "colored-bg"}
    // >
    //   <Link href='/' passHref>
    //     <div className='logo'>
    //       <div className='logo__image'>
    //         <Logo color={path === "/" ? "white" : "color"} />
    //       </div>
    //       <h1 className={path === "/" ? "blue logo__text" : "white logo__text"}>
    //         Henosis
    //       </h1>
    //     </div>
    //   </Link>
    //   <ul>
    //     <li>
    //       <Link href='/features'>
    //         <a className={path === "/" ? "blue" : "white"}>Features</a>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href='/pricing'>
    //         <a className={path === "/" ? "blue" : "white"}>Pricing</a>
    //       </Link>
    //     </li>
    //     <li className={path === "/" ? "divider-blue" : "divider-white"}></li>
    //     <li>
    //       <Link href='/signin'>
    //         <a className={path === "/" ? "blue" : "white"}>Sign In</a>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href='/signup'>
    //         <a className={path === "/" ? "blue" : "white"}>Sign Up</a>
    //       </Link>
    //     </li>
    //     <li className='profile-picture'>
    //       <Image src={ProfilePicture} alt='profile-picture' />
    //     </li>
    //     <li className='username'>
    //       <p className={path === "/" ? "blue" : "white"}>My account</p>
    //     </li>
    //     <li className='selector'>
    //       <FontAwesomeIcon
    //         className={
    //           path === "/" ? "blue selector-icon" : "white selector-icon"
    //         }
    //         icon={faChevronDown}
    //       />
    //     </li>
    //   </ul>
    // </nav>
    <Nav>
      <NavItem name='Features' href='/features' />
      <NavItem name='Pricing' href='/pricing' />
      <li className={path === "/" ? "divider-blue" : "divider-white"}></li>
      <NavItem text='My Account' icon={faChevronDown}>
        <DropdownMenu>
          <DropdownItem href='/signup'>Sign Up</DropdownItem>
          <DropdownItem href='/signin'>Sign In</DropdownItem>
        </DropdownMenu>
      </NavItem>
    </Nav>
  );
};

const Nav = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;

  let visibility;
  if (path === "/dashboard") {
    visibility = { display: "none" };
  } else {
    visibility = { display: "flex" };
  }
  return (
    <nav
      style={visibility}
      className={path === "/" ? "white-bg" : "colored-bg"}
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
    </nav>
  );
};

const NavItem: React.FC<INav> = ({ children, href, name, text, icon }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  return (
    <li className={path === "/" ? "blue" : "white"}>
      <p className='username'>{text}</p>
      {href && (
        <Link href={href}>
          <a className={path === "/" ? "blue" : "white"}> {name} </a>
        </Link>
      )}
      {!href && (
        <button className='toggle-button' onClick={() => setOpen(!open)}>
          <FontAwesomeIcon icon={icon} />
        </button>
      )}
      {open && children}
    </li>
  );
};

const DropdownMenu = ({ children }) => {
  return <div className='dropdown'>{children}</div>;
};

const DropdownItem: React.FC<INav> = ({ children, href }) => {
  return (
    <div className='dropdown__item'>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </div>
  );
};

export default Navbar;
