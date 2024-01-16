import React from "react";
import { Link } from "react-router-dom";

import userProfile from "../assets/userProfile.png";

export const Navbar = () => {
  return (
    <nav className="bg-neutral-900 text-white flex text-2xl py-5 px-8 justify-center gap-[670px] max-[820px]:gap-1 max-[820px]:justify-between">
      <Link to="/" className="font-bold">
        LHP
      </Link>
      <Link to="/dashboard">
        <img
          className="w-[30px] hover:scale-105 transition-all"
          src={userProfile}
          alt="profile"
        />
      </Link>
    </nav>
  );
};
