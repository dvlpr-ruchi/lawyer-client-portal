import React, { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ selectedTab }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Retrieved user from localStorage:", storedUser);
    setUser(storedUser);
  }, []);

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
        <h1 className="text-2xl font-black text-white">
          {titles[selectedTab] ?? "Overview"}
        </h1>

        {/* Right controls */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              className="pl-9 pr-4 py-2 bg-neutral-950 border border-white/10 rounded-xl text-sm text-gray-200"
              placeholder="Search..."
            />
          </div>

          {/* Bell */}
          <Link to="/notifications">
            <button className="relative w-9 h-9 flex items-center justify-center bg-neutral-950 border border-white/10 rounded-xl">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-500 rounded-full" />
            </button>
          </Link>

          {/* Avatar */}
          <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center text-black text-xs font-black">
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "JD"}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;