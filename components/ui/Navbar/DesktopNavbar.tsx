import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../auth/authManager";
import { authUserLogout } from "../../../redux/actions/userActions";
import { RootState } from "../../../redux/reducers";
import { DropdownItem, DropdownMenu } from "./DropDown";
import Nav from "./Nav";
import NavItem from "./NavItem";

export const DropdownContext = createContext([]);

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
  const dispatch = useDispatch();
  const path = useRoute();
  const [admins, setAdmins] = useState([]);

  const { user } = useSelector((state: RootState) => state.userReducer);
  console.log(user);
  const username = user?.name;
  const email = user?.email;
  const admin = admins.find((admin) => admin.email === email);

  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/admin")
      .then((res) => res.json())
      .then((data) => setAdmins(data.data));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(authUserLogout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Nav className="desktop-navbar">
      <NavItem name="Features" href="/features" />
      <NavItem name="Pricing" href="/pricing" />
      {admin && <NavItem name="Admin" href="/dashboard/admins" />}
      <li className={path === "/" ? "divider-blue" : "divider-white"}></li>
      <NavItem
        text={username ? username : "My account"}
        icon={faChevronDown as IconProp}
      >
        <DropdownMenu>
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

export default DesktopNavbar;
