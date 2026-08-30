
import React, { useEffect, useRef, useState } from "react";
import {
  Download,
  FileText,
  File,
  FileSpreadsheet,
} from "lucide-react";

function ExportCategory() {
const [isExportOpen, setIsExportOpen]=useState(false);
  const dropdownRef = useRef(null);

  // =========================
  // Close dropdown when clicking outside
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsExportOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [setIsExportOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* =========================
          Export Button
      ========================= */}
      <button
        type="button"
        onClick={() =>
          setIsExportOpen((prev) => !prev)
        }
        className="
          flex h-11 w-40 items-center justify-center
          rounded-xl border border-gray-200
          bg-white text-black shadow-lg
          transition hover:bg-gray-50
          cursor-pointer
        "
      >
        <Download size={20} />

        <span className="ml-2">
          Export
        </span>
      </button>

      {/* =========================
          Export Dropdown
      ========================= */}
      {isExportOpen && (
        <div
          className="
            absolute right-0 top-14 z-50 w-48
            rounded-xl border border-gray-200
            bg-white p-2 shadow-xl
          "
        >
          {/* CSV */}
          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-red-50
              cursor-pointer
            "
          >
            <FileText
              size={20}
              className="text-red-500"
            />

            <span className="font-medium text-gray-500">
              CSV File
            </span>
          </button>

          {/* DOC */}
          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-blue-50
              cursor-pointer
            "
          >
            <File
              size={20}
              className="text-blue-400"
            />

            <span className="font-medium text-gray-500">
              DOC File
            </span>
          </button>

          {/* Excel */}
          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-green-50
              cursor-pointer
            "
          >
            <FileSpreadsheet
              size={20}
              className="text-green-600"
            />

            <span className="font-medium text-gray-700">
              Excel File
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ExportCategory;
