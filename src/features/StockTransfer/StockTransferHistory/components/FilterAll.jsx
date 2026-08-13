import React from "react";
import { ChevronDown } from "lucide-react";
import DatePicker from "../../../../components/common/DatePicker";

function FilterAll() {
  return (
    <div className="mt-5 w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">

        {/* Date Range */}
        <div className="w-full sm:w-[305px]">
          <label className="mb-1.5 block text-xs font-semibold text-blue-900">
            Date Range
          </label>

          <div className="h-10 w-full">
            <DatePicker />
          </div>
        </div>

        {/* From Location */}
        <div className="w-full sm:w-[185px]">
          <label className="mb-1.5 block text-xs font-semibold text-blue-900">
            From Location
          </label>

          <div className="relative">
            <select className="h-10 w-full appearance-none rounded-full border border-gray-200 bg-white px-3 pr-9 text-sm font-medium text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>All Locations</option>
              <option>Main Warehouse</option>
              <option>Phnom Penh Branch</option>
              <option>Siem Reap Branch</option>
              <option>Battambang Branch</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
            />
          </div>
        </div>

        {/* To Location */}
        <div className="w-full sm:w-[185px]">
          <label className="mb-1.5 block text-xs font-semibold text-blue-900">
            To Location
          </label>

          <div className="relative">
            <select className="h-10 w-full appearance-none rounded-full border border-gray-200 bg-white px-3 pr-9 text-sm font-medium text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>All Locations</option>
              <option>Main Warehouse</option>
              <option>Phnom Penh Branch</option>
              <option>Siem Reap Branch</option>
              <option>Battambang Branch</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
            />
          </div>
        </div>

        {/* Status */}
        <div className="w-full sm:w-[185px]">
          <label className="mb-1.5 block text-xs font-semibold text-blue-900">
            Status
          </label>

          <div className="relative">
            <select className="h-10 w-full appearance-none rounded-full border border-gray-200 bg-white px-3 pr-9 text-sm font-medium text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>In Transit</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex gap-3">
          <button
            type="button"
            className="h-10 rounded-full cursor-pointer border border-gray-200 bg-white px-7 text-sm font-semibold text-blue-900 transition-all hover:bg-red-100 hover:text-black active:scale-95"
          >
            Clear
          </button>

          <button
            type="button"
            className="h-10 rounded-full cursor-pointer bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-900 hover:shadow-md active:scale-95"
          >
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}

export default FilterAll;