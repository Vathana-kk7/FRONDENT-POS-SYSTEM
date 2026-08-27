import { useEffect, useState } from "react";
import {
    Download,
    FileSpreadsheet,
    FileText,
} from "lucide-react";

import { useExportBrand } from "../hooks/useExportBrand";
import { showToast } from "../../../utils/toast";

function ExportBrand({ filters = {} }) {
    const [isExportOpen, setIsExportOpen] = useState(false);

    const { exportBrand, isExporting } = useExportBrand();

    // Close dropdown when click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdown = document.querySelector(
                "[data-export-dropdown]"
            );

            if (
                dropdown &&
                !dropdown.contains(event.target)
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
    }, []);

    // =========================
    // PDF Download
    // =========================
    const handlePdfDownload = async () => {
        setIsExportOpen(false);

        try {
            const response = await exportBrand({
                type: "pdf",
                filters,
            });

            const blob = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download = `brands_${new Date()
                .toISOString()
                .slice(0, 10)}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            showToast(
                "ទាញយក Brand PDF បានជោគជ័យ!",
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

    // =========================
    // Excel Download
    // =========================
    const handleExcelDownload = async () => {
        setIsExportOpen(false);

        try {
            const response = await exportBrand({
                type: "excel",
                filters,
            });

            const blob = new Blob(
                [response.data],
                {
                    type:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                }
            );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download = `brands_${new Date()
                .toISOString()
                .slice(0, 10)}.xlsx`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            showToast(
                "ទាញយក Brand Excel បានជោគជ័យ!",
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
        <div
            className="relative"
            data-export-dropdown
        >

            {/* Main Export Button */}
            <button
                type="button"
                disabled={isExporting}
                onClick={() =>
                    setIsExportOpen(
                        (prev) => !prev
                    )
                }
                className="
                    bg-white
                    flex
                    justify-center
                    items-center
                    text-black
                    w-40
                    h-11
                    rounded-xl
                    shadow-lg
                    border
                    border-gray-200
                    cursor-pointer
                    hover:bg-gray-50
                    transition
                    disabled:opacity-50
                "
            >
                <Download size={20} />

                <span className="ms-2">
                    {isExporting
                        ? "Exporting..."
                        : "Export"}
                </span>
            </button>

            {/* Dropdown */}
            {isExportOpen && (
                <div
                    className="
                        absolute
                        right-0
                        top-14
                        z-50
                        w-48
                        bg-white
                        border
                        border-gray-200
                        rounded-xl
                        shadow-xl
                        p-2
                    "
                >

                    {/* PDF */}
                    <button
                        type="button"
                        disabled={isExporting}
                        onClick={
                            handlePdfDownload
                        }
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3
                            py-3
                            rounded-lg
                            hover:bg-red-50
                            transition
                            cursor-pointer
                            disabled:opacity-50
                        "
                    >
                        <FileText
                            size={20}
                            className="text-red-500"
                        />

                        <span className="font-medium">
                            PDF File
                        </span>
                    </button>

                    {/* Excel */}
                    <button
                        type="button"
                        disabled={isExporting}
                        onClick={
                            handleExcelDownload
                        }
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-3
                            py-3
                            rounded-lg
                            hover:bg-green-50
                            transition
                            cursor-pointer
                            disabled:opacity-50
                        "
                    >
                        <FileSpreadsheet
                            size={20}
                            className="text-green-600"
                        />

                        <span className="font-medium">
                            Excel File
                        </span>
                    </button>

                </div>
            )}
        </div>
    );
}

export default ExportBrand;