import "./menuBar.css";
import Sidebar from "./Sidebar";
import React, { useState } from "react";

const MenuBar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <div className={`dashboard ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
      <nav className="menu-bar">
        <div className="menu-button" onClick={toggleSidebar}>
          <i className="bx bx-menu"></i>
        </div>
      </nav>
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default MenuBar;
