import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";
import React, { createContext, useState } from "react";
import DesktopNavbar from "./DesktopNavbar";
import PhoneNavbar from "./PhoneNavbar";

export const DropdownContext = createContext([]);

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

export const useRoute = () => {
  const router = useRouter();
  return router.pathname;
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={[open, setOpen]}>
      <DesktopNavbar />
      <PhoneNavbar />
    </DropdownContext.Provider>
  );
};

export default Navbar;
