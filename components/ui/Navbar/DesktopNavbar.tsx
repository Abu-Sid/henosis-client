import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../auth/authManager";
import { authUserLogout } from "../../../redux/actions/userActions";
import { DropdownItem, DropdownMenu } from "./DropDown";
import { UserContext } from "./Navbar";
import Nav from "./Nav";
import NavItem from "./NavItem";

export interface INav {
  children?: object | string;
  name?: string;
  text?: string;
  href?: string;
  icon?: IconProp;
  functionality?: () => void;
}

export const useRoute = () => {
  const router = useRouter();
  return router.pathname;
};

const DesktopNavbar = () => {
  const { admin, username } = useContext(UserContext);

  const dispatch = useDispatch();
  const path = useRoute();

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
      {admin && <NavItem name='Admin' href='/dashboard/admins' />}
      <li className={path === "/" ? "divider-blue" : "divider-white"}></li>
      <NavItem
        text={username ? username : "My account"}
        icon={faChevronDown as IconProp}
      >
        <DropdownMenu width={250}>
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
          {username && <DropdownItem href='/settings'>Settings</DropdownItem>}
          {username && (
            <DropdownItem functionality={handleLogout}>Log out</DropdownItem>
          )}
        </DropdownMenu>
      </NavItem>
    </Nav>
  );
};

export default DesktopNavbar;
