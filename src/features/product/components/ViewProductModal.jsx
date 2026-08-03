import {
  X,
  Package,
  Tag,
  Barcode,
  DollarSign,
  Boxes,
  CheckCircle2,
} from "lucide-react";
import React from "react";

function ViewProductModal({ product, closeView }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px] px-4">

      {/* Modal */}
      <div className="relative w-full max-w-[750px] overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ================= Header ================= */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Product Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View product information
            </p>
          </div>

          <button
            type="button"
            onClick={closeView}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-gray-500
              hover:bg-gray-100
              hover:text-gray-800
              transition
              cursor-pointer
            "
          >
            <X size={21} />
          </button>

        </div>

        {/* ================= Body ================= */}
        <div className="p-6">

          {/* Product Main */}
          <div className="flex gap-6 rounded-xl border border-gray-200 bg-gray-50 p-5">

            {/* Image */}
            <div className="shrink-0">

              <div className="flex h-[190px] w-[220px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

              </div>

            </div>

            {/* Product Info */}
            <div className="min-w-0 flex-1">

              <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                  <h2 className="truncate text-2xl font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                </div>

                {/* Status */}
                <span
                  className="
                    shrink-0
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-green-100
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-green-700
                  "
                >
                  <CheckCircle2 size={14} />
                  {product.status}
                </span>

              </div>

              {/* SKU */}
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

                <Barcode size={17} />

                <span>SKU:</span>

                <span className="font-semibold text-gray-800">
                  {product.sku}
                </span>

              </div>

            </div>

          </div>

          {/* ================= Information Grid ================= */}
          <div className="mt-5 grid grid-cols-2 gap-4">

            {/* Category */}
            <div className="rounded-xl border border-gray-200 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Tag
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.category}
                  </p>
                </div>

              </div>

            </div>

            {/* Price */}
            <div className="rounded-xl border border-gray-200 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                  <DollarSign
                    size={20}
                    className="text-yellow-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Selling Price
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>

              </div>

            </div>

            {/* Stock */}
            <div className="rounded-xl border border-gray-200 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Boxes
                    size={20}
                    className="text-purple-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Stock Quantity
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.stock} units
                  </p>
                </div>

              </div>

            </div>

            {/* Product Type */}
            <div className="rounded-xl border border-gray-200 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Package
                    size={20}
                    className="text-gray-600"
                  />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Product Type
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.category || "Product"}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ================= Footer ================= */}
        <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">

          <button
            type="button"
            onClick={closeView}
            className="
              rounded-lg
              bg-gray-900
              px-6
              py-2.5
              text-sm
              font-semibold
              text-white
              hover:bg-gray-800
              transition
              cursor-pointer
            "
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default ViewProductModal;