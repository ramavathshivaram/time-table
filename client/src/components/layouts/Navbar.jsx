import React from "react";
import Profile from "../sections/navbar/Profile";
import { NavLink } from "react-router-dom";
import CreateWorkflowBtn from "../sections/navbar/CreateWorkflowBtn";

const links = [
  { name: "Home", path: "/" },
  { name: "Timetable", path: "/timetable" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/70 backdrop-blur-lg px-6 py-2 flex items-center justify-between">
      {/* Logo */}
      <NavLink
        to="/"
        className="roboto animate-pulse text-xl font-semibold tracking-tight flex items-center gap-2"
      >
        Intelli Schedule
      </NavLink>

      {/* Navigation */}
      <ul
        className="hidden md:flex items-center gap-6 
        text-sm font-medium"
      >
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `relative transition-colors
                ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <CreateWorkflowBtn />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
