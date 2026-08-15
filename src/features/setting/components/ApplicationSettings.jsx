import { Barcode, Bell, Printer, Trash2, Volume2 } from "lucide-react";
import React from "react";

function ApplicationSettings({ settings, toggleSetting, Toggle }) {
  const SettingRow = ({
    icon: Icon,
    title,
    description,
    enabled,
    setting,
  }) => {
    return (
      <div className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0">
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
            <Icon size={19} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {title}
            </h3>

            <p className="text-xs text-gray-400">
              {description}
            </p>
          </div>
        </div>

        <Toggle
          enabled={enabled}
          onClick={() => toggleSetting(setting)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-base font-bold text-gray-900">
          Application Settings
        </h2>

        <SettingRow
          icon={Barcode}
          title="Enable Product Search by Barcode"
          description="Search products by scanning barcode"
          enabled={settings.barcode}
          setting="barcode"
        />

        <SettingRow
          icon={Bell}
          title="Enable Low Stock Alert"
          description="Get notified when stock is low"
          enabled={settings.lowStock}
          setting="lowStock"
        />

        <SettingRow
          icon={Volume2}
          title="Enable Sale Sound"
          description="Play sound on successful sale"
          enabled={settings.saleSound}
          setting="saleSound"
        />

        <SettingRow
          icon={Printer}
          title="Auto Print Receipt"
          description="Automatically print receipt after sale"
          enabled={settings.autoPrint}
          setting="autoPrint"
        />

        <SettingRow
          icon={Trash2}
          title="Confirm Before Deleting"
          description="Show confirmation before deleting records"
          enabled={settings.confirmDelete}
          setting="confirmDelete"
        />
      </div>
    </div>
  );
}

export default ApplicationSettings;