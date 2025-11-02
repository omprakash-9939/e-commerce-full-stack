import type React from "react";
import { assets } from "../assets_admin/assets";

type NavProps = {
  setToken: (token: string) => void;
  admin?: { name: string; email: string; role: string } | null;
};


const Navbar: React.FC<NavProps> = ({ admin }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[80px] block p-0 m-0" src={assets.logo3} alt="logo" />
      {admin ? (
        <button className="bg-[#8B008B] font-bold text-white px-5 py-2 sm:px-7 sm:py-2 rounded text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            Hello, {admin.name}
            <div className="loader"></div>
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default Navbar;
