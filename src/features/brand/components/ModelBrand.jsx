import { X, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { brandSchema } from "../schema/brandSchema";

function ModelBrand({
  onClose,
  createBrand,
  isPending,
  editBrand,
  editingBrand = null,
}) {
  const isEditing = Boolean(editingBrand);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      status: "active",
    },
  });

  // Sync Form Data ពេលមានការ Edit
  useEffect(() => {
    if (editingBrand) {
      reset({
        name: editingBrand.name || "",
        status: editingBrand.status || "active",
      });
    } else {
      reset({
        name: "",
        status: "active",
      });
    }
  }, [editingBrand, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await editBrand({
          id: editingBrand.id,
          data,
        });
      } else {
        await createBrand(data);
      }
      onClose();
    } catch (error) {
      // ទទួល Error ពី Backend API (ឧ. Brand name មានរួចហើយ)
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field, { message: serverErrors[field][0] });
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-[550px] rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 bg-gray-50/50">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {isEditing ? "Edit Brand" : "Add New Brand"}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {isEditing
                ? "Update existing product brand details"
                : "Create a new product brand for your store"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 px-6 py-6">
            
            {/* Brand Name */}
            <div>
              <label
                htmlFor="brand-name"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700"
              >
                Brand Name <span className="text-red-500">*</span>
              </label>

              <input
                id="brand-name"
                type="text"
                placeholder="e.g. Dell, HP, Lenovo"
                {...register("name")}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                }`}
              />

              {errors.name ? (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.name.message}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-400">
                  Example: Dell, HP, Lenovo, ASUS
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="brand-status"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-700"
              >
                Status <span className="text-red-500">*</span>
              </label>

              <select
                id="brand-status"
                {...register("status")}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition cursor-pointer focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {errors.status && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || (isEditing && !isDirty)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-800 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending
                ? isEditing ? "Updating..." : "Saving..."
                : isEditing ? "Update Brand" : "Save Brand"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModelBrand;