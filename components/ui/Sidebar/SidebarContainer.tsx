import React from "react";

const SidebarContainer: React.FC = ({ children }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <ul>{children}</ul>
      </div>
    </div>
  );
};

export default SidebarContainer;
