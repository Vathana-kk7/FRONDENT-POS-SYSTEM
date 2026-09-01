import { useState } from "react";
import CategoryService from "../service/CategoryService";

export const useCategoryExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState(null);

  const handleExport = async (type = "excel", filters = {}) => {
    setIsExporting(true);
    setExportError(null);

    try {
      const response = await CategoryService.exportCategory(type, filters);

      let fileName = `categories_${new Date().toISOString().slice(0, 10)}.${type === 'excel' ? 'xlsx' : type}`;
      const contentDisposition = response.headers?.["content-disposition"];
      
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          fileName = match[1];
        }
      }

      const blob = new Blob([response.data], {
        type: response.headers?.["content-type"] || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);

      let errorMessage = "Failed to export data. Please try again.";

      // ស្រាយបក Blob Error ទៅជា JSON Object វិញដើម្បីមើល Error ដើម
      if (error.response && error.response.data instanceof Blob) {
        try {
          const errorText = await error.response.data.text();
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorMessage;
        } catch (e) {
          // បើបម្លែងជា JSON មិនបាន (ឧ. HTML Error Page)
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setExportError(errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    handleExport,
    isExporting,
    exportError,
  };
};

export default useCategoryExport;