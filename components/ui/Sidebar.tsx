import React from "react";
import Link from "next/link";
import { useRoute } from "./Navbar/Navbar";

const Sidebar = () => {
  const path = useRoute();

  let visibility;
  if (!path.includes("workspaces/[id]")) {
    visibility = "hidden";
  } else {
    visibility = null;
  }
  return (
    <div className='sidebar-container'>
      <div className={`sidebar ${visibility}`}>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className='logo'
        >
          <Link href='/'>logo</Link>
        </div>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
        <p>Mir Hussain</p>
      </div>
    </div>
  );
};

export default Sidebar;
