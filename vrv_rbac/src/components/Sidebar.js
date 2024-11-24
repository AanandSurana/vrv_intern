import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaUsers } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:flex">
      {/* Header for small screens */}
      <div className=" bg-zinc-800 text-white flex justify-between items-center p-4 md:hidden">
        <h1 className="text-lg font-bold"> <span className="text-rose-400">R</span>BAC (VRV)</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl focus:outline-none"
        >
          <BsMenuButtonWideFill />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-zinc-800 text-white w-64 p-4 absolute md:static md:block h-screen md:h-auto transition-transform duration-300 z-10 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-4 hidden md:block"><span className="text-rose-400">R</span>BAC (VRV)</h2>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center justify-between font-semibold text-lg"> Users <FaUsers /> </span>
            </Link>
          </li>
          <li>
            <Link
              to="/roles"
              className="block py-2 px-4 rounded hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center justify-between font-semibold text-lg"> Roles <FaEdit /> </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
