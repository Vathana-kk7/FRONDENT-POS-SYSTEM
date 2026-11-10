import { useEffect, useState } from "react";

const emptyFilters = {
  search: "",
  from_warehouse_id: "",
  to_warehouse_id: "",
  status: "",
  date_from: "",
  date_to: "",
};

export default function FilterAll({ filters = emptyFilters, warehouses = [], onApply, onClear, showStatus = true }) {
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  function update(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function clear() {
    setDraft(emptyFilters);
    onClear?.(emptyFilters);
  }

  return (
    <div className="mt-5 w-full rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="grid items-end gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <label className="text-xs font-semibold text-blue-900">
          Search
          <input
            value={draft.search}
            onChange={(event) => update("search", event.target.value)}
            placeholder="Transfer number or warehouse"
            className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm font-normal text-gray-800"
          />
        </label>
        <label className="text-xs font-semibold text-blue-900">
          From Location
          <select
            value={draft.from_warehouse_id}
            onChange={(event) => update("from_warehouse_id", event.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-normal text-gray-800"
          >
            <option value="">All locations</option>
            {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold text-blue-900">
          To Location
          <select
            value={draft.to_warehouse_id}
            onChange={(event) => update("to_warehouse_id", event.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-normal text-gray-800"
          >
            <option value="">All locations</option>
            {warehouses.map((warehouse) => <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>)}
          </select>
        </label>
        {showStatus && (
          <label className="text-xs font-semibold text-blue-900">
            Status
            <select
              value={draft.status}
              onChange={(event) => update("status", event.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm font-normal text-gray-800"
            >
              <option value="">All statuses</option>
              {["Pending", "In Transit", "Completed", "Cancelled"].map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        )}
        <label className="text-xs font-semibold text-blue-900">
          Date From
          <input
            type="date"
            value={draft.date_from}
            onChange={(event) => update("date_from", event.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm font-normal text-gray-800"
          />
        </label>
        <label className="text-xs font-semibold text-blue-900">
          Date To
          <input
            type="date"
            value={draft.date_to}
            onChange={(event) => update("date_to", event.target.value)}
            className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm font-normal text-gray-800"
          />
        </label>
        <div className="flex gap-2 sm:col-span-2 xl:col-span-6 xl:justify-end">
          <button type="button" onClick={clear} className="h-10 rounded-full border border-gray-200 bg-white px-7 text-sm font-semibold text-blue-900 hover:bg-gray-50">
            Clear
          </button>
          <button type="button" onClick={() => onApply?.(draft)} className="h-10 rounded-full bg-blue-800 px-5 text-sm font-semibold text-white hover:bg-blue-900">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
