import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "../../public/images/logo.svg";
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
  const path = router.pathname;
  const { id } = router.query;

  let visibility;
  if (!path.includes("workspaces/[id]")) {
    visibility = "hidden";
  } else {
    visibility = null;
  }
  return (
    <div className='sidebar-container'>
      <div className={`sidebar ${visibility}`}>
        <ul>
          <li>
            <Link href='/'>
              <a>Logo</a>
            </Link>
          </li>
          <li>
            <Link href={`${id}/dashboard`}>
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href={`${id}/backlog`}>
              <a>Backlog</a>
            </Link>
          </li>
          <li>
            <Link href={`${id}/boards`}>
              <a>Boards</a>
            </Link>
          </li>
          <li>
            <Link href={`${id}/chat`}>
              <a>Chat</a>
            </Link>
          </li>
          <li>
            <Link href={`${id}/notifications`}>
              <a>Notification</a>
            </Link>
          </li>
          <li>
            <Link href={`${id}/settings`}>
              <a>Settings</a>
            </Link>
          </li>
          <li className='sidebar__logout'>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
