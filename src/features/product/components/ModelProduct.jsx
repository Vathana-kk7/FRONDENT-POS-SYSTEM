import { Loader2, Option, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useGetAllCategory from "../../category/hook/useGetAllCategory";
import useBrands from "../../brand/hooks/useBrand";
import useDebounce from "../../brand/hooks/useDebounce";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { productSchema } from "../schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
function ModelProduct({ onClose, onSubmitApi, isPending }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      barcode: "",
      category_id: "",
      status: "active",
      product_type: "",
      brand_id: "",
      selling_price: "",
      cost_price: "",
      stock_qty: "",
      min_stock_level: "",
      description: "",
    },
  });
  // const {category}=useGetAllCategory();
    const [categorySearch, setCategorySearch] = useState("");

const debouncedCategorySearch = useDebounce(categorySearch, 300);

const {
  category,
  isLoading: isCategoryLoading,
} = useGetAllCategory({
  page: 1,
  perPage: 10,
  search: debouncedCategorySearch,
});
  //Brand
  const [brandSearch, setBrandSearch] = useState("");
  const debouncedBrandSearch = useDebounce(brandSearch, 300);

  const {
    brands,
    isLoading: isBrandLoading,
  } = useBrands({
    page: 1,
    per_page: 10,
    search: debouncedBrandSearch,
  });
  const clearPreview = () => { setPreviewImage(null); };
const handleFormSubmit = async (data, shouldReset = false) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    // Image
    if (key === "image") {
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }
      return;
    }

    // Other fields
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  try {
    if (onSubmitApi) {
      await onSubmitApi(formData);
    } else {
      console.log(
        "Submitting FormData:",
        Object.fromEntries(formData)
      );
    }

    // =========================
    // Save & Add Another
    // =========================
    if (shouldReset) {
      reset({
        name: "",
        sku: "",
        category_id: "",
        status: "active",
        product_type: "",
        brand_id: "",
        selling_price: "",
        cost_price: "",
        stock_qty: "",
        min_stock_level: "",
        description: "",
        image: undefined,
      });

      clearPreview();

      // Clear search text
      setBrandSearch("");
      setCategorySearch("");

      return;
    }

    // =========================
    // Save Product
    // =========================
    onClose();

  } catch (error) {
    console.error("API submission error:", error);
  }
};
  const [previewImage, setPreviewImage] =useState(null);
  const image = watch("image");

