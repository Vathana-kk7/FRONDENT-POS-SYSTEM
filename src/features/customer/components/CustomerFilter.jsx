import React, { useEffect, useRef, useState } from 'react';
import { Filter, Search, X, Columns3, Check } from 'lucide-react';

const COLUMN_OPTIONS = [
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'group', label: 'Group' },
  { key: 'totalSales', label: 'Total sales' },
  { key: 'status', label: 'Status' },
];

function CustomerFilter({
  onFilter,
  visibleColumns = {},
  toggleColumn,
}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleFilter = () => {
    onFilter?.({
      search: search.trim(),
      status,
    });
  };

  const handleClear = () => {
    setSearch('');
    setStatus('');

    onFilter?.({
      search: '',
      status: '',
    });
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleFilter();
    }
  };

  const allColumnsVisible = COLUMN_OPTIONS.every(
    (column) => visibleColumns[column.key] !== false
  );

  const handleToggleAll = () => {
    const shouldShowAll = !allColumnsVisible;

    COLUMN_OPTIONS.forEach((column) => {
      const currentlyVisible =
        visibleColumns[column.key] !== false;

      if (currentlyVisible !== shouldShowAll) {
        toggleColumn?.(column.key);
      }
    });
  };

  return (
    <div className="mt-5 mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        {/* Search and filters */}
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-[280px]">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search customer..."
              aria-label="Search customers"
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter customers by status"
            className="h-10 min-w-[145px] cursor-pointer rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Apply filter */}
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
            <Filter size={16} />
            Filter
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
            // className="flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 active:scale-95"
          >
            <X size={16} />
            Clear
          </button>
        </div>

        {/* Column selector */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((previous) => !previous)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            className={`flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-100 ${
              dropdownOpen
                ? 'border-blue-300 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Columns3 size={17} />

            Columns

            <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
              {
                COLUMN_OPTIONS.filter(
                  (column) =>
                    visibleColumns[column.key] !== false
                ).length
              }
              /{COLUMN_OPTIONS.length}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
              {/* Dropdown header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Table columns
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Show or hide columns
                  </p>
                </div>

                <Columns3 size={18} className="text-gray-400" />
              </div>

              {/* Toggle all */}
              <button
                type="button"
                onClick={handleToggleAll}
                className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
              >
                {allColumnsVisible ? 'Hide all optional columns' : 'Show all columns'}

                {allColumnsVisible && <Check size={16} />}
              </button>

              {/* Column checkboxes */}
              <div className="max-h-64 overflow-y-auto p-2">
                {COLUMN_OPTIONS.map((column) => {
                  const isVisible =
                    visibleColumns[column.key] !== false;

                  return (
                    <label
                      key={column.key}
                      className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      <span>{column.label}</span>

                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={() =>
                          toggleColumn?.(column.key)
                        }
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                  );
                })}
              </div>

              {/* Dropdown footer */}
              <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 transition hover:bg-gray-100"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerFilter;