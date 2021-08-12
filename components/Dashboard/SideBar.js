import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "../../public/images/logo.svg";
import workspaces from "../../public/images/icons/workspaces.svg";
import users from "../../public/images/icons/user.svg";
import admins from "../../public/images/icons/admins.svg";
import Logout from "../../public/images/icons/logout.svg";

const SideBar = () => {
  return (
    <div
      className="sidebar-container"
      style={{ marginTop: "80px", height: "85vh" }}
    >
      <div className="sidebar">
        <ul>
          <li className="sidebar__logo">
            <Link href="/">
              <a>
                <Image src={Logo} alt="logo" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/all_signup_users">
              <a>
                <Image src={users} alt="logo" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/workspaces">
              <a>
                <Image src={workspaces} alt="logo" />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/admins">
              <a>
                <Image src={admins} alt="logo" />
              </a>
            </Link>
          </li>

          <li className="sidebar__logout">
            <Image src={Logout} alt="logo" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
