import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../../public/images/logo.png";
import Menu from "../../public/images/icons/menu.svg";
import User from "../../public/images/icons/user.svg";
import ClipBoard from "../../public/images/icons/clipboard-check.svg";
import Boards from "../../public/images/icons/view-boards.svg";
import Chat from "../../public/images/icons/chat.svg";
import Mail from "../../public/images/icons/mail.svg";
import Settings from "../../public/images/icons/settings.svg";
import Logout from "../../public/images/icons/logout.svg";

const Sidebar = () => {
  const router = useRouter();
  const route = router.pathname;
  const path = router.query.paths?.[0];

  let visibility;
  if (!route.includes("workspaces/[...paths]")) {
    visibility = "hidden";
  } else {
    visibility = null;
  }
  return (
    <div className='sidebar-container'>
      <div className={`sidebar ${visibility}`}>
        <ul>
          <li className='sidebar__logo'>
            <Link href='/'>
              <a>
                <Image src={Logo} alt='logo' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`${path}/personal-dashboard`}>
              <a>
                <Image src={User} alt='user-icon' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`${path}/backlog`}>
              <a>
                <Image src={ClipBoard} alt='backlog-icon' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`${path}/board`}>
              <a>
                <Image src={Boards} alt='board-icon' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`${path}/chat`}>
              <a>
                <Image src={Chat} alt='chat-icon' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`${path}/notifications`}>
              <a>
                <Image src={Mail} alt='notifications-icon' />
              </a>
            </Link>
          </li>
          <li>
            <Link href={`${path}/settings`}>
              <a>
                <Image src={Settings} alt='settings-icon' />
              </a>
            </Link>
          </li>
          <li className='sidebar__logout'>
            <Image src={Logout} alt='logo' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
