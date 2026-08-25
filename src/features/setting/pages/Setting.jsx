import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Store,
  FileText,
  CreditCard,
  Receipt,
  Users,
  Bell,
  History,
  Puzzle,
  Info,
  Barcode,
  Volume2,
  Printer,
  Trash2,
  Sun,
  Moon,
  Monitor,
  Database,
  Clock,
  ShieldCheck,
  Download,
  RotateCcw,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import GeneralSettings from "../components/GeneralSettings";
import ApplicationSettings from "../components/ApplicationSettings";
import ThemeSettings from "../components/ThemeSettings";
import BackupData from "../components/BackupData";
import SystemInformation from "../components/SystemInformation";
import { useProductLayout } from "../../../context/ProductLayoutContext";

function Setting() {
  const [activeMenu, setActiveMenu] = useState("General");
  const { dragEnabled, setDragEnabled } = useProductLayout();


  const [settings, setSettings] = useState({
    barcode: true,
    lowStock: true,
    saleSound: true,
    autoPrint: false,
    confirmDelete: true,
    compactMode: false,
  });

  const [theme, setTheme] = useState("Light");
  const [sidebarStyle, setSidebarStyle] = useState("Light");
  const [primaryColor, setPrimaryColor] = useState("purple");

  const menus = [
    {
      name: "General",
      description: "General Settings",
      icon: SettingsIcon,
    },
    {
      name: "Store Settings",
      description: "Manage store information",
      icon: Store,
    },
    {
      name: "Tax Settings",
      description: "Configure tax rates",
      icon: FileText,
    },
    {
      name: "Payment Methods",
      description: "Manage payment options",
      icon: CreditCard,
    },
    {
      name: "Receipt Settings",
      description: "Customize receipt template",
      icon: Receipt,
    },
    {
      name: "Users & Permissions",
      description: "Manage user roles",
      icon: Users,
    },
    {
      name: "Notifications",
      description: "Email and system alerts",
      icon: Bell,
    },
    {
      name: "Backup & Restore",
      description: "Backup or restore data",
      icon: History,
    },
    {
      name: "Integrations",
      description: "Third-party integrations",
      icon: Puzzle,
    },
    {
      name: "System Info",
      description: "System information",
      icon: Info,
    },
  ];

  const toggleSetting = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const Toggle = ({ enabled, onClick }) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`relative h-6 w-11 rounded-full transition-all ${
          enabled ? "bg-purple-700" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 p-5 text-gray-800">

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[230px_1fr]">

        {/* ================= SIDEBAR ================= */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = activeMenu === menu.name;

            return (
              <button
                key={menu.name}
                onClick={() => setActiveMenu(menu.name)}
                className={`relative flex w-full items-center gap-4 px-4 py-4 text-left transition-all ${
                  active
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-purple-700" />
                )}

                <Icon
                  size={20}
                  className={active ? "text-purple-700" : "text-gray-600"}
                />

                <div>
                  <p className="text-sm font-semibold">
                    {menu.name}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    {menu.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          <GeneralSettings/>

          <ApplicationSettings
              settings={settings}
              toggleSetting={toggleSetting}
              Toggle={Toggle}
            />

            <ThemeSettings
              theme={theme}
              setTheme={setTheme}
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              sidebarStyle={sidebarStyle}
              setSidebarStyle={setSidebarStyle}
              settings={settings}
              toggleSetting={toggleSetting}
              Toggle={Toggle}
            />

          <BackupData/>

        </div>
      </div>

     <SystemInformation/>
          <h1>------------------------------</h1>
           <button
            onClick={() => setDragEnabled(!dragEnabled)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragEnabled ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragEnabled ? "translate-x-7" : ""}
              `}
            />

          </button>
    </div>
  );
}

export default Setting;