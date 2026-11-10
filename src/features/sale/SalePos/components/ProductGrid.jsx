import { useEffect, useState } from "react";
import useGetAllCategory from "../../../category/hook/useGetAllCategory";
import useGetAllProduct from "../../../product/hook/useGetAllProduct";
import { formatCurrency, getProductImageUrl } from "../../utils/posFormat";

const PER_PAGE = 20;

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="animate-pulse rounded-xl border border-gray-200 bg-white p-3">
          <div className="h-28 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-2/3 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export default function ProductGrid({ search, onAdd }) {
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(1);
  const {
    category: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategory({ page: 1, perPage: 100, status: "active" });
  const {
    product: products,
    currentPage,
    lastPage,
    isLoading,
    isError,
    query,
  } = useGetAllProduct({
    page,
    perPage: PER_PAGE,
    search,
    status: "active",
    categoryId,
  });

  useEffect(() => setPage(1), [search, categoryId]);

  const categoryButtons = [
    { id: "", name: "All Categories" },
    ...categories.map((category) => ({ id: String(category.id), name: category.name })),
  ];

  return (
    <section className="mt-5">
      {isCategoriesError && (
        <p role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          Categories could not be loaded. Product search is still available.
        </p>
      )}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
        {isCategoriesLoading && !categories.length ? (
          <div className="h-9 w-36 animate-pulse rounded-lg bg-gray-200" />
        ) : (
          categoryButtons.map((category) => (
            <button
              key={category.id || "all"}
              type="button"
              onClick={() => setCategoryId(category.id)}
              className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition ${
                categoryId === category.id
                  ? "border-blue-800 bg-blue-800 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-800"
              }`}
            >
              {category.name}
            </button>
          ))
        )}
      </div>

      {isLoading ? (
        <ProductSkeleton />
      ) : isError ? (
        <div role="alert" className="flex min-h-60 items-center justify-center rounded-xl border border-red-100 bg-white p-6 text-center text-sm text-red-700">
          {query.error?.response?.data?.message || "Products could not be loaded. Refresh and try again."}
        </div>
      ) : products.length === 0 ? (
        <div className="flex min-h-60 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          No products match your search or category.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const stock = Number(product.stock_qty) || 0;
              return (
                <button
                  key={product.id}
                  type="button"
                  disabled={stock <= 0}
                  onClick={() => onAdd?.(product)}
                  aria-label={`Add ${product.name} to cart`}
                  className="group min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-3 text-left transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={getProductImageUrl(product.image)}
                      alt={product.name}
                      onError={(event) => {
                        event.currentTarget.src = "/Images/no.png";
                      }}
                      className="h-full w-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="truncate text-sm font-semibold text-gray-800">{product.name}</p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      SKU: {product.sku || "—"}{product.barcode ? ` · ${product.barcode}` : ""}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="font-bold text-blue-800">{formatCurrency(product.selling_price)}</span>
                      <span className={`text-xs font-medium ${stock > 0 ? "text-green-700" : "text-red-600"}`}>
                        Stock: {stock}
                      </span>
                    </div>
                    {stock <= 0 && <span className="mt-2 block text-xs text-red-600">Out of stock</span>}
                  </div>
                </button>
              );
            })}
          </div>
          {lastPage > 1 && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={currentPage <= 1 || query.isFetching}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">Page {currentPage} of {lastPage}</span>
              <button
                type="button"
                disabled={currentPage >= lastPage || query.isFetching}
                onClick={() => setPage((value) => value + 1)}
                className="rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
