import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='logo'>
        <Link href='/'>logo</Link>
      </div>
    </div>
  );
};

export default Sidebar;
