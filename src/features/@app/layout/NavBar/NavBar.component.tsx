import React from "react";
import { NavLink } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <div>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/signup"}>Signup</NavLink>
      {/* Accessible after authentication */}
      {<NavLink to={"/game"}>Game</NavLink>}
    </div>
  );
};

export default NavBarComponent;
