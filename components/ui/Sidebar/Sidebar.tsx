import React from "react";
import Logo from "../../../public/images/logo.svg";
import Menu from "../../public/images/icons/menu.svg";
import User from "../../../public/images/icons/user.svg";
import ClipBoard from "../../../public/images/icons/clipboard-check.svg";
import Boards from "../../../public/images/icons/view-boards.svg";
import Chat from "../../../public/images/icons/chat.svg";
import Mail from "../../../public/images/icons/mail.svg";
import Settings from "../../../public/images/icons/settings.svg";
import Logout from "../../../public/images/icons/logout.svg";
import SidebarItem from "./SidebarItem";
import SidebarContainer from "./SidebarContainer";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem icon={Logo} className='sidebar__logo' href='/' />
      <SidebarItem icon={User} href='personal-dashboard' tooltip='Dashboard' />
      <SidebarItem icon={ClipBoard} href='backlog' tooltip='Backlog' />
      <SidebarItem icon={Boards} href='board' tooltip='Boards' />
      <SidebarItem icon={Chat} href='chat' tooltip='Chats' />
      <SidebarItem icon={Mail} href='notifications' tooltip='Notifications' />
      <SidebarItem icon={Settings} href='settings' tooltip='Settings' />
      <SidebarItem icon={Logout} className='sidebar__logout' tooltip='Logout' />
    </SidebarContainer>
  );
};

export default Sidebar;
