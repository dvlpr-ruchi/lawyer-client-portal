import React from "react";
import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ selectedTab }) => {
  const titles = {
    consultations: "Consultations",
    fir: "FIR Requests",
    documents: "Documents",
    payments: "Payments",
    messages: "Messages",
  };

  return (
    <div className="bg-black border-b border-white/8 px-6 py-4">
      <div className="flex justify-between items-center gap-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight leading-none">
            {titles[selectedTab] ?? "Overview"}
          </h1>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="pl-9 pr-4 py-2 bg-neutral-950 border border-white/10 hover:border-yellow-500/30 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 rounded-xl text-sm text-gray-200 placeholder-gray-600 outline-none transition-all duration-200 w-52"
              placeholder="Search..."
            />
          </div>

          {/* Bell */}
          <button className="relative w-9 h-9 flex items-center justify-center bg-neutral-950 border border-white/10 hover:border-yellow-500/30 rounded-xl transition-all duration-200 group">
          <Link to="/notifications">
            <Bell className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200" />
            </Link>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-500 rounded-full ring-2 ring-black" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center text-black text-xs font-black tracking-wide shadow-lg shadow-yellow-500/20">
            JD
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
