import React, { useEffect, useState } from "react";
import Admin from "../../public/images/icons/admins.svg";
import Logout from "../../public/images/icons/logout.svg";
import Users from "../../public/images/icons/user.svg";
import Workspaces from "../../public/images/icons/workspaces.svg";
import Logo from "../../public/images/logo.svg";
import SidebarContainer from "../ui/Sidebar/SidebarContainer";
import SidebarItem from "../ui/Sidebar/SidebarItem";

const AdminSidebar = () => {
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const currentScreenSize = window.innerWidth;
    setScreenSize(currentScreenSize);
  }, []);

  return (
    <SidebarContainer device={screenSize < 651 ? "phone" : "desktop"}>
      <SidebarItem
        icon={Logo}
        className="sidebar__logo"
        href="/"
        device={screenSize < 651 ? "phone" : "desktop"}
      />
      <SidebarItem
        icon={Admin}
        pathName="/dashboard"
        href="admins"
        tooltip="Admins"
        device={screenSize < 651 ? "phone" : "desktop"}
        routeName="Admins"
      />
      <SidebarItem
        icon={Users}
        pathName="/dashboard"
        href="all_signup_users"
        tooltip="Users"
        device={screenSize < 651 ? "phone" : "desktop"}
        routeName="All users"
      />
      <SidebarItem
        icon={Workspaces}
        pathName="/dashboard"
        href="workspaces"
        tooltip="Workspaces"
        device={screenSize < 651 ? "phone" : "desktop"}
        routeName="Workspaces"
      />
      <SidebarItem
        icon={Logout}
        className="sidebar__logout"
        tooltip="Logout"
        device={screenSize < 651 ? "phone" : "desktop"}
        routeName="Logout"
      />
    </SidebarContainer>
  );
};

export default AdminSidebar;
