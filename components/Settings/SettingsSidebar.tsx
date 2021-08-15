import React from "react";
import SidebarContainer from "../ui/Sidebar/SidebarContainer";
import SidebarItem from "../ui/Sidebar/SidebarItem";
import Logo from "../../public/images/logo.svg";
import Profile from "../../public/images/icons/emoji-happy.svg";
import Account from "../../public/images/icons/user-circle.svg";
import Customization from "../../public/images/icons/settings.svg";
import Billing from "../../public/images/icons/credit-card.svg";
import Logout from "../../public/images/icons/logout.svg";

const SettingsSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarItem icon={Logo} className='sidebar__logo' href='/' />
      <SidebarItem icon={Profile} pathName='/settings' href='profile' />
      <SidebarItem icon={Account} pathName='/settings' href='account' />
      <SidebarItem
        icon={Customization}
        pathName='/settings'
        href='/customization'
      />
      <SidebarItem icon={Billing} pathName='/settings' href='billing' />
      <SidebarItem icon={Logout} className='sidebar__logout' />
    </SidebarContainer>
  );
};

export default SettingsSidebar;
