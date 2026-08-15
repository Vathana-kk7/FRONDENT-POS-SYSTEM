import { Edit, Eye, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useDeleteBrand from "../hooks/useDeleteBrand";
import DeleteModal from "../../../components/common/Delete";
function BrandTable({ brands = [] }) {
  const [deleteItem, setDeleteItem] = useState(null);
  const{
    mutate:deleteBrand,
    isPending: isDeleting,
  }=useDeleteBrand();

  //Catch Id from button Delte
   const handleDeleteClick = (brand) => {
    setDeleteItem(brand);
  };
   const handleConfirmDelete = () => {

    if (!deleteItem) return;

    deleteBrand(deleteItem.id, {
      onSuccess: () => {
        setDeleteItem(null);
      },
    });
  };
  return (
    <>
    <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* ================= HEADER ================= */}
      <div
        className="
          grid
          grid-cols-[minmax(300px,1fr)_180px_180px]
          items-center
          gap-4
          h-[56px]
          px-6
          bg-gray-50
          border-b
          border-gray-200
          text-sm
          font-semibold
          text-gray-600
        "
      >
        <div>Brand Name</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* ================= BODY ================= */}
      <div className="h-[450px] overflow-y-auto scrollbar-none">

        {brands.length > 0 ? (
          brands.map((brand, index) => (
            <div
              key={brand.id}
              className="
                group
                grid
                grid-cols-[minmax(300px,1fr)_180px_180px]
                items-center
                gap-4
                min-h-[75px]
                px-6
                bg-white
                border-b
                border-gray-200
                hover:bg-gray-200
                hover:scale-x-101
                transition-all
                duration-200
                last:border-b-0
              "
            >

              {/* ================= BRAND NAME ================= */}
              <div className="min-w-0">

                <div className="flex items-center gap-3">

                  {/* Number */}
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-gray-100
                      text-xs
                      font-semibold
                      text-gray-500
                      transition-all
                      duration-200
                      group-hover:bg-blue-50
                      group-hover:text-blue-600
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Brand */}
                  <div className="min-w-0">
                    <h1
                      className="
                        truncate
                        font-semibold
                        text-gray-900
                        transition-all
                        duration-200
                        group-hover:text-blue-600
                      "
                    >
                      {brand.name}
                    </h1>

                    <p className="mt-0.5 text-xs text-gray-400">
                      {/* Brand ID: #{brand.id} */}
                    </p>
                  </div>

                </div>

              </div>

              {/* ================= STATUS ================= */}
              <div>

                {brand.status === "active" ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-green-50
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-green-600
                      ring-1
                      ring-green-100
                      transition-all
                      duration-200
                      group-hover:bg-green-100
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>
                ) : (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-red-50
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-red-600
                      ring-1
                      ring-red-100
                      transition-all
                      duration-200
                      group-hover:bg-red-100
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Inactive
                  </span>
                )}

              </div>

              {/* ================= ACTIONS ================= */}
              <div className="flex items-center gap-2">

                {/* View */}
                <button
                  type="button"
                  title="View Brand"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    cursor-pointer
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:shadow-sm
                    active:scale-95
                  "
                >
                  <Eye
                    size={17}
                    className="
                      text-blue-500
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  />
                </button>

                {/* Edit */}
                <button
                  type="button"
                  title="Edit Brand"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    cursor-pointer
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-yellow-200
                    hover:bg-yellow-50
                    hover:shadow-sm
                    active:scale-95
                  "
                >
                  <Edit
                    size={17}
                    className="
                      text-yellow-500
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  title="Delete Brand"
                  disabled={isDeleting}
                  onClick={() => handleDeleteClick(brand)}
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    cursor-pointer
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-red-200
                    hover:bg-red-50
                    hover:shadow-sm
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Trash2
                    size={17}
                    className="
                      text-red-500
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                  />
                </button>

              </div>

            </div>
          ))
        ) : (

          /* ================= EMPTY STATE ================= */
          <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">

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
                transition-all
                duration-300
                hover:scale-110
                hover:bg-blue-50
                hover:text-blue-500
              "
            >
              <Eye size={24} />
            </div>

            <h3 className="font-semibold text-gray-700">
              No Brands Found
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              There are no brands available yet.
            </p>

          </div>

        )}

      </div>
    </div>
     <DeleteModal
      item={deleteItem}
      title="Delete Brand?"
      message="Are you sure you want to delete this brand? This action cannot be undone."
      onClose={() => setDeleteItem(null)}
      onConfirm={handleConfirmDelete}
    />
  </>
  );
}

export default BrandTable;