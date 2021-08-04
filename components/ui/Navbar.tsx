import React, {
  Children,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Logo from "./Logo";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../auth/authManager";
import { useDispatch } from "react-redux";
import { authUserLogout } from "../../redux/actions/userActions";

export const DropdownContext = createContext([]);

interface INav {
  children?: object | string;
  name?: string;
  text?: string;
  href?: string;
  icon?: any;
  functionality?: () => void;
}

const useRoute = () => {
  const router = useRouter();
  return router.pathname;
};

const Navbar = () => {
  const dispatch = useDispatch();
  const path = useRoute();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const username = user?.name;

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authUserLogout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownContext.Provider value={[open, setOpen]}>
      <Nav>
        <NavItem name='Features' href='/features' />
        <NavItem name='Pricing' href='/pricing' />
        <li className={path === "/" ? "divider-blue" : "divider-white"}></li>
        <NavItem text={username ? username : "My account"} icon={faChevronDown}>
          <DropdownMenu>
            {!username && <DropdownItem href='/signup'>Sign Up</DropdownItem>}
            {!username && <DropdownItem href='/signin'>Sign In</DropdownItem>}
            {username && (
              <DropdownItem href='/new-workspace'>
                Create new workspace
              </DropdownItem>
            )}
            {username && (
              <DropdownItem href='/workspaces'>
                Existing workspaces
              </DropdownItem>
            )}
            {username && (
              <DropdownItem functionality={handleLogout}>Log out</DropdownItem>
            )}
          </DropdownMenu>
        </NavItem>
      </Nav>
    </DropdownContext.Provider>
  );
};

const Nav = ({ children }) => {
  const path = useRoute();

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

const DropdownMenu = ({ children }) => {
  return <div className='dropdown'>{children}</div>;
};

const DropdownItem: React.FC<INav> = ({ children, href, functionality }) => {
  const [open, setOpen] = useContext(DropdownContext);

  const handleClick = () => {
    functionality();
    setOpen(!open);
  };
  return (
    <div className='dropdown__item'>
      {!href && <a onClick={handleClick}>{children}</a>}
      {href && (
        <Link href={href}>
          <a onClick={() => setOpen(!open)}>{children}</a>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
