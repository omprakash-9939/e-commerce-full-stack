import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { TfiLayoutPlaceholder } from "react-icons/tfi";
import { IoMdLogOut } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import AI_video2 from "../assets_admin/ai2.mp4";

type sidebarProps = {
  setToken: (token: string) => void;
  setAdmin: (admin: null) => void;
};

const Sidebar: React.FC<sidebarProps> = ({ setToken, setAdmin }) => {
  const [collapsed, setCollapsed] = useState(false);
  

  return (
    <div
      className={`${
        collapsed ? "w-[70px]" : "w-[18%]"
      } flex flex-col border-r h-[calc(100vh-100px)] justify-between border-gray-200 transition-all duration-300`}
    >
      <div className="flex flex-col gap-4 px-4 pt-6 text-[15px]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center border border-gray-300 rounded p-2 mb-4 hover:bg-gray-100"
        >
          {collapsed ? <IoChevronForward /> : <IoChevronBack />}
        </button>

        <NavLink
          to="/add"
          className="flex items-center gap-3 border border-gray-300 p-2 rounded"
        >
          <BsDatabaseFillAdd className="w-6 h-6" />
          {!collapsed && <p className="hidden md:block">Add Items</p>}
        </NavLink>

        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-gray-300 p-2 rounded"
        >
          <FaThList className="w-6 h-6" />
          {!collapsed && <p className="hidden md:block">List Items</p>}
        </NavLink>

        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-gray-300 p-2 rounded"
        >
          <TfiLayoutPlaceholder className="w-6 h-6" />
          {!collapsed && <p className="hidden md:block">Orders List</p>}
        </NavLink>

        <NavLink
          to="/chat-db"
          className="flex items-center gap-3 border border-gray-300 p-2 rounded hover:bg-gray-100 transition"
        >
          <video
            className="w-8 h-8 rounded-full shadow-md"
            src={AI_video2}
            autoPlay
            loop
            muted
            playsInline
          />
          {!collapsed && (
            <p className="hidden md:block font-medium">AI Assistant</p>
          )}
        </NavLink>
      </div>
      <div
        onClick={() => {
          setToken("");
          setAdmin(null);
          localStorage.removeItem("admin");
          
        }}
        className="px-4 pb-6 cursor-pointer"
      >
        <div className="flex items-center gap-3 hover:bg-[#8B008B] hover:text-white border border-gray-300 p-2 rounded">
          <IoMdLogOut className="w-6 h-6" />
          {!collapsed && <p className="hidden md:block">Logout</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
