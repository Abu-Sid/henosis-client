import React from "react";
import useScreenSize from "../../hooks/useScreenSize";
import Billing from "../../public/images/icons/credit-card.svg";
import Profile from "../../public/images/icons/emoji-happy.svg";
import Logout from "../../public/images/icons/logout.svg";
import Customization from "../../public/images/icons/settings.svg";
import Account from "../../public/images/icons/user-circle.svg";
import Logo from "../../public/images/logo.svg";
import SidebarContainer from "../ui/Sidebar/SidebarContainer";
import SidebarItem from "../ui/Sidebar/SidebarItem";

const SettingsSidebar: React.FC = () => {
  const screenSize = useScreenSize();

  return (
    <SidebarContainer device={screenSize < 600 ? "phone" : "desktop"}>
      <SidebarItem
        icon={Logo}
        className="sidebar__logo"
        href="/"
        device={screenSize < 600 ? "phone" : "desktop"}
      />
      <SidebarItem
        icon={Profile}
        tooltip="Profile"
        pathName="/settings"
        href="profile"
        device={screenSize < 600 ? "phone" : "desktop"}
        routeName="Profile"
      />
      <SidebarItem
        icon={Account}
        tooltip="Account"
        pathName="/settings"
        href="account"
        device={screenSize < 600 ? "phone" : "desktop"}
        routeName="Account"
      />
      <SidebarItem
        icon={Customization}
        tooltip="Customization"
        pathName="/settings"
        href="customization"
        device={screenSize < 600 ? "phone" : "desktop"}
        routeName="Customization"
      />
      <SidebarItem
        icon={Billing}
        tooltip="Billing"
        pathName="/settings"
        href="billing"
        device={screenSize < 600 ? "phone" : "desktop"}
        routeName="Billing"
      />
      <SidebarItem
        icon={Logout}
        className="sidebar__logout"
        tooltip="Logout"
        device={screenSize < 600 ? "phone" : "desktop"}
        routeName="Logout"
      />
    </SidebarContainer>
  );
};

export default SettingsSidebar;
