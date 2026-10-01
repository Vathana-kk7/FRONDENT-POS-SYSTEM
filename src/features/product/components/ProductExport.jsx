import React, { useEffect, useRef, useState } from "react";
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import { showToast } from "../../../utils/toast";
import { useExportProduct } from "../hook/useExportProduct";

// Read the real error message when the backend returns JSON inside a Blob
const getBlobErrorMessage = async (error) => {
  const data = error?.response?.data;
  if (data instanceof Blob) {
    try {
      const text = await data.text();
      return JSON.parse(text).message || text;
    } catch {
      return error.message;
    }
  }
  return data?.message || error.message;
};

function ProductExport({ filter = {} }) {
  const [isExportOpen, setIsExportOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { exportProduct, isExporting } = useExportProduct();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = async (type) => {
    setIsExportOpen(false);

    const isPdf = type === "pdf";
    const ext = isPdf ? "pdf" : "xlsx";
    const label = isPdf ? "PDF" : "Excel";

    try {
      const response = await exportProduct({ type, filter });

      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `products_${new Date().toISOString().slice(0, 10)}.${ext}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showToast(`ទាញយក Product ${label} បានជោគជ័យ!`, "success");
    } catch (error) {
      const msg = await getBlobErrorMessage(error);
      console.error(`${label} Export Error:`, msg);
      showToast(`មានបញ្ហាក្នុងការទាញយក ${label}! ${msg}`, "error");
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        disabled={isExporting}
        onClick={() => setIsExportOpen((prev) => !prev)}
        className="flex h-11 w-40 items-center justify-center rounded-xl border border-gray-200 bg-white text-black shadow-lg transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {isExporting ? (
          <Loader2 size={20} className="animate-spin text-gray-600" />
        ) : (
          <Download size={20} />
        )}
        <span className="ml-2">{isExporting ? "Exporting..." : "Export"}</span>
      </button>

      {isExportOpen && (
        <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          <button
            type="button"
            disabled={isExporting}
            onClick={() => handleDownload("pdf")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-red-50 cursor-pointer"
          >
            <FileText size={20} className="text-red-500" />
            <span className="font-medium text-gray-700">PDF File</span>
          </button>

          <button
            type="button"
            disabled={isExporting}
            onClick={() => handleDownload("excel")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-green-50 cursor-pointer"
          >
            <FileSpreadsheet size={20} className="text-green-600" />
            <span className="font-medium text-gray-700">Excel File</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductExport;