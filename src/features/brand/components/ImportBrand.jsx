import {
    Download,
    File,
    FileSpreadsheet,
    FileText
} from "lucide-react";

import React, {
    useEffect,
    useRef,
    useState
} from "react";

import { useImportBrand } from "../hooks/useImportBrand";

function ImportBrand() {
    const [isImportOpen, setIsImportOpen] = useState(false);

    // File input ref
    const fileInputRef = useRef(null);

    // Dropdown container ref
    const dropdownRef = useRef(null);

    const {
        mutate: importBrand,
        isPending
    } = useImportBrand();

    // ==========================================
    // Close dropdown when clicking outside
    // ==========================================
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsImportOpen(false);
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

    // ==========================================
    // Handle file selection
    // ==========================================
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            importBrand(file, {
                onSuccess: () => {
                    setIsImportOpen(false);
                }
            });

            e.target.value = "";
        }
    };

    return (
        <div
            ref={dropdownRef}
            className="relative"
        >
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
                className="hidden"
            />

            {/* Import Button */}
            <button
                type="button"
                disabled={isPending}
                onClick={() =>
                    setIsImportOpen((prev) => !prev)
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
                    {isPending
                    ? "Importing..."
                    : "Import"}
                </span>
            </button>

            {/* Dropdown */}
            {isImportOpen && (
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
                        animate-[dropdown_0.2s_ease-out]
                    "
                >
                    {/* PDF */}
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            px-3
                            py-3
                            rounded-lg
                            cursor-not-allowed
                            opacity-50
                        "
                    >
                        <FileText
                            size={20}
                            className="text-red-500"
                        />

                        <span className="font-medium text-gray-700">
                            CSV File
                        </span>
                    </div>

                    {/* DOC */}
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            px-3
                            py-3
                            rounded-lg
                            cursor-not-allowed
                            opacity-50
                        "
                    >
                        <File
                            size={20}
                            className="text-blue-500"
                        />

                        <span className="font-medium text-gray-700">
                            DOC File
                        </span>
                    </div>

                    {/* Excel */}
                    <div
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="
                            flex
                            items-center
                            gap-3
                            px-3
                            py-3
                            rounded-lg
                            cursor-pointer
                            hover:bg-green-50
                            transition
                        "
                    >
                        <FileSpreadsheet
                            size={20}
                            className="text-green-600"
                        />

                        <span className="font-medium text-gray-700">
                            Excel File
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImportBrand;