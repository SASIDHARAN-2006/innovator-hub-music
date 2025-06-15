import React from "react";
import { NavLink } from "react-router-dom";
import { BsCameraFill } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { MdAccountBox } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UserSidebar = () => {
  return (
    <div className="h-[100%] w-[20%] bg-slate-700  py-8 flex shrink-0">
      <ul className="flex flex-col gap-10 w-[100%] px-6">
        <li className="flex items-center ">
          <NavLink
            to="/user-profile"
            end
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center w-[100%] gap-3 ${
                isActive && "bg-blue-800"
              }`;
            }}
          >
            {" "}
            <span>
              <MdAccountBox />
            </span>
            My Account
          </NavLink>
        </li>
        <li className="flex items-center ">
          <NavLink
            to="/user-profile/update-picture"
           
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center w-[100%] gap-3 ${
                isActive && "bg-blue-800"
              }`;
            }}
          >
            {" "}
            <span>
              <BsCameraFill />
            </span>
            Update Picture
          </NavLink>
        </li>
        
        <li className="flex items-center ">
          <NavLink
            to="/user-profile/update-profile"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center w-[100%] gap-3 ${
                isActive && "bg-blue-800"
              }`;
            }}
          >
            {" "}
            <span>
            <FaUserEdit />
            </span>
            Update Profile
          </NavLink>
        </li>
        
        <li className="flex items-center ">
          <NavLink
            to="/user-profile/update-password"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-800 flex items-center w-[100%] gap-3 ${
                isActive && "bg-blue-800"
              }`;
            }}
          >
            {" "}
            <span>
            <FaKey />
            </span>
            Update Password
          </NavLink>
        </li>
        <li className="flex items-center ">
          <NavLink
            to="/user-profile/delete-account"
            className={(obj) => {
              let { isActive } = obj;
              return `py-2 px-4 rounded-lg cursor-pointer hover:bg-red-500 flex items-center w-[100%] gap-3 ${
                isActive && "bg-red-700"
              }`;
            }}
          >
            {" "}
            <span>
            <MdDelete />
            </span>
            Delete Account
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
