import React from "react";
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[80%] bg-gray-100 p-8 ml-[20%] bg-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
