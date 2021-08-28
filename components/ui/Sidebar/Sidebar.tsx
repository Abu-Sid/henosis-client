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
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
  const path = router.query.paths?.[0];

  return (
    <SidebarContainer>
      <SidebarItem icon={Logo} className='sidebar__logo' href='/' />
      <SidebarItem
        icon={User}
        pathName={path}
        href='dashboard'
        tooltip='Dashboard'
      />
      <SidebarItem
        icon={ClipBoard}
        pathName={path}
        href='backlog'
        tooltip='Backlog'
      />
      <SidebarItem
        icon={Boards}
        pathName={path}
        href='board'
        tooltip='Boards'
      />
      <SidebarItem icon={Chat} pathName={path} href='chat' tooltip='Chats' />
      <SidebarItem
        icon={Mail}
        pathName={path}
        href='notifications'
        tooltip='Notifications'
      />
      <SidebarItem
        icon={Settings}
        pathName={path}
        href='settings'
        tooltip='Settings'
      />
      <SidebarItem icon={Logout} className='sidebar__logout' tooltip='Logout' />
    </SidebarContainer>
  );
};

export default Sidebar;
