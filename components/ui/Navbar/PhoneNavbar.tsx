import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../auth/authManager";
import { authUserLogout } from "../../../redux/actions/userActions";
import { RootState } from "../../../redux/reducers";
import { DropdownItem, DropdownMenu } from "./DropDown";
import Nav from "./Nav";
import { UserContext } from "./Navbar";
import NavItem from "./NavItem";

const PhoneNavbar = () => {
  const { username, admin } = useContext(UserContext);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authUserLogout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Nav className='phone-navbar'>
      <NavItem icon={faBars as IconProp}>
        <DropdownMenu width={250}>
          <DropdownItem href='/features'>Features</DropdownItem>
          <DropdownItem href='/pricing'>Pricing</DropdownItem>
          {admin && (
            <DropdownItem name='Admin' href='/dashboard/admins'>
              Admin
            </DropdownItem>
          )}
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

export default PhoneNavbar;
