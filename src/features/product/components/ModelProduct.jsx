
import { Loader2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import useGetAllCategory from "../../category/hook/useGetAllCategory";
import useBrands from "../../brand/hooks/useBrand";
import useDebounce from "../../brand/hooks/useDebounce";
import { productSchema } from "../schema/productSchema";
function ModelProduct({
  onClose,
  onSubmitApi,
  isPending,
  selectedProduct = null,
  editeProduct,
  isEditing = false,
}) {
  // FORM
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
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
      image: undefined,
    },
  });
  // IMAGE
  const [previewImage, setPreviewImage] = useState(null);
  const image = watch("image");
  // CATEGORY SEARCH
  const [categorySearch, setCategorySearch] = useState("");

  const debouncedCategorySearch = useDebounce(
    categorySearch,
    300
  );
  const {
    category = [],
    isLoading: isCategoryLoading,
  } = useGetAllCategory({
    page: 1,
    perPage: 10,
    search: debouncedCategorySearch,
  });
  // BRAND SEARCH
  const [brandSearch, setBrandSearch] = useState("");
  const debouncedBrandSearch = useDebounce(
    brandSearch,
    300
  );

  const {
    brands = [],
    isLoading: isBrandLoading,
  } = useBrands({
    page: 1,
    per_page: 10,
    search: debouncedBrandSearch,
  });
  // RESET FORM
  const resetProductForm = () => {
    reset({
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
      image: undefined,
    });

    setPreviewImage(null);
    setBrandSearch("");
    setCategorySearch("");
  };
  // EDIT / CREATE INITIALIZATION
  useEffect(() => {
    // CREATE MODE
    if (!selectedProduct) {
      resetProductForm();
      return;
    }
    // EDIT MODE
    reset({
      name: selectedProduct.name ?? "",

      sku: selectedProduct.sku ?? "",

      barcode: selectedProduct.barcode ?? "",

      category_id:
        selectedProduct.category_id ??
        selectedProduct.category?.id ??
        "",

      status:
        selectedProduct.status ??
        "active",

      product_type:
        selectedProduct.product_type ??
        "",

      brand_id:
        selectedProduct.brand_id ??
        selectedProduct.brand?.id ??
        "",

      selling_price:
        selectedProduct.selling_price ??
        "",

      cost_price:
        selectedProduct.cost_price ??
        "",

      stock_qty:
        selectedProduct.stock_qty ??
        "",

      min_stock_level:
        selectedProduct.min_stock_level ??
        "",

      description:
        selectedProduct.description ??
        "",

      // IMPORTANT: Existing image cannot be assigned​ to <input type="file">
      image: undefined,
    });

    // EXISTING IMAGE PREVIEW
    if (selectedProduct.image) {
      const imageUrl =
          selectedProduct.image.startsWith("http")
          ? selectedProduct.image
          : `http://127.0.0.1:8000/storage/${selectedProduct.image}`;
      console.log(
        "EDIT PRODUCT IMAGE:",
        selectedProduct.image   
      );
      console.log(
        "EDIT IMAGE URL:",
        imageUrl
      );
      setPreviewImage(imageUrl);
    } else {
      setPreviewImage(null);
    }
    // CLEAR SEARCH
    setBrandSearch("");
    setCategorySearch("");
  }, [selectedProduct, reset]);

  // NEW IMAGE PREVIEW
  useEffect(() => {
    // No new image selected
    // Keep existing image
    if (!image || image.length === 0) {
      return;
    }
    const file = image[0];
    if (!(file instanceof File)) {
      return;
    }
    const objectUrl =
      URL.createObjectURL(file);
    console.log(
      "NEW IMAGE SELECTED:",
      file
    );
    console.log(
      "NEW IMAGE PREVIEW:",
      objectUrl
    );
    setPreviewImage(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  // REMOVE NEW IMAGE
  const removeNewImage = () => {
    // Remove file from React Hook Form
    setValue("image", undefined);
    // If editing, restore old image
    if (
      isEditing &&
      selectedProduct?.image
    ) {
      const oldImageUrl =
        selectedProduct.image.startsWith("http")
          ? selectedProduct.image
          : `http://127.0.0.1:8000/storage/${selectedProduct.image}`;
      setPreviewImage(oldImageUrl);
      return;
    }
    // Create mode
    setPreviewImage(null);
  };

  // SUBMIT
  const handleFormSubmit = async (data, shouldReset = false) => {
    const formData = new FormData();
    // If your backend requires method spoofing for updates:
    if (isEditing) {
      formData.append("_method", "PUT");
    }
    // Normal fields
    formData.append("name", data.name ?? "");
    formData.append("sku", data.sku ?? "");
    formData.append("barcode", data.barcode ?? "");
    formData.append("category_id", String(data.category_id ?? ""));
    formData.append("brand_id", String(data.brand_id ?? ""));
    formData.append("status", data.status ?? "active");
    formData.append("product_type", data.product_type ?? "");
    formData.append("selling_price", String(data.selling_price ?? ""));
    formData.append("cost_price", String(data.cost_price ?? ""));
    formData.append("stock_qty", String(data.stock_qty ?? ""));
    formData.append("min_stock_level", String(data.min_stock_level ?? ""));
    formData.append("description", data.description ?? "");
    // Handle Image File
    const selectedFile = data.image?.[0];
    if (selectedFile instanceof File) {
      formData.append("image", selectedFile);
    }
    try {
      if (isEditing && selectedProduct) {
        await editeProduct({
          id: selectedProduct.id,
          data: formData, // Make sure your API hook sends headers: { 'Content-Type': 'multipart/form-data' }
        });
        onClose();
        return;
      }
      if (onSubmitApi) {
        await onSubmitApi(formData);
      }
      if (shouldReset) {
        resetProductForm();
        return;
      }
      onClose();
    } catch (error) {
      console.error("Product submission error:", error);
    }
  };
  return (
    
    <form
      onSubmit={handleSubmit( (data) => {
          handleFormSubmit(data, false);
        }
      ,)}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
    >

      <div
        className="
          w-[1100px]
          max-h-[90vh]
          overflow-y-auto
          rounded-xl
          bg-white
          p-6
          shadow-xl
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            border-b
            border-gray-200
            pb-5
          "
        >
          <div>
            <h1 className="text-xl font-medium">
              {isEditing
                ? "Edit Product"
                : "Add New Product"}
            </h1>

            <p className="text-gray-600">
              {isEditing
                ? "Update product information"
                : "Enter the details of the new product"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              bg-red-600
              p-2
              text-white
              hover:bg-red-700
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =====================================================
            BODY
        ===================================================== */}

        <div className="flex gap-x-5 pt-5">

          {/* ===================================================
              IMAGE
          =================================================== */}

          <div className="w-1/3">

            <div className="mb-3">
              <h1 className="font-semibold">
                Product Photo{" "}
                <span className="text-red-600">
                  *
                </span>
              </h1>

              <p className="text-sm text-gray-600">
                Upload product photo
              </p>
            </div>

            <label
              htmlFor="dropzone-file"
              className="  relative  flex  h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl  border-2 border-dashed border-indigo-300 bg-slate-50/50transition-colors hover:bg-indigo-50/50"
            >
              {/* =================================================
                  PREVIEW
              ================================================= */}

              {previewImage ? (
                <>
                  <img src={previewImage} alt="Product Preview"
                    className="h-full w-full object-cover "
                    onLoad={() => {
                      console.log(
                        "IMAGE LOADED:",
                        previewImage
                      );
                    }}
                    onError={() => {
                      console.error(
                        "IMAGE FAILED:",
                        previewImage
                      );
                    }}
                  />

                  {/* Remove only NEW image */}

                  {image?.length > 0 && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        removeNewImage();
                      }}
                      className=" absolute right-2 top-2 rounded-full  bg-red-600 p-2  text-white  shadow  hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
                  )}
                </>
              ) : (
                <div
                  className=" flex flex-col items-center  justify-center   px-4 text-center "
                >
                  <div
                    className="  mb-3   rounded-xl  bg-indigo-50 p-3  text-indigo-600 "
                  >
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="
                          M4 16l4.586-4.586a2 2 0
                          012.828 0L16 16m-2-2l1.586-1.586a2 2 0
                          012.828 0L20 14m-6-6h.01M6 20h12a2 2 0
                          002-2V6a2 2 0 00-2-2z
                        "
                      />
                    </svg>
                  </div>

                  <p className="mb-1 text-sm font-semibold text-slate-700">
                    Click to upload
                  </p>

                  <p className="text-xs text-slate-400">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </div>
              )}

              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                {...register("image")}
              />
            </label>
          </div>

          {/* ===================================================
              FORM FIELDS
          =================================================== */}

          <div className="w-2/3 space-y-4">

            {/* PRODUCT NAME */}

            <div>
              <label className="text-sm font-semibold">
                Product Name{" "}
                <span className="text-red-600">
                  *
                </span>
              </label>

              <input
                {...register("name")}
                type="text"
                placeholder="Enter product name"
                className={`
                  mt-2
                  w-full
                  rounded-lg
                  border
                  px-3
                  py-2
                  text-sm
                  outline-none
                  ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-200"
                  }
                `}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* SKU + BARCODE */}

            <div className="flex w-full gap-4">

              {/* SKU */}

              <div className="w-1/2">
                <label className="text-sm font-semibold">
                  SKU{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </label>

                <input
                  {...register("sku")}
                  type="text"
                  placeholder="Enter SKU"
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2
                    text-sm
                    outline-none
                  "
                />

                {errors.sku && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.sku.message}
                  </p>
                )}
              </div>

              {/* BARCODE */}

              <div className="w-1/2">
                <label className="text-sm font-semibold">
                  Barcode
                </label>

                <input
                  value={
                    selectedProduct?.barcode ??
                    "Auto generated by system"
                  }
                  readOnly
                  className="
                    mt-2
                    w-full
                    cursor-not-allowed
                    rounded-lg
                    border
                    border-gray-200
                    bg-gray-50
                    px-3
                    py-2
                    text-sm
                    text-gray-500
                    outline-none
                  "
                  type="text"
                />
              </div>
            </div>

            {/* CATEGORY + STATUS */}

            <div className="flex w-full gap-4">

              {/* CATEGORY */}

              <div className="w-1/2">

                <label className="text-sm font-semibold">
                  Category{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </label>

                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => {

                    const selectedCategory =
                      category.find(
                        (item) =>
                          String(item.id) ===
                          String(field.value)
                      ) ??
                      selectedProduct?.category;

                    return (
                      <Select
                        value={
                          selectedCategory
                            ? {
                                value:
                                  selectedCategory.id,
                                label:
                                  selectedCategory.name,
                              }
                            : null
                        }
                        options={category.map(
                          (item) => ({
                            value: item.id,
                            label: item.name,
                          })
                        )}
                        isLoading={
                          isCategoryLoading
                        }
                        isClearable
                        isSearchable
                        placeholder="Search category..."
                        maxMenuHeight={200}
                        menuPlacement="auto"
                        onInputChange={(
                          value,
                          action
                        ) => {
                          if (
                            action.action ===
                            "input-change"
                          ) {
                            setCategorySearch(
                              value
                            );
                          }
                        }}
                        onChange={(option) => {
                          field.onChange(
                            option?.value ?? ""
                          );
                        }}
                        className="mt-2"
                      />
                    );
                  }}
                />

                {errors.category_id && (
                  <p className="mt-1 text-xs text-red-500">
                    {
                      errors.category_id
                        .message
                    }
                  </p>
                )}
              </div>

              {/* STATUS */}

              <div className="w-1/2">

                <label className="text-sm font-semibold">
                  Status{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </label>

                <select
                  {...register("status")}
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2
                    outline-none
                  "
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>

            {/* PRODUCT TYPE + BRAND */}

            <div className="flex w-full gap-4">

              {/* PRODUCT TYPE */}

              <div className="w-1/2">

                <label className="text-sm font-semibold">
                  Product Type{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </label>

                <input
                  {...register("product_type")}
                  type="text"
                  placeholder="Enter product type"
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-2
                    text-sm
                    outline-none
                  "
                />

                {errors.product_type && (
                  <p className="mt-1 text-xs text-red-500">
                    {
                      errors.product_type
                        .message
                    }
                  </p>
                )}
              </div>

              {/* BRAND */}

              <div className="w-1/2">

                <label className="text-sm font-semibold">
                  Brand{" "}
                  <span className="text-red-600">
                    *
                  </span>
                </label>

                <Controller
                  name="brand_id"
                  control={control}
                  render={({ field }) => {

                    const selectedBrand =
                      brands.find(
                        (brand) =>
                          String(brand.id) ===
                          String(field.value)
                      ) ??
                      selectedProduct?.brand;

                    return (
                      <Select
                        value={
                          selectedBrand
                            ? {
                                value:
                                  selectedBrand.id,
                                label:
                                  selectedBrand.name,
                              }
                            : null
                        }
                        options={brands.map(
                          (brand) => ({
                            value: brand.id,
                            label: brand.name,
                          })
                        )}
                        isLoading={
                          isBrandLoading
                        }
                        isClearable
                        isSearchable
                        placeholder="Search brand..."
                        maxMenuHeight={200}
                        menuPlacement="auto"
                        onInputChange={(
                          value,
                          action
                        ) => {
                          if (
                            action.action ===
                            "input-change"
                          ) {
                            setBrandSearch(
                              value
                            );
                          }
                        }}
                        onChange={(option) => {
                          field.onChange(
                            option?.value ?? ""
                          );
                        }}
                        className="mt-2"
                      />
                    );
                  }}
                />

                {errors.brand_id && (
                  <p className="mt-1 text-xs text-red-500">
                    {
                      errors.brand_id.message
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            PRICING
        ===================================================== */}

        <div className="mt-5 flex gap-4">

          {/* SELLING */}

          <div className="w-1/4">

            <label className="text-sm font-semibold">
              Selling Price{" "}
              <span className="text-red-600">
                *
              </span>
            </label>

            <input
              {...register(
                "selling_price",
                {
                  valueAsNumber: true,
                }
              )}
              type="number"
              step="0.01"
              className="
                mt-2
                w-full
                rounded-lg
                border
                border-gray-200
                px-3
                py-2
                outline-none
              "
            />

            {errors.selling_price && (
              <p className="mt-1 text-xs text-red-500">
                {
                  errors.selling_price
                    .message
                }
              </p>
            )}
          </div>

          {/* COST */}

          <div className="w-1/4">

            <label className="text-sm font-semibold">
              Cost Price{" "}
              <span className="text-red-600">
                *
              </span>
            </label>

            <input
              {...register(
                "cost_price",
                {
                  valueAsNumber: true,
                }
              )}
              type="number"
              step="0.01"
              className="
                mt-2
                w-full
                rounded-lg
                border
                border-gray-200
                px-3
                py-2
                outline-none
              "
            />

            {errors.cost_price && (
              <p className="mt-1 text-xs text-red-500">
                {
                  errors.cost_price
                    .message
                }
              </p>
            )}
          </div>

          {/* STOCK */}

          <div className="w-1/4">

            <label className="text-sm font-semibold">
              Stock Quantity{" "}
              <span className="text-red-600">
                *
              </span>
            </label>

            <input
              {...register(
                "stock_qty",
                {
                  valueAsNumber: true,
                }
              )}
              type="number"
              min="0"
              className="
                mt-2
                w-full
                rounded-lg
                border
                border-gray-200
                px-3
                py-2
                outline-none
              "
            />

            {errors.stock_qty && (
              <p className="mt-1 text-xs text-red-500">
                {
                  errors.stock_qty
                    .message
                }
              </p>
            )}
          </div>

          {/* LOW STOCK */}

          <div className="w-1/4">

            <label className="text-sm font-semibold">
              Low Stock Alert{" "}
              <span className="text-red-600">
                *
              </span>
            </label>

            <input
              {...register(
                "min_stock_level",
                {
                  valueAsNumber: true,
                }
              )}
              type="number"
              min="0"
              className="
                mt-2
                w-full
                rounded-lg
                border
                border-gray-200
                px-3
                py-2
                outline-none
              "
            />

            {errors.min_stock_level && (
              <p className="mt-1 text-xs text-red-500">
                {
                  errors.min_stock_level
                    .message
                }
              </p>
            )}
          </div>
        </div>

        {/* =====================================================
            DESCRIPTION
        ===================================================== */}

        <div className="mt-5">

          <label className="text-sm font-semibold">
            Description
          </label>

          <input
            {...register("description")}
            type="text"
            placeholder="Enter product description"
            className="
              mt-2
              w-full
              rounded-lg
              border
              border-gray-200
              px-3
              py-2
              text-sm
              outline-none
            "
          />
        </div>

        {/* =====================================================
            BUTTONS
        ===================================================== */}

        <div className="mt-8 flex justify-between">

          {/* SAVE & ADD ANOTHER */}

          {!isEditing && (
            <button
              type="button"
              disabled={isPending}
              onClick={handleSubmit(
                (data) =>
                  handleFormSubmit(
                    data,
                    true
                  )
              )}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-blue-800
                px-5
                py-2
                text-white
                hover:bg-blue-900
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isPending && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {isPending
                ? "Saving..."
                : "Save & Add Another"}
            </button>
          )}

          <div className="ml-auto flex gap-4">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-lg
                border
                border-gray-300
                bg-white
                px-5
                py-2
                text-black
                hover:bg-gray-50
                cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-blue-800
                px-5
                py-2
                text-white
                hover:bg-blue-900
                disabled:cursor-not-allowed
                disabled:opacity-50
                cursor-pointer
              "
            >
              {isPending && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {isPending
                ? isEditing
                  ? "Updating..."
                  : "Saving..."
                : isEditing
                ? "Update Product"
                : "Save Product"}
            </button>

          </div>
        </div>
      </div>
    </form>
  );
}

export default ModelProduct;

