import React from "react";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import CreateWorkflowBtn from "./Create";
import Profile from "./profile/Profile";

const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <NavbarLogo />

      <NavbarLinks />

      <div className="flex items-center gap-3">
        <CreateWorkflowBtn />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
