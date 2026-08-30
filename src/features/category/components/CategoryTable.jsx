import { Edit, Eye, Trash2 } from "lucide-react";
import React from "react";
import { useCategory } from "../../../context/CategoryContext";

function CategoryTable({ category = [], isLoading = false, isError }) {
  const { openEdit, openDelete } = useCategory();
  const skeletonRows = Array.from({ length: 6 });

  return (
    <div className="mt-5 h-[503px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* ================= HEADER ================= */}
      <div className="grid grid-cols-[minmax(250px,1fr)_minmax(250px,2fr)_120px_120px] items-center gap-4 h-[60px] px-6 rounded-t-xl bg-gray-100 border-b border-gray-200 text-gray-900 font-medium">
        <div>Category</div>
        <div>Description</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* ================= TABLE BODY ================= */}
      <div className="h-[520px] max-h-[520px] overflow-y-auto scrollbar-none">
        {isLoading ? (
          skeletonRows.map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="grid grid-cols-[minmax(250px,1fr)_minmax(250px,2fr)_120px_120px] items-center gap-4 min-h-[75px] px-6 bg-white border-b border-gray-200"
            >
              <div><div className="h-4 w-32 animate-pulse rounded bg-gray-200" /></div>
              <div><div className="h-4 w-48 animate-pulse rounded bg-gray-200" /></div>
              <div><div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" /></div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          ))
        ) : isError ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-red-400">
              <Eye size={24} />
            </div>
            <h3 className="font-semibold text-red-600">Failed to Load Categories</h3>
            <p className="mt-1 text-sm text-gray-400">Something went wrong while loading categories.</p>
          </div>
        ) : category.length > 0 ? (
          category.map((item, index) => {
            const categoryKey = item.id ? `category-${item.id}` : `category-index-${index}`;

            const isActive =
              item.status === true ||
              item.status === 1 ||
              item.status === "active" ||
              item.is_active === true ||
              item.is_active === 1;

            // Normalize item definition to prevent mismatched status types in edit modal
            const normalizedItem = {
              ...item,
              status: isActive ? "active" : "inactive",
            };

            return (
              <div
                key={categoryKey}
                className="grid grid-cols-[minmax(250px,1fr)_minmax(250px,2fr)_120px_120px] items-center gap-4 min-h-[75px] px-6 bg-gray-50/50 border-b border-gray-200 hover:bg-gray-100 transition-all"
              >
                {/* CATEGORY NAME */}
                <div className="min-w-0">
                  <h1 className="truncate font-semibold text-gray-900">{item.name}</h1>
                </div>

                {/* DESCRIPTION */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-600">{item.description || "-"}</p>
                </div>

                {/* STATUS */}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-500"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-red-500"}`} />
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={() => openEdit(normalizedItem)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 cursor-pointer transition hover:bg-white"
                  >
                    <Edit className="text-yellow-500" size={18} />
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => openDelete(normalizedItem)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 cursor-pointer transition hover:bg-white"
                  >
                    <Trash2 className="text-red-500" size={18} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
              <Eye size={24} />
            </div>
            <h3 className="font-semibold text-gray-700">No Category Found</h3>
            <p className="mt-1 text-sm text-gray-400">There are no categories available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryTable;