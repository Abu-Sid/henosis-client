import React from "react";
import SidebarContainer from "../Sidebar/SidebarContainer";
import SidebarItem from "../Sidebar/SidebarItem";
import Logo from "../../../public/images/logo.svg";
import Users from "../../../public/images/icons/user.svg";
import Admin from "../../../public/images/icons/admins.svg";
import Logout from "../../../public/images/icons/logout.svg";
import Workspaces from "../../../public/images/icons/workspaces.svg";
import dashboard from "../../../pages/dashboard";

const AdminSidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem icon={Logo} className='sidebar__logo' href='/' />
      <SidebarItem icon={Admin} pathName='/dashboard' href='admins' />
      <SidebarItem icon={Users} pathName='/dashboard' href='all_signup_users' />
      <SidebarItem icon={Workspaces} pathName='/dashboard' href='workspaces' />
      <SidebarItem icon={Logout} className='sidebar__logout' />
    </SidebarContainer>
  );
};

export default AdminSidebar;
