// components/layout/Header.jsx
import { useState } from "react";
import { Search, Mail, Bell, ChevronDown } from "lucide-react";
import useAuth from "../../features/auth/hooks/useAuth";

export default function Header() {
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-6 shrink-0">
      {/* Company Info - ខាងឆ្វេង */}
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center">
          <div className="border-2 text-gray-200 rounded-lg w-12 h-12 flex justify-center items-center">
            <span className="text-black text-red-600 font-bold text-sm ">POS</span>
          </div>
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
              src="/src/assets/Images/"
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
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}