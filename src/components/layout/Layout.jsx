import "./layout.css";
import React from "react";
import TopNav from "../topnav/Topnav";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="layout">
    <Sidebar />
    <div className="layout__content">
      <TopNav />
      <div className="layout__content-main">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
