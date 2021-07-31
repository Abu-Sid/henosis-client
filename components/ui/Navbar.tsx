import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Logo from "./Logo";
import ProfilePicture from "../../public/images/icons/account-icon.svg";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const router = useRouter();
  const path = router.pathname;
  let visibility;
  if (path === "/dashboard") {
    visibility = { display: "none" };
  } else {
    visibility = { display: "flex" };
  }

  const { user } = useSelector((state: RootState) => state.userReducer);

  const options = [
    { value: "signin", label: "Sign In" },
    { value: "signup", label: "Sign up" },
  ];

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
      <NavItem>Mir hussain</NavItem>
    </Nav>
  );
};

const Nav = ({ children }) => {
  return (
    <nav>
      <ul>{children}</ul>
    </nav>
  );
};

const NavItem = ({ children }) => {
  return <li>{children}</li>;
};

export default Navbar;
