import { Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useCreateCategory from "../hook/useCreateCategory";

function ModelCategory({ onClose,selectedCategory=null,editeCategory,isPending ,createCategory}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      status: "active", // កំណត់ Default Value ជា active
      description: "",
    },
  });
  const isSelecting=Boolean(selectedCategory);
  console.log(selectedCategory);

  // set data to formInput
  useEffect(()=>{
    if(selectedCategory){
      reset({
        name:selectedCategory.name || "",
        status:selectedCategory.status || "active",
        description:selectedCategory.description || ""
      })
    }else{
      reset({
        name:"",
        status:"",
        description:""
      });
    }
  },[selectedCategory,reset]);
  const onSubmit = async (data) => {
   try {
     if(isSelecting){
      await editeCategory({
        id:selectedCategory.id,
        data,
      })
    }else{
      await createCategory(data);
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
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 p-6">
          <div>
            <h1 className="text-xl font-semibold">Add New Category</h1>
            <p className="mt-1 text-sm text-gray-600">
              Enter the details of the new category
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 p-6">
            {/* Category Name */}
            <div>
              <label className="font-semibold">
                Category Name
                <span className="ml-1 text-red-600">*</span>
              </label>

              <input
                type="text"
                placeholder="Enter category name"
                {...register("name")}
                className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Status Select */}
            <div>
              <label className="font-semibold">
                Status
                <span className="ml-1 text-red-600">*</span>
              </label>

              <select
                {...register("status")}
                className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition cursor-pointer ${
                  errors.status
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                }`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold">Description</label>

              <textarea
                rows="4"
                placeholder="Enter category description"
                {...register("description")}
                className={`mt-1 w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 ${
                  errors.description
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 border-t border-gray-200 p-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2 text-black transition hover:bg-gray-100"
            >
              Cancel
            </button>

           <button
              type="submit"
              disabled={isPending || (isSelecting && !isDirty)} // ប្រើ isPending
              className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-blue-800 px-5 py-2 text-sm text-white transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending
                ? isSelecting
                  ? "Updating..."
                  : "Saving..."
                : isSelecting
                ? "Update Category"
                : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModelCategory;