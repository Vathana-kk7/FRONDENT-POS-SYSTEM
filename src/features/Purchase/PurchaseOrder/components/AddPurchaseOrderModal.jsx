import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

/*
|--------------------------------------------------------------------------
| Styles
|--------------------------------------------------------------------------
*/

const fieldClass =
  "mt-1 w-full rounded-md border border-blue-100 bg-white px-2.5 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const sectionClass =
  "rounded-md border border-blue-100 bg-white p-3";

/*
|--------------------------------------------------------------------------
| Date
|--------------------------------------------------------------------------
*/

function getLocalDate(date) {
  const localDate = new Date(
    date.getTime() -
      date.getTimezoneOffset() *
        60000
  );

  return localDate
    .toISOString()
    .slice(0, 10);
}

/*
|--------------------------------------------------------------------------
| Currency
|--------------------------------------------------------------------------
*/

function formatCurrency(amount) {
  return `$${Number(
    amount || 0
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getProductImageUrl(image) {
  if (!image || typeof image !== "string") {
    return "";
  }

  const imagePath = image.trim();

  if (
    /^(https?:)?\/\//i.test(imagePath) ||
    /^(data|blob):/i.test(imagePath)
  ) {
    return imagePath;
  }

  const backendOrigin = new URL(
    import.meta.env.VITE_API_URL || "/api",
    window.location.origin
  ).origin;
  const storagePath = imagePath
    .replace(/^\/+/, "")
    .replace(/^storage\//i, "");

  return new URL(
    `/storage/${storagePath}`,
    backendOrigin
  ).toString();
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

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

function AddPurchaseOrderModal({
  onClose,
}) {

  /*
  |--------------------------------------------------------------------------
  | Create Hook
  |--------------------------------------------------------------------------
  */

  const {
    mutateAsync: createPurchase,
    isPending,
  } = useCreatePurchaseOrder();

  const {
    product: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetAllProduct({
    page: 1,
    perPage: 100,
  });

  const {
    suppliers,
    isLoading: isSuppliersLoading,
    isError: isSuppliersError,
  } = useGetAllSupplier({
    page: 1,
    perPage: 100,
  });

  /*
  |--------------------------------------------------------------------------
  | Default Dates
  |--------------------------------------------------------------------------
  */

  const today =
    getLocalDate(new Date());

  const deliveryDate =
    new Date();

  deliveryDate.setDate(
    deliveryDate.getDate() + 7
  );

  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [items, setItems] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showProducts, setShowProducts] =
    useState(false);

  const [supplier, setSupplier] =
    useState("");

  const [purchaseDate, setPurchaseDate] =
    useState(today);

  const [expectedDate, setExpectedDate] =
    useState(
      getLocalDate(deliveryDate)
    );

  const [paymentTerms, setPaymentTerms] =
    useState(
      "Due in 30 days"
    );

  const [status, setStatus] =
    useState("Draft");

  const [reference, setReference] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [orderNotes, setOrderNotes] =
    useState("");

  const searchInputRef =
    useRef(null);

  const productSearchRef =
    useRef(null);

  useEffect(() => {
    if (!showProducts) {
      return undefined;
    }

    function handleOutsideClick(event) {
      if (
        !productSearchRef.current?.contains(
          event.target
        )
      ) {
        setShowProducts(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [showProducts]);

  /*
  |--------------------------------------------------------------------------
  | Close with ESC
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.key === "Escape" &&
        !isPending
      ) {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose, isPending]);

  /*
  |--------------------------------------------------------------------------
  | Product Search
  |--------------------------------------------------------------------------
  */

  const filteredProducts =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {

          const alreadyAdded =
            items.some(
              (item) =>
                String(
                  item.product_id
                ) ===
                String(
                  product.id
                )
            );

          if (alreadyAdded) {
            return false;
          }

          if (!query) {
            return true;
          }

          return (
            product.name
              ?.toLowerCase()
              .includes(query) ||
            product.sku
              ?.toLowerCase()
              .includes(query)
          );
        }
      );
    }, [items, products, search]);

  /*
  |--------------------------------------------------------------------------
  | Subtotal
  |--------------------------------------------------------------------------
  */

  const subtotal =
    items.reduce(
      (total, item) => {
        return (
          total +
          Number(
            item.quantity || 0
          ) *
            Number(
              item.unitCost || 0
            )
        );
      },
      0
    );

  /*
  |--------------------------------------------------------------------------
  | Discount
  |--------------------------------------------------------------------------
  */

  const discountTotal =
    items.reduce(
      (total, item) => {
        return (
          total +
          Number(
            item.discount || 0
          )
        );
      },
      0
    );

  /*
  |--------------------------------------------------------------------------
  | Tax
  |--------------------------------------------------------------------------
  */

  const taxTotal =
    items.reduce(
      (total, item) => {
        return (
          total +
          Number(
            item.tax || 0
          )
        );
      },
      0
    );

  /*
  |--------------------------------------------------------------------------
  | Shipping
  |--------------------------------------------------------------------------
  */

  const shippingCost = 0;

  /*
  |--------------------------------------------------------------------------
  | Grand Total
  |--------------------------------------------------------------------------
  */

  const grandTotal =
    subtotal -
    discountTotal +
    taxTotal +
    shippingCost;

  /*
  |--------------------------------------------------------------------------
  | Update Item
  |--------------------------------------------------------------------------
  */

  function updateItem(
    productId,
    field,
    value
  ) {
    setItems(
      (currentItems) =>
        currentItems.map(
          (item) => {

            if (
              String(
                item.product_id
              ) !==
              String(productId)
            ) {
              return item;
            }

            if (
              field ===
              "quantity"
            ) {
              return {
                ...item,
                quantity:
                  Math.max(
                    1,
                    Number(value) ||
                      1
                  ),
              };
            }

            return {
              ...item,
              [field]:
                Number(value) || 0,
            };
          }
        )
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Add Product
  |--------------------------------------------------------------------------
  */

  function addProduct(product) {

    const newItem = {
      product_id:
        product.id,

      name:
        product.name,

      sku:
        product.sku,

      description:
        product.description ??
        "",

      image:
        product.image ??
        "",

      quantity: 1,

      unitCost:
        Number(
          product.cost_price ??
            product.price ??
            0
        ),

      discount: 0,

      tax: 0,
    };

    setItems(
      (currentItems) => [
        ...currentItems,
        newItem,
      ]
    );

    setSearch("");

    setShowProducts(false);
  }

  /*
  |--------------------------------------------------------------------------
  | Remove Product
  |--------------------------------------------------------------------------
  */

  function removeItem(productId) {
    setItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            String(
              item.product_id
            ) !==
            String(productId)
        )
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Reset
  |--------------------------------------------------------------------------
  */

  function resetForm() {
    setItems([]);

    setSearch("");

    setShowProducts(false);

    setSupplier("");

    setPurchaseDate(today);

    setExpectedDate(
      getLocalDate(
        new Date(
          Date.now() +
            7 *
              24 *
              60 *
              60 *
              1000
        )
      )
    );

    setPaymentTerms(
      "Due in 30 days"
    );

    setStatus("Draft");

    setReference("");

    setNotes("");

    setOrderNotes("");
  }

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(event) {

    event.preventDefault();

    /*
    |--------------------------------------------------------------------------
    | Validate Supplier
    |--------------------------------------------------------------------------
    */

    if (!supplier) {
      await Swal.fire({
        icon: "warning",
        title: "Supplier Required",
        text:
          "Please select a supplier.",
      });

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Products
    |--------------------------------------------------------------------------
    */

    if (!items.length) {
      await Swal.fire({
        icon: "warning",
        title: "No Products",
        text:
          "Please add at least one product.",
      });

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Quantity
    |--------------------------------------------------------------------------
    */

    const invalidQuantity =
      items.some(
        (item) =>
          Number(item.quantity) <=
          0
      );

    if (invalidQuantity) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Quantity",
        text:
          "Product quantity must be greater than 0.",
      });

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Validate Unit Cost
    |--------------------------------------------------------------------------
    */

    const invalidCost =
      items.some(
        (item) =>
          Number(item.unitCost) <
          0
      );

    if (invalidCost) {
      await Swal.fire({
        icon: "warning",
        title: "Invalid Unit Cost",
        text:
          "Unit cost cannot be negative.",
      });

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | Supplier ID
    |--------------------------------------------------------------------------
    */

    const supplierId =
      Number(supplier);

    /*
    |--------------------------------------------------------------------------
    | Payload
    |--------------------------------------------------------------------------
    */

    const payload = {
      purchase_date:
        purchaseDate,

      expected_delivery_date:
        expectedDate,

      supplier_id:
        supplierId,

      shipping_cost:
        Number(shippingCost.toFixed(2)),

      payment_terms:
        paymentTerms,

      notes:
        [
          notes.trim(),
          orderNotes.trim(),
        ]
          .filter(Boolean)
          .join("\n") ||
        null,

      items:
        items.map(
          (item) => {

            const quantity =
              Number(
                item.quantity
              );

            const unitCost =
              Number(
                item.unitCost
              );

            const discount =
              Number(
                item.discount ||
                  0
              );

            const tax =
              Number(
                item.tax || 0
              );

            return {
              product_id:
                Number(
                  item.product_id
                ),

              quantity:
                quantity,

              cost_price:
                unitCost,

              discount:
                discount,

              tax:
                tax,

            };
          }
        ),
    };

    /*
    |--------------------------------------------------------------------------
    | API
    |--------------------------------------------------------------------------
    */

    try {

      await createPurchase(
        payload
      );

      /*
      |--------------------------------------------------------------------------
      | Success
      |--------------------------------------------------------------------------
      */

      await Swal.fire({
        icon: "success",
        title:
          "Purchase Order Created",
        text:
          "Purchase order has been created successfully.",
        timer: 1800,
        showConfirmButton: false,
      });

      resetForm();

      onClose();

    } catch (error) {

      console.error(
        "Create Purchase Order Error:",
        error
      );

      /*
      |--------------------------------------------------------------------------
      | Laravel Validation Errors
      |--------------------------------------------------------------------------
      */

      const validationErrors =
        error?.response?.data
          ?.errors;

      let message =
        error?.response?.data
          ?.message ||
        "Failed to create purchase order.";

      if (
        validationErrors
      ) {
        const firstError =
          Object.values(
            validationErrors
          )[0];

        if (
          Array.isArray(
            firstError
          )
        ) {
          message =
            firstError[0];
        }
      }

      await Swal.fire({
        icon: "error",
        title:
          "Create Purchase Order Failed",
        text: message,
      });
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/45 p-1 backdrop-blur-[2px] sm:p-2"
      role="presentation"
      onMouseDown={(event) => {

        if (
          event.target ===
            event.currentTarget &&
          !isPending
        ) {
          onClose();
        }

      }}
    >

      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-order-title"
        onSubmit={
          handleSubmit
        }
        className="flex max-h-[98vh] w-full max-w-7xl flex-col overflow-hidden rounded-lg border border-blue-100 bg-white shadow-2xl"
      >

        {/* ============================================================
            HEADER
        ============================================================ */}

        <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">

          <div className="flex items-center gap-3">

            <div className="rounded-md bg-blue-50 p-2 text-blue-700">
              <FileText
                size={22}
              />
            </div>

            <div>

              <h2
                id="purchase-order-title"
                className="text-base font-bold text-slate-900"
              >
                Add Purchase Order
              </h2>

              <p className="text-[11px] text-slate-500">
                Create a new purchase
                order and track your
                inventory.
              </p>

            </div>

          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            disabled={isPending}
            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
          >
            <X size={18} />
          </button>

        </header>

        {/* ============================================================
            BODY
        ============================================================ */}

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-slate-50/40 p-3 sm:p-4">

          {/* ==========================================================
              PURCHASE INFORMATION
          ========================================================== */}

          <section
            className={
              sectionClass
            }
          >

            <h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-900">

              <FileText
                size={15}
                className="text-blue-700"
              />

              Purchase Order Information

            </h3>

            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 md:grid-cols-4">

              {/* PO NUMBER */}

              <label className="text-[11px] font-medium text-slate-700">

                Purchase Order No.

                <span className="relative mt-1 block">

                  <input
                    className={`${fieldClass} bg-slate-100`}
                    value="AUTO GENERATED"
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

                Purchase Date
                <span className="text-red-500">
                  {" "}*
                </span>

                <span className="relative mt-1 block">

                  <CalendarDays
                    size={13}
                    className="absolute left-2.5 top-2.5 text-blue-800"
                  />

                  <input
                    className={`${fieldClass} pl-8`}
                    type="date"
                    value={
                      purchaseDate
                    }
                    onChange={(
                      event
                    ) =>
                      setPurchaseDate(
                        event.target
                          .value
                      )
                    }
                    required
                  />

                </span>

              </label>

              {/* EXPECTED DATE */}

              <label className="text-[11px] font-medium text-slate-700">

                Expected Delivery Date

                <span className="text-red-500">
                  {" "}*
                </span>

                <span className="relative mt-1 block">

                  <CalendarDays
                    size={13}
                    className="absolute left-2.5 top-2.5 text-blue-800"
                  />

                  <input
                    className={`${fieldClass} pl-8`}
                    type="date"
                    value={
                      expectedDate
                    }
                    onChange={(
                      event
                    ) =>
                      setExpectedDate(
                        event.target
                          .value
                      )
                    }
                    required
                  />

                </span>

              </label>

              {/* SUPPLIER */}

              <label className="text-[11px] font-medium text-slate-700">

                Supplier

                <span className="text-red-500">
                  {" "}*
                </span>

                <select
                  className={
                    fieldClass
                  }
                  value={
                    supplier
                  }
                  disabled={
                    isSuppliersLoading ||
                    isSuppliersError
                  }
                  onChange={(
                    event
                  ) =>
                    setSupplier(
                      event.target
                        .value
                    )
                  }
                  required
                >

                  <option value="">
                    {isSuppliersLoading
                      ? "Loading suppliers..."
                      : isSuppliersError
                        ? "Unable to load suppliers"
                        : "Select supplier"}
                  </option>

                  {suppliers.map(
                    (item) => (
                      <option
                        key={
                          item.id
                        }
                        value={
                          item.id
                        }
                      >
                        {
                          item.name
                        }
                      </option>
                    )
                  )}

                </select>

              </label>

              {/* PAYMENT TERMS */}

              <label className="text-[11px] font-medium text-slate-700">

                Payment Terms

                <select
                  className={
                    fieldClass
                  }
                  value={
                    paymentTerms
                  }
                  onChange={(
                    event
                  ) =>
                    setPaymentTerms(
                      event.target
                        .value
                    )
                  }
                >

                  <option>
                    Due in 30 days
                  </option>

                  <option>
                    Due in 15 days
                  </option>

                  <option>
                    Due on receipt
                  </option>

                  <option>
                    Due in 60 days
                  </option>

                </select>

              </label>

              {/* STATUS */}

              <label className="text-[11px] font-medium text-slate-700">

                Status

                <select
                  className={
                    fieldClass
                  }
                  value={
                    status
                  }
                  onChange={(
                    event
                  ) =>
                    setStatus(
                      event.target
                        .value
                    )
                  }
                >

                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

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
                  value={notes}
                  onChange={(
                    event
                  ) =>
                    setNotes(
                      event.target
                        .value
                    )
                  }
                />

              </label>

            </div>

          </section>

          {/* ==========================================================
              PRODUCTS
          ========================================================== */}

          <section
            className={
              sectionClass
            }
          >

            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">

              <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900">

                <Package
                  size={16}
                  className="text-blue-700"
                />

                Purchase Items

              </h3>

              <div className="flex gap-2">

                {/* SEARCH */}

                <div
                  ref={productSearchRef}
                  className="relative"
                >

                  <Search
                    size={13}
                    className="absolute left-2 top-2.5 text-slate-400"
                  />

                  <input
                    ref={
                      searchInputRef
                    }
                    className="w-40 rounded-md border border-blue-100 py-2 pl-7 pr-2 text-[11px] outline-none focus:border-blue-500 sm:w-52"
                    placeholder="Search product..."
                    value={
                      search
                    }
                    onFocus={() =>
                      setShowProducts(
                        true
                      )
                    }
                    onChange={(
                      event
                    ) => {

                      setSearch(
                        event.target
                          .value
                      );

                      setShowProducts(
                        true
                      );

                    }}
                  />

                  {/* PRODUCT DROPDOWN */}

                  {showProducts && (
                    <div className="absolute right-0 top-full z-20 mt-1 max-h-52 w-72 overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg">

                      {isProductsLoading ? (
                        <p className="px-3 py-2 text-xs text-slate-500">
                          Loading products...
                        </p>
                      ) : isProductsError ? (
                        <p className="px-3 py-2 text-xs text-red-600">
                          Unable to load products.
                        </p>
                      ) : filteredProducts.length >
                      0 ? (

                        filteredProducts.map(
                          (
                            product
                          ) => (

                            <button
                              key={
                                product.id
                              }
                              type="button"
                              onClick={() =>
                                addProduct(
                                  product
                                )
                              }
                              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs hover:bg-blue-50"
                            >

                              <span>

                                <span className="block font-medium text-slate-800">
                                  {
                                    product.name
                                  }
                                </span>

                                <span className="text-[10px] text-slate-500">
                                  SKU:{" "}
                                  {
                                    product.sku
                                  }
                                </span>

                              </span>

                              <span className="whitespace-nowrap font-medium text-slate-700">

                                {formatCurrency(
                                  product.cost_price ??
                                    product.price ??
                                    0
                                )}

                              </span>

                            </button>

                          )
                        )

                      ) : (

                        <p className="px-3 py-2 text-xs text-slate-500">
                          No products found.
                        </p>

                      )}

                    </div>
                  )}

                </div>

                {/* ADD PRODUCT BUTTON */}

                <button
                  type="button"
                  onClick={() => {

                    setShowProducts(
                      true
                    );

                    searchInputRef.current?.focus();

                  }}
                  disabled={
                    isProductsLoading ||
                    isProductsError
                  }
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

                    <th className="px-2 py-2">
                      #
                    </th>

                    <th className="px-2 py-2">
                      Product
                    </th>

                    <th className="px-2 py-2">
                      SKU
                    </th>

                    <th className="px-2 py-2">
                      Quantity
                    </th>

                    <th className="px-2 py-2">
                      Unit Cost
                    </th>

                    <th className="px-2 py-2">
                      Discount
                    </th>

                    <th className="px-2 py-2">
                      Tax
                    </th>

                    <th className="px-2 py-2">
                      Subtotal
                    </th>

                    <th className="px-2 py-2 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {items.map(
                    (
                      item,
                      index
                    ) => {

                      const itemSubtotal =
                        Number(
                          item.quantity
                        ) *
                          Number(
                            item.unitCost
                          ) -
                        Number(
                          item.discount ||
                            0
                        ) +
                        Number(
                          item.tax ||
                            0
                        );

                      return (
                        <tr
                          key={
                            item.product_id
                          }
                          className="border-t border-blue-50"
                        >

                          {/* NUMBER */}

                          <td className="px-2 py-1.5">
                            {
                              index +
                              1
                            }
                          </td>

                          {/* PRODUCT */}

                          <td className="px-2 py-1.5">

                            <div className="flex items-center gap-2">

                              <ProductThumbnail
                                image={item.image}
                                name={item.name}
                              />

                              <span>

                                <span className="block whitespace-nowrap font-medium text-slate-800">
                                  {
                                    item.name
                                  }
                                </span>

                                <span className="text-[9px] text-slate-500">
                                  {
                                    item.description
                                  }
                                </span>

                              </span>

                            </div>

                          </td>

                          {/* SKU */}

                          <td className="px-2 py-1.5">
                            {
                              item.sku
                            }
                          </td>

                          {/* QUANTITY */}

                          <td className="px-2 py-1.5">

                            <input
                              className="w-20 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                              type="number"
                              min="1"
                              value={
                                item.quantity
                              }
                              onChange={(
                                event
                              ) =>
                                updateItem(
                                  item.product_id,
                                  "quantity",
                                  event
                                    .target
                                    .value
                                )
                              }
                            />

                          </td>

                          {/* UNIT COST */}

                          <td className="px-2 py-1.5">

                            <input
                              className="w-24 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                              type="number"
                              min="0"
                              step="0.01"
                              value={
                                item.unitCost
                              }
                              onChange={(
                                event
                              ) =>
                                updateItem(
                                  item.product_id,
                                  "unitCost",
                                  event
                                    .target
                                    .value
                                )
                              }
                            />

                          </td>

                          {/* DISCOUNT */}

                          <td className="px-2 py-1.5">

                            <input
                              className="w-20 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                              type="number"
                              min="0"
                              step="0.01"
                              value={
                                item.discount
                              }
                              onChange={(
                                event
                              ) =>
                                updateItem(
                                  item.product_id,
                                  "discount",
                                  event
                                    .target
                                    .value
                                )
                              }
                            />

                          </td>

                          {/* TAX */}

                          <td className="px-2 py-1.5">

                            <input
                              className="w-20 rounded border border-blue-100 px-2 py-1.5 outline-none focus:border-blue-500"
                              type="number"
                              min="0"
                              step="0.01"
                              value={
                                item.tax
                              }
                              onChange={(
                                event
                              ) =>
                                updateItem(
                                  item.product_id,
                                  "tax",
                                  event
                                    .target
                                    .value
                                )
                              }
                            />

                          </td>

                          {/* SUBTOTAL */}

                          <td className="whitespace-nowrap px-2 py-1.5 font-semibold text-slate-800">

                            {formatCurrency(
                              itemSubtotal
                            )}

                          </td>

                          {/* DELETE */}

                          <td className="px-2 py-1.5 text-center">

                            <button
                              type="button"
                              onClick={() =>
                                removeItem(
                                  item.product_id
                                )
                              }
                              className="rounded border border-rose-100 p-1.5 text-rose-500 transition hover:bg-rose-50"
                            >

                              <Trash2
                                size={
                                  13
                                }
                              />

                            </button>

                          </td>

                        </tr>
                      );
                    }
                  )}

                  {/* EMPTY */}

                  {!items.length && (

                    <tr>

                      <td
                        colSpan="9"
                        className="px-3 py-8 text-center text-slate-500"
                      >

                        <Package
                          size={28}
                          className="mx-auto mb-2 text-slate-300"
                        />

                        <p>
                          No products
                          added yet.
                        </p>

                        <p className="mt-1 text-[9px]">
                          Search and
                          select a
                          product above.
                        </p>

                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* ADD MORE */}

            <button
              type="button"
              onClick={() => {

                setShowProducts(
                  true
                );

                searchInputRef.current?.focus();

              }}
              className="mt-2 flex items-center gap-1 rounded border border-blue-500 px-2.5 py-1.5 text-[10px] font-medium text-blue-700 hover:bg-blue-50"
            >

              <Plus size={13} />

              Add More Items

            </button>

          </section>

          {/* ==========================================================
              ADDITIONAL + SUMMARY
          ========================================================== */}

          <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.6fr_1fr]">

            {/* ADDITIONAL */}

            <section
              className={
                sectionClass
              }
            >

              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-900">

                <FileText
                  size={15}
                  className="text-blue-700"
                />

                Additional Information

              </h3>

              <label className="block text-[11px] font-medium text-slate-700">

                Reference No.

                <input
                  className={
                    fieldClass
                  }
                  placeholder="Enter reference number..."
                  value={
                    reference
                  }
                  onChange={(
                    event
                  ) =>
                    setReference(
                      event.target
                        .value
                    )
                  }
                />

              </label>

              <label className="mt-2 block text-[11px] font-medium text-slate-700">

                Notes

                <textarea
                  className={`${fieldClass} h-10 resize-y`}
                  placeholder="Additional notes..."
                  value={
                    orderNotes
                  }
                  onChange={(
                    event
                  ) =>
                    setOrderNotes(
                      event.target
                        .value
                    )
                  }
                />

              </label>

            </section>

            {/* SUMMARY */}

            <section
              className={`${sectionClass} self-start`}
            >

              <h3 className="mb-1 text-xs font-bold text-slate-900">
                Order Summary
              </h3>

              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">

                <span>
                  Subtotal
                </span>

                <span className="font-medium text-slate-800">
                  {formatCurrency(
                    subtotal
                  )}
                </span>

              </div>

              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">

                <span>
                  Discount
                </span>

                <span className="font-medium text-slate-800">
                  {formatCurrency(
                    discountTotal
                  )}
                </span>

              </div>

              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">

                <span>
                  Tax
                </span>

                <span className="font-medium text-slate-800">
                  {formatCurrency(
                    taxTotal
                  )}
                </span>

              </div>

              <div className="flex justify-between py-0.5 text-[10px] text-slate-600">

                <span>
                  Shipping Cost
                </span>

                <span className="font-medium text-slate-800">
                  {formatCurrency(
                    shippingCost
                  )}
                </span>

              </div>

              <div className="mt-1 flex justify-between border-t border-blue-100 pt-2 text-xs font-bold text-blue-900">

                <span>
                  Grand Total
                </span>

                <span className="text-sm text-blue-700">
                  {formatCurrency(
                    grandTotal
                  )}
                </span>

              </div>

            </section>

          </div>

        </div>

        {/* ============================================================
            FOOTER
        ============================================================ */}

        <footer className="flex shrink-0 justify-end gap-2 border-t border-slate-100 bg-white px-4 py-2.5">

          <button
            type="button"
            onClick={
              onClose
            }
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
                <RefreshCw
                  size={13}
                  className="animate-spin"
                />

                Creating...
              </>
            ) : (
              <>
                <Send
                  size={13}
                />

                Create Purchase Order
              </>
            )}

          </button>

        </footer>

      </form>

    </div>
  );
}

export default AddPurchaseOrderModal;