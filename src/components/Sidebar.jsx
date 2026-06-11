import { NavLink } from "react-router";
import { useState } from "react";

import { MdOutlineMenuOpen } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { FaBed } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      icon: <LuLayoutDashboard size={24} />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <FaBed size={22} />,
      label: "Rooms",
      path: "/rooms",
    },
    {
      icon: <PiStudentFill size={24} />,
      label: "Students",
      path: "/students",
    },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white shadow-md h-full p-2 flex flex-col flex-shrink-0 duration-300 ${
        open ? "w-72" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="px-3 py-2 h-20 flex justify-between items-center">
        <h2
          className={`font-bold text-xl whitespace-nowrap overflow-hidden duration-300 ${
            !open && "w-0"
          }`}
        >
          Hostel Management
        </h2>

        <button
          onClick={() => setOpen(!open)}
          className={`cursor-pointer duration-300 ${!open ? "rotate-180" : ""}`}
        >
          <MdOutlineMenuOpen size={28} />
        </button>
      </div>

      {/* Navigation */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-3 my-2 rounded-md duration-300 flex gap-3 items-center relative group
                ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800"}`
              }
            >
              {/* Icon */}
              <div>{item.icon}</div>

              {/* Label */}
              <p
                className={`whitespace-nowrap overflow-hidden duration-300 ${
                  !open && "w-0 translate-x-24"
                }`}
              >
                {item.label}
              </p>

              {/* Tooltip */}
              <span
                className={`${
                  open && "hidden"
                } absolute left-32 bg-white text-black shadow-md rounded-md
                w-0 overflow-hidden p-0 duration-200
                group-hover:w-fit group-hover:p-2 group-hover:left-16`}
              >
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
