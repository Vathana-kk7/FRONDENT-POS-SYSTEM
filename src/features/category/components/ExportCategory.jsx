import React, { useEffect, useRef, useState } from "react";
import {
  Download,
  FileText,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import { useExportCategory } from "../hook/useExportCategory";
import { showToast } from "../../../utils/toast";

function ExportCategory({ filters = {} }) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { exportCategory, isExporting } = useExportCategory();

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
    const handlePdfDownload = async () => {
        setIsExportOpen(false);

        try {
            const response = await exportCategory({
                type: "pdf",
                filters,
            });

            const blob = response.data;

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download = `categories_${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            showToast(
                "ទាញយក Category PDF បានជោគជ័យ!",
                "success"
            );

        } catch (error) {
            console.error(
                "PDF Export Error:",
                error
            );

            showToast(
                "មានបញ្ហាក្នុងការទាញយក PDF!",
                "error"
            );
        }
    };

   const handleExcelDownload = async () => {
          setIsExportOpen(false);
  
          try {
              const response = await exportCategory({
                  type: "excel",
                  filters,
              });
  
              const blob = response.data;
  
              const url =
                  window.URL.createObjectURL(blob);
  
              const link =
                  document.createElement("a");
  
              link.href = url;
  
              link.download = `categories_${new Date()
                  .toISOString()
                  .slice(0, 10)}.xlsx`;
  
              document.body.appendChild(link);
  
              link.click();
  
              link.remove();
  
              window.URL.revokeObjectURL(url);
  
              showToast(
                  "ទាញយក Category Excel បានជោគជ័យ!",
                  "success"
              );
  
          } catch (error) {
              console.error(
                  "Excel Export Error:",
                  error
              );
  
              showToast(
                  "មានបញ្ហាក្នុងការទាញយក Excel!",
                  "error"
              );
          }
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
            onClick={handlePdfDownload}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-3
              text-left transition
              hover:bg-red-50
              cursor-pointer
            "
          >
            <FileText size={20} className="text-red-500" />
            <span className="font-medium text-gray-500">PDF File</span>
          </button>

          {/* Excel */}
          <button
            type="button"
            disabled={isExporting}
            onClick={
              handleExcelDownload
            }
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
        </div>
      )}
    </div>
  );
}

export default ExportCategory;