import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import Select from "react-select";

import {
  CalendarDays,
  FileText,
  Package,
  Plus,
  RefreshCw,
  Search,
  Send,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import useGetAllProduct from "../../../product/hook/useGetAllProduct";
import useGetAllSupplier from "../../../Supplier/hook/useGetAllSupplier";
import useCreatePurchaseOrder from "../hook/useCreatePurchaseOrder";
import useEditPurchaseOrder from "../hook/useEditePurchaseOrder";

// Styles
const fieldClass =
  "mt-1 w-full rounded-md border border-blue-100 bg-white px-2.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
const sectionClass = "rounded-md border border-blue-100 bg-white p-3";

// Helper Functions
function getLocalDate(date) {
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return localDate.toISOString().slice(0, 10);
}

function formatCurrency(amount) {
  return `$${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getProductImageUrl(image) {
  if (!image || typeof image !== "string") return "";
  const imagePath = image.trim();
  if (/^(https?:)?\/\//i.test(imagePath) || /^(data|blob):/i.test(imagePath)) {
    return imagePath;
  }
  const backendOrigin = new URL(
    import.meta.env.VITE_API_URL || "/api",
    window.location.origin
  ).origin;
  const storagePath = imagePath
    .replace(/^\/+/, "")
    .replace(/^storage\//i, "");
  return new URL(`/storage/${storagePath}`, backendOrigin).toString();
}

function ProductThumbnail({ image, name }) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getProductImageUrl(image);
  return (
    <div className="flex h-8 w-9 shrink-0 items-center justify-center overflow-hidden rounded border border-slate-200 bg-slate-100">
      {imageUrl && !hasError ? (
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <Package
          size={14}
          className="text-slate-400"
          aria-label="No product image"
        />
      )}
    </div>
  );
}

// Component
function AddPurchaseOrderModal({ onClose, purchase }) {
  const isEditMode = Boolean(purchase);

  // Hooks
  const { mutateAsync: createPurchase, isPending: isCreating } = useCreatePurchaseOrder();
  const { mutateAsync: editPurchase, isPending: isEditing } = useEditPurchaseOrder();
  const isPending = isCreating || isEditing;

  const {
    product: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetAllProduct({ page: 1, perPage: 100 });

  const [supplierSearch, setSupplierSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(supplierSearch), 300);
    return () => clearTimeout(timer);
  }, [supplierSearch]);

  const {
    suppliers = [],
    isLoading: isSuppliersLoading,
    isError: isSuppliersError,
  } = useGetAllSupplier({
    page: 1,
    perPage: 10,
    search: debouncedSearch,
  });

  // Default Dates
  const today = getLocalDate(new Date());
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      supplier_id: purchase?.supplier_id || "",
      purchase_date: purchase?.purchase_date ? purchase.purchase_date.split("T")[0] : today,
      shipping_cost: purchase?.shipping_cost ?? 0,
      expected_delivery_date: purchase?.expected_delivery_date ? purchase.expected_delivery_date.split("T")[0] : getLocalDate(deliveryDate),
      payment_terms: purchase?.payment_terms || "Due in 30 days",
      status: purchase?.status ? purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1) : "Draft",
      notes: purchase?.notes || "",
      reference: purchase?.reference || "",
      order_notes: purchase?.order_notes || "",
      items: purchase?.items?.map(item => ({
        product_id: item.product_id,
        name: item.product?.name || item.name,
        sku: item.product?.sku || item.sku,
        description: item.product?.description ?? "",
        image: item.product?.image ?? "",
        quantity: item.quantity,
        unitCost: Number(item.cost_price ?? item.unitCost ?? 0),
        discount: Number(item.discount ?? 0),
        tax: Number(item.tax ?? 0),
      })) || [],
    },
  });
useEffect(() => {
  if (!purchase) return;

  // ប្តូរ purchase.items ទៅជា purchase.purchase_items បើ API ប្រើឈ្មោះនោះ
  const rawItems = purchase.items ?? purchase.purchase_items ?? purchase.purchaseItems ?? [];

  reset({
    supplier_id: purchase.supplier_id || "",
    purchase_date: purchase.purchase_date?.split("T")[0] || today,
    expected_delivery_date:
      purchase.expected_delivery_date?.split("T")[0] || getLocalDate(deliveryDate),
    shipping_cost: Number(purchase.shipping_cost ?? 0),
    payment_terms: purchase.payment_terms || "Due in 30 days",
    status: purchase.status
      ? purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)
      : "Draft",
    notes: purchase.notes || "",
    reference: purchase.reference || "",
    order_notes: "",
    items: rawItems.map((item) => ({
      product_id: item.product_id,
      name: item.product?.name ?? item.name ?? "",
      sku: item.product?.sku ?? item.sku ?? "",
      description: item.product?.description ?? "",
      image: item.product?.image ?? "",
      quantity: Number(item.quantity ?? 1),
      unitCost: Number(item.cost_price ?? item.unit_cost ?? item.unitCost ?? 0),
      discount: Number(item.discount ?? 0),
      tax: Number(item.tax ?? 0),
    })),
  });
}, [purchase, reset]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // UI States
  const [search, setSearch] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  const searchInputRef = useRef(null);
  const productSearchRef = useRef(null);

  // Watch items for real-time Order Summary calculations
  const watchedItems = useWatch({ control, name: "items" }) || [];
  const watchedShippingCost = useWatch({ control, name: "shipping_cost" });

  // Close modal on ESC key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && !isPending) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isPending]);

  // Filter products for dropdown
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const alreadyAdded = watchedItems.some(
        (item) => String(item.product_id) === String(product.id)
      );
      if (alreadyAdded) return false;
      if (!query) return true;
      return (
        product.name?.toLowerCase().includes(query) ||
        product.sku?.toLowerCase().includes(query)
      );
    });
  }, [watchedItems, products, search]);

  // Add Product to list
  function addProduct(product) {
    append({
      product_id: product.id,
      name: product.name,
      sku: product.sku,
      description: product.description ?? "",
      image: product.image ?? "",
      quantity: 1,
      unitCost: Number(product.cost_price ?? product.price ?? 0),
      discount: 0,
      tax: 0,
    });
    setSearch("");
    setShowProducts(false);
  }

  // Calculations for Summary
  const subtotal = watchedItems.reduce(
    (acc, item) => acc + (Number(item?.quantity) || 0) * (Number(item?.unitCost) || 0),
    0
  );
  const discountTotal = watchedItems.reduce(
    (acc, item) => acc + (Number(item?.discount) || 0),
    0
  );
  const taxTotal = watchedItems.reduce(
    (acc, item) => acc + (Number(item?.tax) || 0),
    0
  );
  const shippingCost = Number(watchedShippingCost) || 0;
  const grandTotal = subtotal - discountTotal + taxTotal + shippingCost;

  // Form Submit Handler
  const onSubmit = async (data) => {
    if (!data.items || data.items.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "No Products",
        text: "Please add at least one product.",
      });
      return;
    }

    const payload = {
      purchase_date: data.purchase_date,
      expected_delivery_date: data.expected_delivery_date || null,
      supplier_id: Number(data.supplier_id),
      status: data.status.toLowerCase(),
      shipping_cost: Number(Number(data.shipping_cost).toFixed(2) || 0),
      payment_terms: data.payment_terms || null,
      notes: [data.notes?.trim(), data.order_notes?.trim()]
        .filter(Boolean)
        .join("\n") || null,
      items: data.items.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
        cost_price: Number(item.unitCost),
        discount: Number(item.discount || 0),
        tax: Number(item.tax || 0),
      })),
    };

    try {
      if (isEditMode) {
        await editPurchase({ id: purchase.id, data: payload });
      } else {
        await createPurchase(payload);
      }

      reset();
      onClose();
    } catch (error) {
      console.error("Purchase Order Error:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/45 p-1 backdrop-blur-[2px] sm:p-2"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPending) {
          onClose();
        }
      }}
    >
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-order-title"
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-h-[98vh] w-full max-w-7xl flex-col overflow-hidden rounded-lg border border-blue-100 bg-white shadow-2xl"
      >
        {/* HEADER */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-blue-50 p-2 text-blue-700">
              <FileText size={22} />
            </div>
            <div>
              <h2 id="purchase-order-title" className="text-base font-bold text-slate-900">
                {isEditMode ? "Edit Purchase Order" : "Add Purchase Order"}
              </h2>
              <p className="text-[11px] text-slate-500">
                {isEditMode ? "Update purchase order details and inventory." : "Create a new purchase order and track your inventory."}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            disabled={isPending}
            className="rounded p-1.5 cursor-pointer text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </header>

        {/* BODY */}
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-slate-50/40 p-3 sm:p-4">
          {/* PURCHASE INFORMATION */}
          <section className={sectionClass}>
            <h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-900">
              <FileText size={15} className="text-blue-700" />
              Purchase Order Information
            </h3>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-4">
              {/* PO NUMBER */}
              <label className="text-[11px] font-medium text-slate-700">
                Purchase Order No.
                <span className="relative mt-1 block">
                  <input
                    className={`${fieldClass} bg-slate-100`}
                    value={purchase?.purchase_order_no || "AUTO GENERATED"}
                    readOnly
                  />
                  <RefreshCw
                    size={13}
                    className="absolute right-2.5 top-2.5 text-blue-600"
                  />
                </span>
              </label>

              {/* PURCHASE DATE */}
              <label className="text-[11px] font-medium text-slate-700">
                Purchase Date <span className="text-red-500">*</span>
                <span className="relative mt-1 block">
                  <CalendarDays size={13} className="absolute left-2.5 top-2.5 text-blue-800" />
                  <input
                    type="date"
                    className={`${fieldClass} pl-8`}
                    {...register("purchase_date", { required: "Purchase date is required" })}
                  />
                </span>
                {errors.purchase_date && (
                  <span className="text-[10px] text-red-500">{errors.purchase_date.message}</span>
                )}
              </label>

              {/* EXPECTED DATE */}
              <label className="text-[11px] font-medium text-slate-700">
                Expected Delivery Date <span className="text-red-500">*</span>
                <span className="relative mt-1 block">
                  <CalendarDays size={13} className="absolute left-2.5 top-2.5 text-blue-800" />
                  <input
                    type="date"
                    className={`${fieldClass} pl-8`}
                    {...register("expected_delivery_date", {
                      required: "Expected date is required",
                    })}
                  />
                </span>
                {errors.expected_delivery_date && (
                  <span className="text-[10px] text-red-500">
                    {errors.expected_delivery_date.message}
                  </span>
                )}
              </label>

              {/* SUPPLIER */}
              <div className="text-[11px] font-medium text-slate-700">
                <label className="block">
                  Supplier <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="supplier_id"
                  control={control}
                  rules={{ required: "Supplier is required" }}
                  render={({ field }) => (
                    <Select
                      value={
                        suppliers.find(
                          (supplier) => String(supplier.id) === String(field.value)
                        )
                          ? {
                              value: suppliers.find(
                                (supplier) => String(supplier.id) === String(field.value)
                              ).id,
                              label: suppliers.find(
                                (supplier) => String(supplier.id) === String(field.value)
                              ).name,
                            }
                          : purchase?.supplier
                          ? { value: purchase.supplier.id, label: purchase.supplier.name }
                          : null
                      }
                      options={suppliers.map((supplier) => ({
                        value: supplier.id,
                        label: supplier.name,
                      }))}
                      isLoading={isSuppliersLoading}
                      isDisabled={isSuppliersError}
                      isClearable
                      isSearchable
                      filterOption={null}
                      placeholder="Search supplier..."
                      noOptionsMessage={() => "No supplier found"}
                      loadingMessage={() => "Loading suppliers..."}
                      maxMenuHeight={200}
                      menuPlacement="auto"
                      onInputChange={(inputValue, actionMeta) => {
                        if (actionMeta.action === "input-change") {
                          setSupplierSearch(inputValue);
                        }
                      }}
                      onChange={(option) => field.onChange(option?.value ?? "")}
                      onBlur={field.onBlur}
                      className="mt-1"
                      classNamePrefix="supplier-select"
                    />
                  )}
                />
                {errors.supplier_id && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {errors.supplier_id.message}
                  </p>
                )}
              </div>

              {/* PAYMENT TERMS */}
              <label className="text-[11px] font-medium text-slate-700">
                Payment Terms
                <select className={fieldClass} {...register("payment_terms")}>
                  <option value="Due in 30 days">Due in 30 days</option>
                  <option value="Due in 15 days">Due in 15 days</option>
                  <option value="Due on receipt">Due on receipt</option>
                  <option value="Due in 60 days">Due in 60 days</option>
                </select>
              </label>

              {/* STATUS */}
              <label className="text-[11px] font-medium text-slate-700">
                Status
                <select className={fieldClass} {...register("status")}>
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                </select>
              </label>

              {/* CREATED BY */}
              <label className="text-[11px] font-medium text-slate-700">
                Created By
                <span className="relative mt-1 block">
                  <UserRound
                    size={14}
                    className="absolute left-2.5 top-2.5 text-blue-800"
                  />
                  <input
                    className={`${fieldClass} bg-slate-100 pl-8`}
                    value="Current User"
                    readOnly
                  />
                </span>
              </label>

              {/* NOTES */}
              <label className="text-[11px] font-medium text-slate-700">
                Notes
                <textarea
                  className={`${fieldClass} h-[38px] resize-y`}
                  placeholder="Add any notes..."
                  {...register("notes")}
                />
              </label>
            </div>
          </section>

          {/* PRODUCTS */}
          <section className={sectionClass}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Package size={16} className="text-blue-700" />
                Purchase Items
              </h3>
              <div className="flex gap-2">
                {/* SEARCH */}
                <div ref={productSearchRef} className="relative">
                  <Search
                    size={13}
                    className="absolute left-2 top-2.5 text-slate-400"
                  />
                  <input
                    ref={searchInputRef}
                    className="w-40 rounded-md border border-blue-100 py-2 pl-7 pr-2 text-[11px] outline-none focus:border-blue-500 sm:w-52"
                    placeholder="Search product..."
                    value={search}
                    onFocus={() => setShowProducts(true)}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setShowProducts(true);
                    }}
                  />
                  {/* PRODUCT DROPDOWN */}
                  {showProducts && (
                    <div className="absolute right-0 top-full z-20 mt-1 max-h-52 w-72 overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg">
                      {isProductsLoading ? (
                        <p className="px-3 py-2 text-xs text-slate-500">Loading products...</p>
                      ) : isProductsError ? (
                        <p className="px-3 py-2 text-xs text-red-600">Unable to load products.</p>
                      ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => addProduct(product)}
                            className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs hover:bg-blue-50"
                          >
                            <span>
                              <span className="block font-medium text-slate-800">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                SKU: {product.sku}
                              </span>
                            </span>
                            <span className="whitespace-nowrap font-medium text-slate-700">
                              {formatCurrency(product.cost_price ?? product.price ?? 0)}
                            </span>
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-xs text-slate-500">No products found.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* ADD PRODUCT BUTTON */}
                <button
                  type="button"
                  onClick={() => {
                    setShowProducts(true);
                    searchInputRef.current?.focus();
                  }}
                  disabled={isProductsLoading || isProductsError}
                  className="flex items-center gap-1 rounded-md bg-blue-700 px-3 py-2 text-[11px] font-semibold text-white hover:bg-blue-800"
                >
                  <Plus size={14} />
                  Add Product
                </button>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-md border border-blue-100">
              <table className="w-full min-w-[950px] text-left text-[10px] text-slate-700">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-2 py-2">#</th>
                    <th className="px-2 py-2">Product</th>
                    <th className="px-2 py-2">SKU</th>
                    <th className="px-2 py-2">Quantity</th>
                    <th className="px-2 py-2">Unit Cost</th>
                    <th className="px-2 py-2">Discount</th>
                    <th className="px-2 py-2">Tax</th>
                    <th className="px-2 py-2">Subtotal</th>
                    <th className="px-2 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => {
                    const currentQty = watchedItems[index]?.quantity || 0;
                    const currentCost = watchedItems[index]?.unitCost || 0;
                    const currentDiscount = watchedItems[index]?.discount || 0;
                    const currentTax = watchedItems[index]?.tax || 0;

                    const itemSubtotal =
                      Number(currentQty) * Number(currentCost) -
                      Number(currentDiscount) +
                      Number(currentTax);

                    return (
                      <tr key={item.id} className="border-t border-blue-50">
                        <td className="px-2 py-1.5">{index + 1}</td>

                        <td className="px-2 py-1.5">
                          <div className="flex items-center gap-2">
                            <ProductThumbnail image={item.image} name={item.name} />
                            <span>
                              <span className="block whitespace-nowrap font-medium text-slate-800">
                                {item.name}
                              </span>
                              <span className="text-[9px] text-slate-500">
                                {item.description}
                              </span>
                            </span>
                          </div>
                        </td>

                        <td className="px-2 py-1.5">{item.sku}</td>

                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            min="1"
                            className="w-20 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                            {...register(`items.${index}.quantity`, {
                              valueAsNumber: true,
                              min: { value: 1, message: "Min 1" },
                            })}
                          />
                        </td>

                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-24 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                            {...register(`items.${index}.unitCost`, {
                              valueAsNumber: true,
                              min: { value: 0, message: "Min 0" },
                            })}
                          />
                        </td>

                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-20 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                            {...register(`items.${index}.discount`, {
                              valueAsNumber: true,
                            })}
                          />
                        </td>

                        <td className="px-2 py-1.5">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-20 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                            {...register(`items.${index}.tax`, {
                              valueAsNumber: true,
                            })}
                          />
                        </td>

                        <td className="whitespace-nowrap px-2 py-1.5 font-semibold text-slate-800">
                          {formatCurrency(itemSubtotal)}
                        </td>

                        <td className="px-2 py-1.5 text-center">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="rounded border border-rose-100 p-1.5 text-rose-500 transition hover:bg-rose-50"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {fields.length === 0 && (
                    <tr>
                      <td colSpan="9" className="px-3 py-8 text-center text-slate-500">
                        <Package size={28} className="mx-auto mb-2 text-slate-300" />
                        <p>No products added yet.</p>
                        <p className="mt-1 text-[9px]">Search and select a product above.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowProducts(true);
                searchInputRef.current?.focus();
              }}
              className="mt-2 flex items-center gap-1 rounded border border-blue-500 px-2.5 py-1.5 text-[10px] font-medium text-blue-700 hover:bg-blue-50"
            >
              <Plus size={13} />
              Add More Items
            </button>
          </section>

          {/* ADDITIONAL + SUMMARY */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.6fr_1fr]">
            <section className={sectionClass}>
              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-900">
                <FileText size={15} className="text-blue-700" />
                Additional Information
              </h3>
              <label className="block text-[11px] font-medium text-slate-700">
                Reference No.
                <input
                  className={fieldClass}
                  placeholder="Enter reference number..."
                  {...register("reference")}
                />
              </label>
              <label className="mt-2 block text-[11px] font-medium text-slate-700">
                Shipping Cost ($)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={fieldClass}
                  placeholder="Enter shipping cost..."
                  {...register("shipping_cost", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Shipping cost must be at least 0" },
                  })}
                />
                {errors.shipping_cost && (
                  <span className="text-[10px] text-red-500">
                    {errors.shipping_cost.message}
                  </span>
                )}
              </label>
              <label className="mt-2 block text-[11px] font-medium text-slate-700">
                Notes
                <textarea
                  className={`${fieldClass} h-10 resize-y`}
                  placeholder="Additional notes..."
                  {...register("order_notes")}
                />
              </label>
            </section>

            <section className={`${sectionClass} self-start`}>
              <h3 className="mb-1 text-xs font-bold text-slate-900">Order Summary</h3>
              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium text-slate-800">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">
                <span>Discount</span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(discountTotal)}
                </span>
              </div>
              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">
                <span>Tax</span>
                <span className="font-medium text-slate-800">{formatCurrency(taxTotal)}</span>
              </div>
              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">
                <span>Shipping Cost</span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="mt-1 flex justify-between border-t border-blue-100 pt-2 text-xs font-bold text-blue-900">
                <span>Grand Total</span>
                <span className="text-sm text-blue-700">{formatCurrency(grandTotal)}</span>
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="flex shrink-0 justify-end gap-2 border-t border-slate-100 bg-white px-4 py-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-md border border-blue-500 px-4 py-2 text-[11px] font-medium text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-[11px] font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <RefreshCw size={13} className="animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Send size={13} />
                {isEditMode ? "Update Purchase Order" : "Create Purchase Order"}
              </>
            )}
          </button>
        </footer>
      </form>
    </div>
  );
}

export default AddPurchaseOrderModal;