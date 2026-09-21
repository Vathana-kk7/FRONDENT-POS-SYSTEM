
import { Edit, Eye, Trash2 } from 'lucide-react';
import { useProduct } from '../../../context/ProductContext';
import { useState } from 'react';

function ProductTable({
  
  productData = [],
  isLoading = false,
  isError = false,
  categoryData = [],
}) {
  const {
    openView,
    openEdit,
    openDelete,
  } = useProduct();
  //Table
  const [selectedProduct, setSelectedProduct] = useState(null);
const [isViewOpen, setIsViewOpen] = useState(false);

const handleView = (product) => {
  setSelectedProduct(product);
  setIsViewOpen(true);
};
  // ================================
  // Skeleton Rows
  // ================================
  const skeletonRows = Array.from({ length: 6 });

  // ================================
  // Get Category Name
  // ================================
  const getCategoryName = (product) => {
    // 1. Laravel relationship:
    // product.category = { id: 1, name: "Computer" }
    if (
      product?.category &&
      typeof product.category === 'object'
    ) {
      return product.category.name || 'Uncategorized';
    }

    // 2. If category is already a string
    if (typeof product?.category === 'string') {
      return product.category;
    }

    // 3. Find category by category_id
    const categoryId =
      product?.category_id ?? product?.categoryId;

    if (categoryId != null && Array.isArray(categoryData)) {
      const matchedCategory = categoryData.find(
        (category) =>
          Number(category?.id) === Number(categoryId)
      );

      if (matchedCategory) {
        return matchedCategory.name || 'Uncategorized';
      }
    }

    return 'Uncategorized';
  };

  

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg shadow-sm bg-white">

      {/* =========================================================
          HEADER
      ========================================================= */}
      <div
        className="
          grid
          grid-cols-[minmax(280px,2fr)_130px_130px_100px_90px_110px_150px]
          items-center
          gap-4
          h-[50px]
          px-6
          bg-gray-100
          border-b
          border-gray-200
          text-gray-700
          text-sm
          font-semibold
        "
      >
        <div>Product</div>

        <div>Category</div>

        <div>SKU</div>

        <div>Price</div>

        <div>Stock</div>

        <div>Status</div>

        <div className="text-right pr-2">
          Action
        </div>
      </div>

      {/* =========================================================
          BODY
      ========================================================= */}
      <div className="h-[450px] overflow-y-auto divide-y divide-gray-200 bg-white scrollbar-none">

        {/* =======================================================
            LOADING
        ======================================================= */}
        {isLoading ? (
          skeletonRows.map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="
                grid
                grid-cols-[minmax(280px,2fr)_130px_130px_100px_90px_110px_150px]
                items-center
                gap-4
                min-h-[80px]
                px-6
                py-3
                bg-white
              "
            >
              {/* Product Skeleton */}
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className="
                    w-[55px]
                    h-[50px]
                    animate-pulse
                    rounded-md
                    bg-gray-200
                    shrink-0
                  "
                />

                <div className="space-y-2 min-w-0 flex-1">
                  <div
                    className="
                      h-4
                      w-36
                      animate-pulse
                      rounded
                      bg-gray-200
                    "
                  />

                  <div
                    className="
                      h-3
                      w-48
                      animate-pulse
                      rounded
                      bg-gray-200
                    "
                  />
                </div>
              </div>

              {/* Category Skeleton */}
              <div>
                <div
                  className="
                    h-6
                    w-20
                    animate-pulse
                    rounded-md
                    bg-gray-200
                  "
                />
              </div>

              {/* SKU Skeleton */}
              <div>
                <div
                  className="
                    h-4
                    w-24
                    animate-pulse
                    rounded
                    bg-gray-200
                  "
                />
              </div>

              {/* Price Skeleton */}
              <div>
                <div
                  className="
                    h-4
                    w-16
                    animate-pulse
                    rounded
                    bg-gray-200
                  "
                />
              </div>

              {/* Stock Skeleton */}
              <div>
                <div
                  className="
                    h-4
                    w-10
                    animate-pulse
                    rounded
                    bg-gray-200
                  "
                />
              </div>

              {/* Status Skeleton */}
              <div>
                <div
                  className="
                    h-6
                    w-20
                    animate-pulse
                    rounded-md
                    bg-gray-200
                  "
                />
              </div>

              {/* Action Skeleton */}
              <div className="flex items-center justify-end gap-2">
                <div
                  className="
                    h-8
                    w-8
                    animate-pulse
                    rounded-lg
                    bg-gray-200
                  "
                />

                <div
                  className="
                    h-8
                    w-8
                    animate-pulse
                    rounded-lg
                    bg-gray-200
                  "
                />

                <div
                  className="
                    h-8
                    w-8
                    animate-pulse
                    rounded-lg
                    bg-gray-200
                  "
                />
              </div>
            </div>
          ))
        ) : isError ? (

          /* =====================================================
             ERROR
          ===================================================== */
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

            <button
              type="button"
              onClick={() => handleView(product)}
              title="View Product"
              className="..."
            >
              <Eye size={16} />
            </button>

            <h3 className="font-semibold text-red-600">
              Failed to Load Products
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Something went wrong while loading products.
            </p>
          </div>

        ) : Array.isArray(productData) &&
          productData.length > 0 ? (

          /* =====================================================
             PRODUCT DATA
          ===================================================== */
          productData.map((product) => {

            // ================================================
            // Stock
            // ================================================
            const stockQty = Number(
              product?.stock_qty ?? 0
            );

            const isOutOfStock = stockQty <= 0;

            // ================================================
            // Product Status
            // ================================================
            const productStatus =
              product?.status?.toLowerCase();

            const isActive =
              productStatus === 'active';

            // ================================================
            // Category
            // ================================================
            const categoryName =
              getCategoryName(product);

            // ================================================
            // Price
            // ================================================
            const sellingPrice = Number(
              product?.selling_price ?? 0
            );

            return (
              <div
                key={product?.id}
                className="
                  grid
                  grid-cols-[minmax(280px,2fr)_130px_130px_100px_90px_110px_150px]
                  items-center
                  gap-4
                  min-h-[80px]
                  px-6
                  py-3
                  hover:bg-gray-50
                  transition-colors
                "
              >

                {/* =================================================
                    PRODUCT INFO
                ================================================= */}
                <div className="flex items-center gap-4 min-w-0">

                  {/* Product Image */}
                  <div
                    className="
                      w-[55px]
                      h-[50px]
                      shrink-0
                      relative
                      overflow-hidden
                      rounded-md
                      border
                      border-gray-200
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {product?.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${product.image}`}
                        alt={product?.name || 'Product'}
                        className="
                          w-full
                          h-full
                          object-cover
                          relative
                          z-10
                        "
                        onError={(event) => {
                          event.currentTarget.style.display =
                            'none';
                        }}
                      />
                    ) : null}

                    <span
                      className="
                        absolute
                        text-[10px]
                        text-gray-400
                        font-medium
                        text-center
                        px-0.5
                        pointer-events-none
                        z-0
                      "
                    >
                      No Image
                    </span>
                  </div>

                  {/* Product Name + Description */}
                  <div className="min-w-0">

                    <h2
                      className="
                        font-medium
                        text-gray-900
                        truncate
                        text-sm
                      "
                      title={product?.name}
                    >
                      {product?.name || 'Unnamed Product'}
                    </h2>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        truncate
                        mt-0.5
                      "
                      title={product?.description}
                    >
                      {product?.description ||
                        'No description available'}
                    </p>

                  </div>
                </div>

                {/* =================================================
                    CATEGORY
                ================================================= */}
                <div className="min-w-0">

                  <span
                    className="
                      inline-flex
                      items-center
                      bg-blue-50
                      px-2.5
                      py-0.5
                      rounded-md
                      text-xs
                      font-medium
                      text-blue-700
                      truncate
                      max-w-full
                    "
                    title={categoryName}
                  >
                    {categoryName}
                  </span>

                </div>

                {/* =================================================
                    SKU
                ================================================= */}
                <div
                  className="
                    text-gray-600
                    text-sm
                    font-mono
                    truncate
                  "
                  title={product?.sku}
                >
                  {product?.sku || 'N/A'}
                </div>

                {/* =================================================
                    PRICE
                ================================================= */}
                <div
                  className="
                    text-gray-900
                    text-sm
                    font-semibold
                  "
                >
                  ${sellingPrice.toFixed(2)}
                </div>

                {/* =================================================
                    STOCK
                ================================================= */}
                <div
                  className={`
                    text-sm
                    font-semibold
                    ${
                      isOutOfStock
                        ? 'text-red-600'
                        : 'text-gray-700'
                    }
                  `}
                >
                  {stockQty}
                </div>

                {/* =================================================
                    PRODUCT STATUS
                ================================================= */}
               
                <div>
                  <span
                    className={`
                      inline-flex
                      items-center
                      gap-1.5
                      px-2.5
                      py-0.5
                      rounded-md
                      text-xs
                      font-medium

                      ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-600'
                      }
                    `}
                  >
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        rounded-full
                        ${
                          isActive
                            ? 'bg-emerald-500'
                            : 'bg-red-500'
                        }
                      `}
                    />

                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* =================================================
                    ACTIONS
                ================================================= */}
                <div
                  className="
                    flex
                    items-center
                    justify-end
                    gap-2
                  "
                >

                  {/* View */}
                  <button
                    type="button"
                    onClick={() =>
                      openView(product)
                    }
                    title="View Product"
                    className="
                      w-8
                      h-8
                      flex
                      items-center
                      justify-center
                      border
                      border-gray-200
                      rounded-lg
                      text-blue-600
                      hover:bg-blue-50
                      transition-colors
                      cursor-pointer
                    "
                  >
                    <Eye size={16} />
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() =>
                      openEdit(product)
                    }
                    title="Edit Product"
                    className="
                      w-8
                      h-8
                      flex
                      items-center
                      justify-center
                      border
                      border-gray-200
                      rounded-lg
                      text-amber-600
                      hover:bg-amber-50
                      transition-colors
                      cursor-pointer
                    "
                  >
                    <Edit size={16} />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() =>
                      openDelete(product)
                    }
                    title="Delete Product"
                    className="
                      w-8
                      h-8
                      flex
                      items-center
                      justify-center
                      border
                      border-gray-200
                      rounded-lg
                      text-red-600
                      hover:bg-red-50
                      transition-colors
                      cursor-pointer
                    "
                  >
                    <Trash2 size={16} />
                  </button>

                </div>
              </div>
            );
          })

        ) : (

          /* =====================================================
             EMPTY STATE
          ===================================================== */
          <div
            className="
              flex
              min-h-[250px]
              flex-col
              items-center
              justify-center
              px-6
              text-center
            "
          >
            <div
              className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-gray-100
                text-gray-400
              "
            >
              <Eye size={24} />
            </div>

            <h3 className="font-semibold text-gray-700">
              No products found
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              There are no products available yet.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductTable;
