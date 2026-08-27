import { Edit, Eye, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useDeleteBrand from "../hooks/useDeleteBrand";
import DeleteModal from "../../../components/common/Delete";

function BrandTable({ brands = [], isLoading = false, openEdit }) {
  const [deleteItem, setDeleteItem] = useState(null);

  const {
    mutate: deleteBrand,
    isPending: isDeleting,
  } = useDeleteBrand();

  const handleDeleteClick = (brand) => {
    setDeleteItem(brand);
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;
    // 🔍 ការពារ handles ទាំង deleteItem.id ឬ deleteItem.brand_id
    const targetId = deleteItem.id ?? deleteItem.brand_id;
    
    deleteBrand(targetId, {
      onSuccess: () => {
        setDeleteItem(null);
      },
    });
  };

  const skeletonRows = Array.from({ length: 6 });

  return (
    <>
      <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* ================= HEADER ================= */}
        <div className="grid grid-cols-[minmax(300px,1fr)_180px_180px] items-center gap-4 h-[56px] px-6 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
          <div className="font-bold text-black">Brand Name</div>
          <div className="font-bold text-black">Status</div>
          <div className="font-bold text-black">Action</div>
        </div>

        {/* ================= BODY ================= */}
        <div className="h-[450px] overflow-y-auto scrollbar-none">
          {isLoading ? (
            /* ================= SKELETON ================= */
            skeletonRows.map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="grid grid-cols-[minmax(300px,1fr)_180px_180px] items-center gap-4 min-h-[75px] px-6 bg-white border-b border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
                <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200" />
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
                </div>
              </div>
            ))
          ) : brands && brands.length > 0 ? (
            /* ================= DATA ================= */
            brands.map((brand, index) => {
              // 🔍 ធានាថា key តែងតែ Unique និងការពារ duplicate render
              const brandKey = brand.id ? `brand-${brand.id}-${index}` : `brand-index-${index}`;

              return (
                <div
                  key={brandKey}
                  className="group grid grid-cols-[minmax(300px,1fr)_180px_180px] items-center gap-4 min-h-[75px] px-6 bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  {/* BRAND NAME */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-500 transition-all duration-200 group-hover:bg-blue-50 group-hover:text-blue-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0">
                        <h1 className="truncate font-semibold text-gray-900 transition-all duration-200 group-hover:text-blue-600">
                          {brand.name}
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* STATUS */}
                  <div>
                    {brand.status === "active" ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600 ring-1 ring-green-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-red-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                        Inactive
                      </span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      title="View Brand"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm active:scale-95"
                    >
                      <Eye size={17} className="text-blue-500" />
                    </button>

                    <button
                      type="button"
                      title="Edit Brand"
                      onClick={() => openEdit(brand)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-200 hover:bg-yellow-50 hover:shadow-sm active:scale-95"
                    >
                      <Edit size={17} className="text-yellow-500" />
                    </button>

                    <button
                      type="button"
                      title="Delete Brand"
                      disabled={isDeleting}
                      onClick={() => handleDeleteClick(brand)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:shadow-sm active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={17} className="text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            /* ================= EMPTY STATE ================= */
            <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                <Eye size={24} />
              </div>
              <h3 className="font-semibold text-gray-700">No Brands Found</h3>
              <p className="mt-1 text-sm text-gray-400">
                There are no brands available yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      <DeleteModal
        item={deleteItem}
        isDeleting={isDeleting}
        title="Delete Brand?"
        message="Are you sure you want to delete this brand? This action cannot be undone."
        onClose={() => setDeleteItem(null)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default BrandTable;