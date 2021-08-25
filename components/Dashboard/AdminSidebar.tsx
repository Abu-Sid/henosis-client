import React from "react";
import Admin from "../../public/images/icons/admins.svg";
import Logout from "../../public/images/icons/logout.svg";
import Users from "../../public/images/icons/user.svg";
import Workspaces from "../../public/images/icons/workspaces.svg";
import Logo from "../../public/images/logo.svg";
import SidebarContainer from "../ui/Sidebar/SidebarContainer";
import SidebarItem from "../ui/Sidebar/SidebarItem";

const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem icon={Logo} className="sidebar__logo" href="/" />
      <SidebarItem
        icon={Admin}
        pathName="/dashboard"
        href="admins"
        tooltip="Admins"
      />
      <SidebarItem
        icon={Users}
        pathName="/dashboard"
        href="all_signup_users"
        tooltip="Users"
      />
      <SidebarItem
        icon={Workspaces}
        pathName="/dashboard"
        href="workspaces"
        tooltip="Workspaces"
      />
      <SidebarItem icon={Logout} className="sidebar__logout" tooltip="Logout" />
    </SidebarContainer>
  );
};

export default AdminSidebar;
