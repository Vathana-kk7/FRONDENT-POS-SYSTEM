import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

import { useExportBrand } from "../hooks/useExportBrand";
import BrandPdfTemplate from "./BrandPdfTemplate";
import { showToast } from "../../../utils/toast";

function ExportBrand({ filters = {}, brandData = [] }) {
    const [isExportOpen, setIsExportOpen] = useState(false);
    const pdfRef = useRef(null);
    const dropdownRef = useRef(null); // Ref សម្រាប់ចាប់ Click Outside

    const { exportBrand, isExporting } = useExportBrand();

    // Hook សម្រាប់បិទ Dropdown ពេលចុចខាងក្រៅ
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

    // មុខងារ Render PDF លើ Frontend React
    const handlePdfDownload = async () => {
        setIsExportOpen(false);
        const element = pdfRef.current;

        const options = {
            margin: 10,
            filename: `brands_${new Date().toISOString().slice(0, 10)}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { 
                scale: 2,
                onclone: (clonedDoc) => {
                    const elements = clonedDoc.querySelectorAll('*');
                    elements.forEach(el => {
                        const computedStyle = window.getComputedStyle(el);
                        if (computedStyle.color.includes('oklch')) {
                            el.style.color = '#333333';
                        }
                    });
                }
            },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        };

        try {
            await html2pdf().set(options).from(element).save();
            showToast("ទាញយកទិន្នន័យ Brand ជា PDF បានជោគជ័យ!", "success");
        } catch (error) {
            console.error("PDF Export Error:", error);
            showToast("មានបញ្ហាក្នុងការទាញយក File PDF!", "error");
        }
    };

    // មុខងារ Download Excel ពី Backend Laravel
    const handleExcelDownload = () => {
        exportBrand({ type: "excel", filters });
        setIsExportOpen(false);
    };

    return (
        /* ភ្ជាប់ dropdownRef ត្រង់ div.relative នេះ */
        <div className="relative" ref={dropdownRef}>
            <BrandPdfTemplate ref={pdfRef} data={brandData} />

            {/* Main Export Button */}
            <button
                type="button"
                disabled={isExporting}
                onClick={() => setIsExportOpen((prev) => !prev)}
                className="bg-white flex justify-center items-center text-black w-40 h-11 rounded-xl shadow-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition disabled:opacity-50"
            >
                <Download size={20} />
                <span className="ms-2">
                    {isExporting ? "Exporting..." : "Export"}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isExportOpen && (
                <div className="absolute right-0 top-14 z-50 w-48 bg-white border border-gray-200 rounded-xl shadow-xl p-2">
                    <button
                        type="button"
                        onClick={handlePdfDownload}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 transition cursor-pointer"
                    >
                        <FileText size={20} className="text-red-500" />
                        <span className="font-medium">PDF File</span>
                    </button>

                    <button
                        type="button"
                        disabled={isExporting}
                        onClick={handleExcelDownload}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-green-50 transition cursor-pointer"
                    >
                        <FileSpreadsheet size={20} className="text-green-600" />
                        <span className="font-medium">Excel File</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExportBrand;