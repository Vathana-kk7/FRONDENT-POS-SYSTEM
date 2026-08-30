import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  FileText,
  File,
  FileSpreadsheet,
} from "lucide-react";
import { useCategoryImport } from "../hook/useCategoryImport";
import { useForm } from "react-hook-form";
import { importCategorySchema } from "../schema/importCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";

function ImportCategory() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const {mutate:ImportCategory,isPending}=useCategoryImport();
  const importRef = useRef(null);
  const fileInputRef = useRef(null); // useRef សម្រាប់ Trigger File Input
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  }=useForm({
    resolver:zodResolver(importCategorySchema),
  });
  const onSubmit=(data)=>{
    const selectedFile=data.file[0];
    ImportCategory(selectedFile,{
      onSuccess:()=>{
        setIsImportOpen(false);
        reset();
      }
    })
  }
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
  // 5. Destructure register ref ដើម្បីច្របាច់បញ្ចូលគ្នាជាមួយ useRef
  const { ref: registerRef, ...fileRegister } = register("file", {
    onChange: (e) => {
      if (e.target.files?.length) {
        handleSubmit(onSubmit)();
      }
    },
  });
  return (
    <div
      ref={importRef}
      className="relative"
    >
      {/* =========================
          Import Button
      ========================= */}
      <button
        type="button"
        onClick={() =>
          setIsImportOpen((prev) => !prev)
        }
        disabled={isPending}
        className="
          flex
          h-11
          w-40
          items-center
          justify-center
          rounded-xl
          border
          border-gray-200
          bg-white
          text-black
          shadow-lg
          transition
          hover:bg-gray-50
          cursor-pointer
        "
      >
        <Upload size={20} />

        <span className="ml-2">
          {isPending? "Importing..." :"Import"}
        </span>
      </button>

      {/* =========================
          Import Dropdown
      ========================= */}
      {isImportOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            absolute
            right-0
            top-14
            z-50
            w-48
            rounded-xl
            border
            border-gray-200
            bg-white
            p-2
            shadow-xl
          "
        >
          {/* Hidden File Input Managed by React Hook Form */}
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              {...fileRegister}
              ref={(e) => {
                registerRef(e);
                fileInputRef.current = e; // ភ្ជាប់ ref ទៅកាន់ fileInputRef
              }}
            />
            {/* Validation Error Message */}
            {errors.file && (
              <div className="mb-2 flex items-center gap-1 p-1 text-xs text-red-500">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errors.file.message}</span>
              </div>
            )}
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

          {/* ================= DOC ================= */}
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
                Doc File
            </span>
        </div>

          {/* ================= Excel ================= */}
          {/* Excel File Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()} // 6. បន្ថែម trigger ពេលចុច
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-green-50"
          >
            <FileSpreadsheet size={20} className="text-green-600" />
            <span className="font-medium text-gray-700">Excel File</span>
          </button>

          
        </form>
      )}
    </div>
  );
}

export default ImportCategory;
