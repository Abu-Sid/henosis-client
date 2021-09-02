import { useRouter } from "next/router";
import React from "react";
import Chat from "../../../public/images/icons/chat.svg";
import ClipBoard from "../../../public/images/icons/clipboard-check.svg";
import Logout from "../../../public/images/icons/logout.svg";
import Mail from "../../../public/images/icons/mail.svg";
import Settings from "../../../public/images/icons/settings.svg";
import User from "../../../public/images/icons/user.svg";
import Boards from "../../../public/images/icons/view-boards.svg";
import Logo from "../../../public/images/logo.svg";
import SidebarContainer from "./SidebarContainer";
import SidebarItem from "./SidebarItem";

const PhoneSidebar = () => {
  const router = useRouter();
  const path = router.query.paths?.[0];
  
  return (
    <SidebarContainer device="phone">
      <SidebarItem
        icon={Logo}
        className="sidebar__logo"
        href="/"
        device="phone"
      />
      <SidebarItem
        icon={User}
        pathName={path}
        href="dashboard"
        tooltip="Dashboard"
        device="phone"
        routeName="Dashboard"
      />
      <SidebarItem
        icon={ClipBoard}
        pathName={path}
        href="backlog"
        tooltip="Backlog"
        device="phone"
        routeName="Backlog"
      />
      <SidebarItem
        icon={Boards}
        pathName={path}
        href="board"
        tooltip="Boards"
        device="phone"
        routeName="Boards"
      />
      <SidebarItem
        icon={Chat}
        pathName={path}
        href="chat"
        tooltip="Chats"
        device="phone"
        routeName="Chat"
      />
      <SidebarItem
        icon={Mail}
        pathName={path}
        href="archive"
        tooltip="Archive"
        device="phone"
        routeName="Archive"
      />
      <SidebarItem
        icon={Settings}
        pathName={path}
        href="settings"
        tooltip="Settings"
        device="phone"
        routeName="Settings"
      />
      <SidebarItem
        icon={Logout}
        className="sidebar__logout"
        tooltip="Logout"
        device="phone"
        routeName="Logout"
      />
    </SidebarContainer>
  );
};

export default PhoneSidebar;
