import React from "react";
import SidebarContainer from "../../components/ui/Sidebar/SidebarContainer";
import SidebarItem from "../../components/ui/Sidebar/SidebarItem";
import Logo from "../../public/images/logo.svg";
const Settings = () => {
  return (
    <SidebarContainer>
      <SidebarItem icon={Logo} className='sidebar__logo' href='/' />
    </SidebarContainer>
  );
};

export default Settings;
