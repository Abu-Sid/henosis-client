import React from "react";

interface ISidebarContainer {
  device: string;
  children: React.ReactNode;
}

const SidebarContainer: React.FC<ISidebarContainer> = ({
  children,
  device,
}) => {
  return (
    <div
      className={
        device === "desktop" ? "sidebar-container" : "phone-sidebar-container"
      }
    >
      <div className={device === "desktop" ? "sidebar" : "phone-sidebar"}>
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default SidebarContainer;
