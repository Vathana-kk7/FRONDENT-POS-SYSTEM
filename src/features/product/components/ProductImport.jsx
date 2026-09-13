import { Download, FileSpreadsheet, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useProductImport } from "../hook/useProductImport";

function ProductImport() {
  const [isImportOpen, setIsImportOpen] = useState(false);

  const { mutate: ImportProduct, isPending } = useProductImport();

  const importRef = useRef(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // =========================
  // Close dropdown when clicking outside
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        importRef.current &&
        !importRef.current.contains(event.target)
      ) {
        setIsImportOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================
  // Submit Import
  // =========================
  const onSubmit = (data) => {
    const selectedFile = data.file?.[0];

    if (!selectedFile) {
      return;
    }

    ImportProduct(selectedFile, {
      onSuccess: () => {
        setIsImportOpen(false);
        reset();
      },
    });
  };

  // =========================
  // React Hook Form File Register
  // =========================
  const { ref: registerRef, ...fileRegister } = register("file", {
    required: "Please select a file.",

    onChange: (e) => {
      if (e.target.files?.length) {
        handleSubmit(onSubmit)();
      }
    },
  });

  return (
    <div ref={importRef}>
      <div className="relative">

        {/* =========================
            Import Button
        ========================= */}
        <button
          type="button"
          onClick={() => setIsImportOpen((prev) => !prev)}
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
          "
        >
          <Download size={20} />

          <span className="ms-2">
            Import
          </span>
        </button>

        {/* =========================
            Dropdown
        ========================= */}
        {isImportOpen && (
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Hidden File Input */}
            <input
              type="file"
              accept=".xlsx,.xls,.csv,.zip"
              className="hidden"
              {...fileRegister}
              ref={(e) => {
                registerRef(e);
                fileInputRef.current = e;
              }}
            />

            {/* Validation Error */}
            {errors.file && (
              <div className="mb-2 flex items-center gap-1 p-1 text-xs text-red-500">
                <AlertCircle
                  size={14}
                  className="shrink-0"
                />

                <span>
                  {errors.file.message}
                </span>
              </div>
            )}

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
              {/* =========================
                  ZIP Import
              ========================= */}
              <div
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
                onClick={() => {
                  if (!isPending) {
                    fileInputRef.current?.click();
                  }
                }}
              >
                <FileSpreadsheet
                  size={20}
                  className="text-green-600"
                />

                <span className="font-medium text-gray-700">
                  {isPending ? "Importing..." : "Zip File"}
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductImport;