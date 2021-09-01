import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

const Sidebar = () => {
  const [screenSize, setScreenSize] = useState(null);
  const router = useRouter();
  const path = router.query.paths?.[0];

  useEffect(() => {
    const currentScreenSize = window.innerWidth;
    setScreenSize(currentScreenSize);
  }, []);

  return (
    <SidebarContainer device={screenSize < 650 ? "phone" : "desktop"}>
      <SidebarItem
        icon={Logo}
        className='sidebar__logo'
        href='/'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Henosis'
      />
      <SidebarItem
        icon={User}
        pathName={path}
        href='dashboard'
        tooltip='Dashboard'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Dashboard'
      />
      <SidebarItem
        icon={ClipBoard}
        pathName={path}
        href='backlog'
        tooltip='Backlog'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Backlog'
      />
      <SidebarItem
        icon={Boards}
        pathName={path}
        href='board'
        tooltip='Boards'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Boards'
      />
      <SidebarItem
        icon={Chat}
        pathName={path}
        href='chat'
        tooltip='Chats'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Chat'
      />
      <SidebarItem
        icon={Mail}
        pathName={path}
        href='notifications'
        tooltip='Notifications'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Notification'
      />
      <SidebarItem
        icon={Settings}
        pathName={path}
        href='settings'
        tooltip='Settings'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Settings'
      />
      <SidebarItem
        icon={Logout}
        className='sidebar__logout'
        tooltip='Logout'
        device={screenSize < 650 ? "phone" : "desktop"}
        routeName='Logout'
      />
    </SidebarContainer>
  );
};

export default Sidebar;
