import { Filter, Search, X } from "lucide-react";
import React, { useState } from "react";

function CategoryFilter({ onFilter }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const handleFilter = () => {
    onFilter({
      search,
      status,
    });
  };

  const handleClear = () => {
    setSearch("");
    setStatus("");

    onFilter({
      search: "",
      status: "",
    });
  };
  // console.log(handleFilter);

  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}
        <div className="relative w-full sm:w-[300px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFilter();
              }
            }}
            placeholder="Search brand..."
            className="
              h-10 w-full rounded-lg
              border border-gray-200
              bg-white pl-10 pr-4
              text-sm text-gray-700
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-100
            "
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            h-10 min-w-[160px]
            rounded-lg border border-gray-200
            bg-white px-4
            text-sm text-gray-600
            outline-none
            cursor-pointer
            transition
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
          "
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {/* Filter */}
        <button
          type="button"
          onClick={handleFilter}
          className="
            flex h-10 items-center gap-2
            rounded-lg border border-gray-200
            bg-white px-4
            text-sm font-medium text-gray-600
            cursor-pointer
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-700
            active:scale-95
          "
        >
          <Filter size={17} />
          <span>Filter</span>
        </button>

        {/* Clear */}
        <button
          type="button"
          onClick={handleClear}
          className="
            flex h-10 items-center gap-2
            rounded-lg px-4
            text-sm font-medium text-gray-500
            cursor-pointer
            transition
            hover:bg-gray-100
            hover:text-gray-800
            active:scale-95
          "
        >
          <X size={16} />
          <span>Clear</span>
        </button>

      </div>
    </div>
  );
}

export default CategoryFilter;