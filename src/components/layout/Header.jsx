// components/layout/Header.jsx
import { useState } from "react";
import { Search, Mail, Bell, ChevronDown } from "lucide-react";
import useAuth from "../../features/auth/hooks/useAuth";
import {
  User,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Header() {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-6 shrink-0">
      {/* Company Info - ខាងឆ្វេង */}
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center">
          <img
              src="/public/Logo_POS.png"
              alt="avatar"
              className="w-12 h-12 rounded-lg object-cover border border-gray-300 shadow-sm cursor-pointer"
            />
        </div>
        <span className="font-bold text-lg text-gray-800">
          {user?.companyName || "Top Most Systems Ltd"}
        </span>
      </div>

      {/* Search Bar - កណ្តាល */}
      <div className="flex-1 max-w-md mx-8 relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm border border-blue-100
                     focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {/* Icons + Profile - ខាងស្តាំ */}
      <div className="flex items-center gap-5">
        {/* Mail Icon with Badge */}
        <button className="relative">
          <Mail className="text-gray-400" size={25} />
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Bell Icon with Badge */}
        <button className="relative">
          <Bell className="text-gray-400" size={25} />
          <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white
                           text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2"
          >
            <img
              src="/src/assets/Images/vathana.jpg"
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-gray-800">
                {user?.name || "Segun Oloto"}
              </p>
              <p className="text-xs text-gray-400">
                {user?.role || "Procurement Manager"}
              </p>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {/* Dropdown */}
          {showProfileMenu && (
            <div
              className="
                absolute right-0 top-14 w-72
                overflow-hidden
                rounded-[20px]
                border border-white/30
                backdrop-blur-[40px]
                bg-[rgba(242,242,247,0.72)]
                shadow-[0_10px_35px_rgba(0,0,0,0.15)]
                ring-1 ring-white/20
                z-50
              "
              style={{
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                backdropFilter: "blur(40px) saturate(180%)",
              }}
            >
              <div className="px-5 py-4 border-b border-black/5">
                <h3 className="font-semibold text-[15px] text-[#1d1d1f]">
                  {user?.name}
                </h3>
                <p className="text-sm text-[#6e6e73]">
                  {user?.email}
                </p>
              </div>

              <button className="w-full px-5 py-3 text-left text-[#1d1d1f] hover:bg-white/40 transition">
                Profile
              </button>

              <button className="w-full px-5 py-3 text-left text-[#1d1d1f] hover:bg-white/40 transition">
                Settings
              </button>

              <div className="mx-4 border-t border-black/5" />

              <button className="w-full px-5 py-3 text-left text-[#ff3b30] hover:bg-red-50 transition">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}