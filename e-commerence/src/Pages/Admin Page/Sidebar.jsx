import React, { useState } from "react";
import { NavLink } from "react-router"; 
import { MdDashboard } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { LuPackageCheck } from "react-icons/lu";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { path: "/admin/dashboard", itemName: "Dashboard", icon: MdDashboard },
     { path: "/admin/orders", itemName: "orders", icon: LuPackageCheck},
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="bg-amber-400 text-white p-2 rounded shadow focus:outline-none"
        >
          {isOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-amber-400 z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-1/5 w-3/4`}
      >
        {/* Header */}
        <div className="h-20 bg-pink-300 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white select-none">Admin Panel</h2>
        </div>

        {/* Menu Items */}
        <nav className="h-full bg-fuchsia-200 flex flex-col gap-4 p-4">
          {items.map(({ itemName, path, icon }, index) => (
            <NavLink
              to={path}
              key={index}
              onClick={() => setIsOpen(false)} // close menu on mobile click
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 px-4 rounded text-white ${
                  isActive ? "bg-fuchsia-400" : "bg-pink-400"
                }`
              }
              end
            >
              {React.createElement(icon, { size: 20 })}
              <span>{itemName}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
