import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../auth/authManager";
import { authUserLogout } from "../../../redux/actions/userActions";
import { RootState } from "../../../redux/reducers";
import { DropdownItem, DropdownMenu } from "./DropDown";
import Nav from "./Nav";
import { useRoute } from "./Navbar";
import NavItem from "./NavItem";

const PhoneNavbar = () => {
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
    <Nav className="phone-navbar">
      <NavItem icon={faBars as IconProp}>
        <DropdownMenu>
          <DropdownItem href="/features">Features</DropdownItem>
          <DropdownItem href="/pricing">Pricing</DropdownItem>
          {!username && <DropdownItem href="/signup">Sign Up</DropdownItem>}
          {!username && <DropdownItem href="/signin">Sign In</DropdownItem>}
          {username && (
            <DropdownItem href="/new-workspace">
              Create new workspace
            </DropdownItem>
          )}
          {username && (
            <DropdownItem href="/workspaces">Existing workspaces</DropdownItem>
          )}
          {username && (
            <DropdownItem functionality={handleLogout}>Log out</DropdownItem>
          )}
        </DropdownMenu>
      </NavItem>
    </Nav>
  );
};

export default PhoneNavbar;
