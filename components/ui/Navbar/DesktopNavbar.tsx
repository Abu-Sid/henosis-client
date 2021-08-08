import React, { createContext } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import { logout } from "../../../auth/authManager";
import { useDispatch } from "react-redux";
import { authUserLogout } from "../../../redux/actions/userActions";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Nav from "./Nav";
import NavItem from "./NavItem";
import { DropdownMenu, DropdownItem } from "./DropDown";
export const DropdownContext = createContext([]);

export interface INav {
  children?: object | string;
  name?: string;
  text?: string;
  href?: string;
  icon?: any;
  functionality?: () => void;
}

export const useRoute = () => {
  const router = useRouter();
  return router.pathname;
};

const DesktopNavbar = () => {
  const dispatch = useDispatch();
  const path = useRoute();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const username = user?.name;

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authUserLogout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Nav className='desktop-navbar'>
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
            <DropdownItem href='/workspaces'>Existing workspaces</DropdownItem>
          )}
          {username && (
            <DropdownItem functionality={handleLogout}>Log out</DropdownItem>
          )}
        </DropdownMenu>
      </NavItem>
    </Nav>
  );
};

export default DesktopNavbar;