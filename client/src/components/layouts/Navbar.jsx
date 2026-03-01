import React from "react";
import Profile from "../sections/navbar/Profile";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const links = [
  { name: "Home", path: "/" },
  { name: "Timetable", path: "/timetable" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/workflow?newWorkflow=true");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full z-50 px-4 py-1 
    bg-white/80 dark:bg-black/70 backdrop-blur-md 
    flex items-center justify-between"
    >
      <NavLink
        to="/"
        className="text-xl font-bold text-gray-800 dark:text-white"
      >
        IntelliSchedule
      </NavLink>

      {/* Menu */}
      <ul
        className="rounded-full border border-gray-200 dark:border-gray-600 
      px-5 py-2 hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-100 font-medium"
      >
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `transition hover:text-blue-600 ${
                  isActive ? "text-blue-600 font-semibold" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}

        <Button size="sm" onClick={handleCreate}>
          Create
        </Button>
      </ul>

      {/* Profile */}
      <Profile />
    </nav>
  );
};

export default Navbar;
