import React from "react";
import { ChevronDown, Search } from "lucide-react";
import DatePicker from "../../../../components/common/DatePicker";

function FilterAll() {
  return (
    <div className="mt-5 w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        {/* Search */}
        <div className="w-full sm:w-[255px]">
          <div className="relative">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name ..."
              className="h-10 w-full rounded-full border border-gray-200 bg-white pl-10 pr-3 text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* From Location */}
        <div className="w-full sm:w-[185px]">
          <div className="relative">
            <select className="h-10 w-full appearance-none rounded-full border border-gray-200 bg-white px-3 pr-9 text-sm font-medium text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>Bulk Actions</option>
              <option>Deactivate Selected</option>
              <option>Change Roles</option>
              <option>Duplicate Role</option>
              <option>Deleted Selected</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
            />
          </div>
        </div>

        {/* To Location */}
        <div className="w-full sm:w-[185px]">

          <div className="relative">
            <select className="h-10 w-full appearance-none rounded-full border border-gray-200 bg-white px-3 pr-9 text-sm font-medium text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>Filter by Status</option>
              <option>Manager</option>
              <option>Admin</option>
              <option>staff</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
            />
          </div>
        </div>
      {/* Status Buttons */}
        <div className="ml-auto flex gap-2">
          {/* Active */}
          <button
            type="button"
            className="h-10 cursor-pointer rounded-full border border-green-200 bg-green-100 px-6 text-sm font-semibold text-black hover:text-green-700 shadow-sm transition-all active:bg-green-400 active:scale-95"
          >
            Active
          </button>

          {/* Inactive */}
          <button
            type="button"
            className="h-10 cursor-pointer rounded-full border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-600 transition-all hover:bg-red-50  hover:text-red-600 active:scale-95 active:bg-red-300"
          >
            Inactive
          </button>
        </div>

      </div>
    </div>
  );
}

export default FilterAll;