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
      <SidebarItem icon={Logo} className="sidebar__logo" href="/" />
      <SidebarItem
        icon={Profile}
        tooltip="Profile"
        pathName="/settings"
        href="profile"
      />
      <SidebarItem
        icon={Account}
        tooltip="Account"
        pathName="/settings"
        href="account"
      />
      <SidebarItem
        icon={Customization}
        tooltip="Customization"
        pathName="/settings"
        href="customization"
      />
      <SidebarItem
        icon={Billing}
        tooltip="Billing"
        pathName="/settings"
        href="billing"
      />
      <SidebarItem icon={Logout} className="sidebar__logout" tooltip="Logout" />
    </SidebarContainer>
  );
};

export default SettingsSidebar;
