import { NavLink } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <NavLink
      to="/"
      className="roboto animate-pulse text-xl font-semibold tracking-tight flex items-center gap-2"
    >
      Intelli Schedule
    </NavLink>
  );
};

export default NavbarLogo;
