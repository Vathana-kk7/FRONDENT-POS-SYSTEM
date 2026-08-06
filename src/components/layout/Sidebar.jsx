import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  TrendingUp,
  Truck,
  ShoppingCart,
  RefreshCw,
  Settings,
  FileText,
  ChevronDown,
  Receipt,
  CreditCard,
  RotateCcw,
} from "lucide-react";

import PromoCard from "./PromoCard";

function Sidebar() {
  const location = useLocation();

  // Sales submenu open/close
  const [salesOpen, setSalesOpen] = useState(
    location.pathname.startsWith("/salepos") ||
    location.pathname.startsWith("/saleorder") ||
    location.pathname.startsWith("/invoice") ||
    location.pathname.startsWith("/payment") ||
    location.pathname.startsWith("/return")
  );
  const [purchaseOpen, setpurchaseOpen] = useState(
    location.pathname.startsWith("/purchaseorder") ||
    location.pathname.startsWith("/goodrecived") ||
    location.pathname.startsWith("/purchasereturn") 
  );
  const [stocktransferOpen, setstocktransferOpen] = useState(
    location.pathname.startsWith("/transferrequest") ||
    location.pathname.startsWith("/stocktransfer") ||
    location.pathname.startsWith("/transferhistory") 
  );
  const [userOpen, setuserOpen] = useState(
    location.pathname.startsWith("/alluser") ||
    location.pathname.startsWith("/roles")
  );

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Products",
      path: "/product",
      icon: Package,
    },
    {
      label: "Categories",
      path: "/category",
      icon: FolderTree,
    },
    {
      label: "Customer",
      path: "/customer",
      icon: Users,
    },
  ];

  const bottomMenuItems = [
    {
      label: "Supplier",
      path: "/supplier",
      icon: Truck,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      label: "Settings",
      path: "/setting",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-indigo-900 text-white flex flex-col shrink-0 overflow">

      {/* ================= LOGO ================= */}
      <div className="px-5 py-6 border-b border-indigo-800/50">
        <div className="flex items-center gap-2">
          <h1 className="font-medium text-2xl">
            Inven{" "}
            <span className="text-white px-1 py-1 rounded-sm bg-yellow-500">
              3
            </span>
          </h1>
        </div>

        <p className="text-xs text-indigo-300 mt-1">
          Manage your inventory the easiest way
        </p>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-none">

        {/* ================= MAIN MENU ================= */}
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
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
              <Icon
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>{item.label}</span>
            </NavLink>
          );
        })}

        {/* ================= SALES ================= */}
        <div className="mb-1">

          {/* Sales Main Button */}
          <button
            type="button"
            onClick={() => setSalesOpen((prev) => !prev)}
            className={`
              w-full
              flex items-center justify-between
              px-3 py-2.5
              rounded-lg
              text-sm
              transform
              transition-all
              duration-300
              ease-in-out
              cursor-pointer
              ${
                location.pathname.startsWith("/salepos") ||
                location.pathname.startsWith("/saleorder") ||
                location.pathname.startsWith("/invoice") ||
                location.pathname.startsWith("/payment") ||
                location.pathname.startsWith("/return")
                  ? "bg-white text-indigo-950 font-medium scale-105"
                  : "text-indigo-100 hover:bg-indigo-800 hover:scale-120 hover:translate-x-1"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <TrendingUp
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>Sales</span>
            </div>

            {/* Arrow animation */}
            <ChevronDown
              size={17}
              className={`
                transition-transform
                duration-300
                ease-in-out
                ${salesOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* ================= SALES SUB MENU ================= */}
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ease-in-out
              ${
                salesOpen
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <div className="ml-6 pl-3 mt-1 border-l border-indigo-400/40">

              {/* Sale Orders */}
              <NavLink
                to="/salepos"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Sale Pos</span>
              </NavLink>
              {/* Sale Orders */}
              <NavLink
                to="/saleorder"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Sale Orders</span>
              </NavLink>

              {/* Invoices */}
              <NavLink
                to="/invoice"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <FileText
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Invoices</span>
              </NavLink>

              {/* Payments */}
              <NavLink
                to="/payment"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <CreditCard
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Payments</span>
              </NavLink>

              {/* Returns */}
              <NavLink
                to="/return"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <RotateCcw
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Returns</span>
              </NavLink>

            </div>
          </div>
        </div>
        {/* ====================== Purchase =================== */}
        <div className="mb-1">

          {/* Purchase Main Button */}
          <button
            type="button"
            onClick={() => setpurchaseOpen((prev) => !prev)}
            className={`
              w-full
              flex items-center justify-between
              px-3 py-2.5
              rounded-lg
              text-sm
              transform
              transition-all
              duration-300
              ease-in-out
              cursor-pointer
              ${
                location.pathname.startsWith("/purchaseorder") ||
                location.pathname.startsWith("/goodreceived") ||
                location.pathname.startsWith("/purchasereturn") 
                  ? "bg-white text-indigo-950 font-medium scale-105"
                  : "text-indigo-100 hover:bg-indigo-800 hover:scale-120 hover:translate-x-1"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <TrendingUp
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>Purchase</span>
            </div>

            {/* Arrow animation */}
            <ChevronDown
              size={17}
              className={`
                transition-transform
                duration-300
                ease-in-out  
                ${purchaseOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* ================= Purchase SUB MENU ================= */}
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ease-in-out
              ${
                purchaseOpen
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <div className="ml-6 pl-3 mt-1 border-l border-indigo-400/40">

              {/* Sale Orders */}
              <NavLink
                to="/purchaseorder"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Purchase Orders</span>
              </NavLink>
              {/* Sale Orders */}
              <NavLink
                to="/goodreceived"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Goods Received</span>
              </NavLink>

              {/* Invoices */}
              <NavLink
                to="/purchasereturn"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <FileText
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Purchase Returns</span>
              </NavLink>
            </div>
          </div>
        </div>
        {/* ====================== stock =================== */}
        <div className="mb-1">

          {/* stock Main Button */}
          <button
            type="button" 
            onClick={() => setstocktransferOpen((prev) => !prev)}
            className={`
              w-full
              flex items-center justify-between
              px-3 py-2.5
              rounded-lg
              text-sm
              transform
              transition-all
              duration-300
              ease-in-out
              cursor-pointer
              ${
                location.pathname.startsWith("/transferrequest") ||
                location.pathname.startsWith("/stocktransfer") ||
                location.pathname.startsWith("/transferhistory") 
                  ? "bg-white text-indigo-950 font-medium scale-105"
                  : "text-indigo-100 hover:bg-indigo-800 hover:scale-120 hover:translate-x-1"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <TrendingUp
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>Stock Transfer</span>
            </div>

            {/* Arrow animation */}
            <ChevronDown
              size={17}
              className={`
                transition-transform
                duration-300
                ease-in-out  
                ${stocktransferOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* ================= Purchase SUB MENU ================= */}
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ease-in-out
              ${
                stocktransferOpen
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <div className="ml-6 pl-3 mt-1 border-l border-indigo-400/40">

              {/* Sale Orders */}
              <NavLink
                to="/transferrequest"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Transfer Request</span>
              </NavLink>
              {/* Sale Orders */}
              <NavLink
                to="/stocktransfer"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Stock Transfer</span>
              </NavLink>

              {/* Invoices */}
              <NavLink
                to="/transferhistory"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <FileText
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Transfer History</span>
              </NavLink>
            </div>
          </div>
        </div>
         {/* ========================= Users ======================== */}
        <div className="mb-1">

          {/* stock Main Button */}
          <button
            type="button" 
            onClick={() => setuserOpen((prev) => !prev)}
            className={`
              w-full
              flex items-center justify-between
              px-3 py-2.5
              rounded-lg
              text-sm
              transform
              transition-all
              duration-300
              ease-in-out
              cursor-pointer
              ${
                location.pathname.startsWith("/alluser") ||
                location.pathname.startsWith("/roles")
                  ? "bg-white text-indigo-950 font-medium scale-105"
                  : "text-indigo-100 hover:bg-indigo-800 hover:scale-120 hover:translate-x-1"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <TrendingUp
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>Users</span>
            </div>

            {/* Arrow animation */}
            <ChevronDown
              size={17}
              className={`
                transition-transform
                duration-300
                ease-in-out  
                ${userOpen ? "rotate-180" : "rotate-0"}
              `}
            />
          </button>

          {/* ================= Purchase SUB MENU ================= */}
          <div
            className={`
              overflow-hidden
              transition-all
              duration-300
              ease-in-out
              ${
                userOpen
                  ? "max-h-60 opacity-100"
                  : "max-h-0 opacity-0"
              }
            `}
          >
            <div className="ml-6 pl-3 mt-1 border-l border-indigo-400/40">

              {/* Sale Orders */}
              <NavLink
                to="/alluser"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>All Users</span>
              </NavLink>
              {/* Sale Orders */}
              <NavLink
                to="/roles"
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2 rounded-md mb-1 text-sm
                  transform transition-all duration-300 ease-in-out
                  ${
                    isActive
                      ? "text-white bg-white/15 font-medium translate-x-1"
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800 hover:translate-x-1"
                  }`
                }
              >
                <Receipt
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Roles</span>
              </NavLink>
            </div>
          </div>
        </div>
        {/* ================= OTHER MENU ================= */}
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;

          return (
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
              <Icon
                size={18}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>{item.label}</span>
            </NavLink>
          );
        })}
       
      </nav>

      {/* ================= PROMO CARD ================= */}
      <div className="p-3">
        <PromoCard />
      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-4 py-3 text-xs text-indigo-400 flex justify-between border-t border-indigo-800/50">
        <span>Help</span>
        <span>Privacy</span>
        <span>Inven3 © 2024</span>
      </div>

    </aside>
  );
}

export default Sidebar;