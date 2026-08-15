import { Monitor, Moon, Sun } from "lucide-react";
import React from "react";

function ThemeSettings({
  theme,
  setTheme,
  primaryColor,
  setPrimaryColor,
  sidebarStyle,
  setSidebarStyle,
  settings,
  toggleSetting,
  Toggle,
}) {
  return (
    <div>
      {/* ================= THEME SETTINGS ================= */}
      <div className="rounded-lg border border-gray-200 bg-white p-5">

        <h2 className="mb-5 text-base font-bold text-gray-900">
          Theme Settings
        </h2>

        {/* Theme Mode */}
        <label className="mb-2 block text-xs font-semibold">
          Theme Mode
        </label>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["Light", Sun],
            ["Dark", Moon],
            ["System", Monitor],
          ].map(([name, Icon]) => (
            <button
              type="button"
              key={name}
              onClick={() => setTheme(name)}
              className={`flex h-12 items-center justify-center gap-2 rounded-md border text-sm font-medium transition-all ${
                theme === name
                  ? "border-purple-600 text-purple-700"
                  : "border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon size={17} />
              {name}
            </button>
          ))}
        </div>

        {/* Primary Color */}
        <label className="mb-3 mt-5 block text-xs font-semibold">
          Primary Color
        </label>

        <div className="flex items-center gap-5">
          {[
            "purple",
            "blue",
            "green",
            "red",
            "orange",
            "cyan",
            "slate",
          ].map((color) => {
            const colors = {
              purple: "bg-purple-600",
              blue: "bg-blue-600",
              green: "bg-green-600",
              red: "bg-red-500",
              orange: "bg-orange-500",
              cyan: "bg-cyan-600",
              slate: "bg-slate-600",
            };

            return (
              <button
                type="button"
                key={color}
                onClick={() => setPrimaryColor(color)}
                className={`h-5 w-5 rounded-full ${colors[color]} ${
                  primaryColor === color
                    ? "ring-2 ring-offset-2 ring-purple-600"
                    : ""
                }`}
              />
            );
          })}
        </div>

        {/* Sidebar Style */}
        <label className="mb-2 mt-5 block text-xs font-semibold">
          Sidebar Style
        </label>

        <div className="grid grid-cols-2 gap-2">
          {["Light", "Dark"].map((style) => (
            <button
              type="button"
              key={style}
              onClick={() => setSidebarStyle(style)}
              className={`h-9 rounded-md border text-sm font-medium ${
                sidebarStyle === style
                  ? "border-purple-600 text-purple-700"
                  : "border-gray-200"
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Compact Mode */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              Compact Mode
            </p>

            <p className="text-xs text-gray-400">
              Reduce spacing and padding for more content
            </p>
          </div>

          <Toggle
            enabled={settings.compactMode}
            onClick={() => toggleSetting("compactMode")}
          />
        </div>

      </div>
    </div>
  );
}

export default ThemeSettings;