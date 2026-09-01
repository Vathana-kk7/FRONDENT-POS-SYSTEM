import React, { useEffect, useRef, useState } from "react";
import {
  Download,
  FileText,
  File,
  FileSpreadsheet,
  Loader2,
  FileJson,
} from "lucide-react";
import useCategoryExport from "../hook/useExportCategory";

function ExportCategory({ filters = {} }) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { handleExport, isExporting } = useCategoryExport();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsExportOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const triggerExport = async (type) => {
    setIsExportOpen(false);
    await handleExport(type, filters);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Export Button */}
      <button
        type="button"
        disabled={isExporting}
        onClick={() => setIsExportOpen((prev) => !prev)}
        className="
          flex h-11 w-40 items-center justify-center
          rounded-xl border border-gray-200
          bg-white text-black shadow-lg
          transition hover:bg-gray-50
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
        "
      >
        {isExporting ? (
          <Loader2 size={20} className="animate-spin text-gray-600" />
        ) : (
          <Download size={20} />
        )}

        <span className="ml-2">
          {isExporting ? "Exporting..." : "Export"}
        </span>
      </button>

      {/* Export Dropdown */}
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
            onClick={() => triggerExport("csv")}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-red-50
              cursor-pointer
            "
          >
            <FileText size={20} className="text-red-500" />
            <span className="font-medium text-gray-500">CSV File</span>
          </button>

          {/* DOC */}
          <button
            type="button"
            onClick={() => triggerExport("doc")}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-blue-50
              cursor-pointer
            "
          >
            <File size={20} className="text-blue-400" />
            <span className="font-medium text-gray-500">DOC File</span>
          </button>

          {/* Excel */}
          <button
            type="button"
            onClick={() => triggerExport("excel")}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-green-50
              cursor-pointer
            "
          >
            <FileSpreadsheet size={20} className="text-green-600" />
            <span className="font-medium text-gray-700">Excel File</span>
          </button>

          {/* PDF */}
          <button
            type="button"
            onClick={() => triggerExport("pdf")}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-red-50
              cursor-pointer
            "
          >
            <FileJson size={20} className="text-red-600" />
            <span className="font-medium text-gray-700">PDF File</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ExportCategory;