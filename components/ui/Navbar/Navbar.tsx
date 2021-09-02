import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers";
import DesktopNavbar from "./DesktopNavbar";
import PhoneNavbar from "./PhoneNavbar";

interface IDropdownContext {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  username?: string;
  admin?: string;
}

interface IUserContext {
  username?: string;
  admin?: string;
}

export interface INav {
  children?: object | string;
  className?: string;
  id?: string;
  name?: string;
  text?: string;
  href?: string;
  icon?: IconProp;
  functionality?: () => void;
}

export const DropdownContext = createContext<IDropdownContext>({});
export const UserContext = createContext<IUserContext>({});

export const useRoute = () => {
  const router = useRouter();
  return router.pathname;
};

const Navbar = () => {
  const [admins, setAdmins] = useState([]);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const username = user?.name;
  const email = user?.email;
  const admin = admins.find((admin) => admin.email === email);

  useEffect(() => {
    fetch("https://intense-peak-24388.herokuapp.com/admin")
      .then((res) => res.json())
      .then((data) => setAdmins(data.data));
  }, []);

  const [open, setOpen] = useState(false);

  const dropdownValue = {
    open,
    setOpen,
  };

  const userValue = {
    username,
    admin,
  };
  return (
    <UserContext.Provider value={userValue}>
      <DropdownContext.Provider value={dropdownValue}>
        <DesktopNavbar />
        <PhoneNavbar />
      </DropdownContext.Provider>
    </UserContext.Provider>
  );
};

export default Navbar;
