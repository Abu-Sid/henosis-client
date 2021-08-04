import React, { useState, createContext } from "react";
import { useRouter } from "next/router";
import DesktopNavbar from "./DesktopNavbar";

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

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={[open, setOpen]}>
      <DesktopNavbar />
    </DropdownContext.Provider>
  );
};

export default Navbar;