useEffect(() => {
  if (!image || image.length === 0) {
    setPreviewImage(null);
    return;
  }

  const imageUrl = URL.createObjectURL(image[0]);

  setPreviewImage(imageUrl);

  return () => {
    URL.revokeObjectURL(imageUrl);
  };
}, [image]);



  return (
    <form
      onSubmit={handleSubmit((data) => handleFormSubmit(data, false))}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
    >
      <div className="bg-white w-[1100px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-start pb-5 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-medium">Add New Product</h1>
            <p className="text-gray-600">Enter the details of the new product</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="pt-5 flex gap-x-5">
          <div className="w-1/3">
            <div className="mb-3">
              <h1 className="font-semibold">
                Product Photos <span className="text-red-600">*</span>
              </h1>
              <p className="text-gray-600 font-normal text-sm">
                Upload one or more photos of the product
              </p>
            </div>
            <div className="flex items-center justify-center w-full max-w-lg mx-auto">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-indigo-300 border-dashed rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/50 transition-colors overflow-hidden"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Product Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className="p-3 mb-3 bg-indigo-50 text-indigo-600 rounded-xl">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    <p className="mb-1 text-sm font-semibold text-slate-700">
                      Click to upload
                      <span className="font-normal text-slate-500">
                        {" "}or drag and drop
                      </span>
                    </p>

                    <p className="text-xs text-slate-400">
                      PNG, JPG, JPEG up to 5MB each
                    </p>
                  </div>
                )}

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                  {...register("image")}
                />
              </label>
            </div>
          </div>

          <div className="w-2/3 space-y-4">
            <div>
              <label className="font-semibold text-sm">
                Product Name <span className="text-red-600">*</span>
              </label>
              <input
                {...register("name")}
                className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none focus:ring-2 text-sm text-gray-800 placeholder:text-gray-400 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:ring-blue-800"
                }`}
                type="text"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label className="font-semibold text-sm">
                  SKU <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("sku")}
                  className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none text-sm ${
                    errors.sku
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:ring-2 focus:ring-blue-800"
                  }`}
                  type="text"
                  placeholder="Enter SKU"
                />

                {errors.sku && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.sku.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="font-semibold text-sm">
                  Barcode
                  <span className="ml-2 text-xs text-gray-400">
                    (Auto Generated)
                  </span>
                </label>

                <input
                  value="Auto generated by system"
                  readOnly
                  className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg
                    bg-gray-50 text-gray-500 cursor-not-allowed
                    outline-none text-sm"
                  type="text"
                />
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label className="font-semibold text-sm">
                  Category <span className="text-red-600">*</span>
                </label>

                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={
                        category?.find(
                          (item) => String(item.id) === String(field.value)
                        )
                          ? {
                              value: field.value,
                              label: category.find(
                                (item) => String(item.id) === String(field.value)
                              ).name,
                            }
                          : null
                      }
                      options={
                        category?.map((item) => ({
                          value: item.id,
                          label: item.name,
                        })) || []
                      }
                      isLoading={isCategoryLoading}
                      isClearable
                      isSearchable
                      placeholder="Search category..."
                      maxMenuHeight={200}
                      menuPlacement="auto"
                      onInputChange={(value, action) => {
                        if (action.action === "input-change") {
                          setCategorySearch(value);
                        }
                      }}
                      onChange={(option) => {
                        field.onChange(option?.value || "");
                      }}
                      className="mt-2"
                    />
                  )}
                />

                {errors.category_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category_id.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="font-semibold text-sm">
                  Status <span className="text-red-600">*</span>
                </label>
                <select
                  {...register("status")}
                  className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none ${
                    errors.status
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label className="font-semibold text-sm">
                  Product Type <span className="text-red-600">*</span>
                </label>
                <input
                  {...register("product_type")}
                  className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none text-sm ${
                    errors.product_type
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  type="text"
                  placeholder="Enter product type"
                />

                {errors.product_type && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.product_type.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="font-semibold text-sm">
                  Brand <span className="text-red-600">*</span>
                </label>

                <Controller
                  name="brand_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={
                        brands?.find(
                          (brand) => String(brand.id) === String(field.value)
                        )
                          ? {
                              value: field.value,
                              label: brands.find(
                                (brand) => String(brand.id) === String(field.value)
                              ).name,
                            }
                          : null
                      }
                      options={
                        brands?.map((brand) => ({
                          value: brand.id,
                          label: brand.name,
                        })) || []
                      }
                      isLoading={isBrandLoading}
                      isClearable
                      isSearchable
                      placeholder="Search brand..."
                      maxMenuHeight={200}
                      menuPlacement="auto"
                      onInputChange={(value, action) => {
                        if (action.action === "input-change") {
                          setBrandSearch(value);
                        }
                      }}
                      onChange={(option) => {
                        field.onChange(option?.value || "");
                      }}
                      className="mt-2"
                    />
                  )}
                />

                {errors.brand_id && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.brand_id.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Quantities */}
        <div className="flex gap-4 mt-5">
          <div className="w-1/4">
            <label className="font-semibold text-sm">
              Selling Price <span className="text-red-600">*</span>
            </label>
            <input
                {...register("selling_price",{valueAsNumber:true})}
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none ${
                  errors.selling_price
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              {errors.selling_price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.selling_price.message}
                </p>
              )}
          </div>
          <div className="w-1/4">
            <label className="font-semibold text-sm">
              Cost Price <span className="text-red-600">*</span>
            </label>
            <input
                {...register("cost_price",{valueAsNumber:true})}
                type="number"
                step="0.01"
                placeholder="0.00"
                className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none ${
                  errors.cost_price
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              {errors.cost_price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cost_price.message}
                </p>
              )}
          </div>
          <div className="w-1/4">
            <label className="font-semibold text-sm">
              Stock Quantity <span className="text-red-600">*</span>
            </label>
            <input
                {...register("stock_qty", { valueAsNumber: true })}
                type="number"
                min="0"
                placeholder="0"
                className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none ${
                  errors.stock_qty
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              {errors.stock_qty && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.stock_qty.message}
                </p>
              )}
          </div>
          <div className="w-1/4">
            <label className="font-semibold text-sm">
              Low Stock Alert <span className="text-red-600">*</span>
            </label>
            <input
                {...register("min_stock_level", {
                  valueAsNumber: true,
                })}
                type="number"
                min="0"
                placeholder="0"
                className={`mt-2 w-full py-2 px-3 border rounded-lg outline-none ${
                  errors.min_stock_level
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:ring-2 focus:ring-blue-800"
                }`}
              />

              {errors.min_stock_level && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.min_stock_level.message}
                </p>
              )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <label className="font-semibold text-sm">
            Description (Optional)
          </label>
          <input
            {...register("description")}
            className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 text-sm text-gray-800 placeholder:text-gray-400"
            type="text"
            placeholder="Enter product description"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <div>
          <button
            type="button"
            disabled={isPending}
            onClick={handleSubmit((data) =>
              handleFormSubmit(data, true)
            )}
            className="bg-blue-800 hover:bg-blue-900 disabled:opacity-50 
                      disabled:cursor-not-allowed p-2 px-5 text-white 
                      cursor-pointer rounded-lg transition-colors 
                      flex items-center gap-2"
          >
            {isPending && (
              <Loader2
                size={16}
                className="animate-spin"
              />
            )}

            {isPending ? "Saving..." : "Save & Add Another"}
          </button>

          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white hover:bg-gray-50 p-2 px-5 text-black border border-gray-300 cursor-pointer rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-800 hover:bg-blue-900 disabled:opacity-50 
                        disabled:cursor-not-allowed p-2 px-5 text-white 
                        cursor-pointer rounded-lg transition-colors 
                        flex items-center gap-2"
            >
              {isPending && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {isPending ? "Saving..." : "Save Product"}
            </button>

          </div>
        </div>
      </div>
    </form>
  );
}

export default ModelProduct;