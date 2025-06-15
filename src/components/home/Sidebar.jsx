import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-70px)] sticky top-[70px] w-[20%] bg-slate-600 px-7 text-[18px] py-12 text-white shrink-0">
      <ul className="flex flex-col gap-5">
        <li>
          <NavLink
            to="/"
            end
            className={(obj) => {
              let { isActive } = obj;
              return `flex items-center gap-3 py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-900 ${
                isActive && "bg-blue-800"
              }`;
            }}
          >
            <span></span>
            <span>Dashboard</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
