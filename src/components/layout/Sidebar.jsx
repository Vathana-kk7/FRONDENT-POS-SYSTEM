import React from 'react'
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, FolderTree, Users,
  TrendingUp, Truck, ShoppingCart, RefreshCw, Settings,
} from "lucide-react";
import { FileText } from "lucide-react";
import PromoCard from "./PromoCard";
function Sidebar() {
  const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Products", path: "/product", icon: Package },
  { label: "Categories", path: "/category", icon: FolderTree },
  { label: "Customers", path: "/customers", icon: Users },
  { label: "Sales", path: "/sales", icon: TrendingUp },
  { label: "Supplier", path: "/supplier", icon: Truck },
  { label: "Purchase", path: "/purchase", icon: ShoppingCart },
  { label: "Stock Transfer", path: "/stock-transfer", icon: RefreshCw },
  { label: "Reports", path: "/reports", icon: FileText },
  { label: "Settings", path: "/setting", icon: Settings },
];
  return (
    <aside className="w-64 h-screen bg-indigo-900 text-white flex flex-col shrink-0">
      {/* Logo Section */}
      <div className="px-5 py-6 border-b border-indigo-800/50">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-2xl ">Inven <span className='text-white px-1 py-1 rounded-sm bg-yellow-500'>3</span></h1>
        </div>
        <p className="text-xs text-indigo-300 mt-1">
          Manage your inventory the easiest way
        </p>
      </div>

      {/* Navigation Menu - scrollable */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {menuItems.map((item) => (
         <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm
                transform transition-all duration-300 ease-in-out
                ${
                  isActive
                    ? "bg-white text-indigo-950 font-medium scale-105"
                    : "text-indigo-100 hover:bg-indigo-800 hover:scale-120 hover:translate-x-1"
                }`
              }
            >
            <item.icon
              size={18}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Promo Card - fixed at bottom */}
      <div className="p-3">
        <PromoCard />
      </div>

      {/* Footer links */}
      <div className="px-4 py-3 text-xs text-indigo-400 flex justify-between border-t border-indigo-800/50">
        <span>Help</span>
        <span>Privacy</span>
        <span>Inven3 © 2024</span>
      </div>
    </aside>
  );
}

export default Sidebar