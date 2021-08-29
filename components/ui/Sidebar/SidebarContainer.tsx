import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ISidebarContainer {
  device: string;
  children: React.ReactNode;
}

const SidebarContainer: React.FC<ISidebarContainer> = ({
  children,
  device,
}) => {
  const [hide, setHide] = useState(false);
  const control = useAnimation();
  return (
    <>
      {hide && (
        <button className='clickme2' onClick={() => setHide(false)}>
          Click me sucker
        </button>
      )}
      {!hide && (
        <div
          className={
            device === "desktop"
              ? "sidebar-container"
              : "phone-sidebar-container"
          }
        >
          <div className={device === "desktop" ? "sidebar" : "phone-sidebar"}>
            <ul>{children}</ul>
          </div>
          <button className='clickme' onClick={() => setHide(true)}>
            Click me
          </button>
        </div>
      )}
    </>
  );
};

export default SidebarContainer;
