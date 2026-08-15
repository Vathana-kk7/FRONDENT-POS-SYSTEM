import { Edit, Eye, Trash2 } from "lucide-react";
import React from "react";


function BrandTable({brands}) {
  return (
    <div className="mt-5">

      {/* ================= HEADER ================= */}
      <div
        className="
          grid
          grid-cols-[minmax(300px,1fr)_180px_180px]
          items-center
          gap-4
          h-[50px]
          px-6
          bg-gray-100
          border
          border-gray-200
          text-gray-900
          font-medium
        "
      >
        <div>Brand Name</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* ================= BODY ================= */}
      <div className="max-h-[450px] overflow-y-auto scrollbar-none">

        {brands.map((brand) => (
          <div
            key={brand.id}
            className="
              grid
              grid-cols-[minmax(300px,1fr)_180px_180px]
              items-center
              gap-4
              min-h-[75px]
              px-6
              bg-gray-50
              border-b
              border-gray-200
              hover:bg-gray-100
              transition-all
            "
          >

            {/* Brand Name */}
            <div className="min-w-0">
              <h1 className="font-semibold text-gray-900 truncate">
                {brand.name}
              </h1>
            </div>

            {/* Status */}
            <div>
              {brand.status === "active" ? (
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-md
                    bg-green-100
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-green-700
                  "
                >
                  Active
                </span>
              ) : (
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-md
                    bg-red-100
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-red-700
                  "
                >
                  Inactive
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">

              {/* View */}
              <button
                type="button"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-300
                  cursor-pointer
                  transition
                  hover:bg-white
                "
              >
                <Eye
                  size={18}
                  className="text-blue-600"
                />
              </button>

              {/* Edit */}
              <button
                type="button"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-300
                  cursor-pointer
                  transition
                  hover:bg-white
                "
              >
                <Edit
                  size={18}
                  className="text-yellow-500"
                />
              </button>

              {/* Delete */}
              <button
                type="button"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-300
                  cursor-pointer
                  transition
                  hover:bg-white
                "
              >
                <Trash2
                  size={18}
                  className="text-red-500"
                />
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default BrandTable;