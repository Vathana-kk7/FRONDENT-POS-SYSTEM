import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import SaleReceiptModal from "../../components/SaleReceiptModal";
import useGetAllSales from "../../hook/useGetAllSales";
import SaleOrderPagination from "../components/SaleOrderPagination";
import SaleOrderTable from "../components/SaleOrderTable";

const PER_PAGE = 20;

export default function SaleOrder() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const { data: response, isLoading, isFetching, isError, error } = useGetAllSales({
    page,
    perPage: PER_PAGE,
    search,
    dateFrom,
    dateTo,
    paymentStatus,
  });
  const pagination = response?.data;
  const sales = Array.isArray(pagination?.data) ? pagination.data : [];
  const lastPage = Number(pagination?.last_page) || 1;
  const total = Number(pagination?.total) || 0;

  function resetFilters() {
    setSearchInput("");
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setPaymentStatus("");
    setPage(1);
  }

  return (
    <div className="px-5 pb-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Sales History</h1>
          <p className="mt-1 text-sm text-gray-500">Search completed sales and view or print receipts.</p>
        </div>
        <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-800">
          {isFetching ? "Updating..." : `${total} sale${total === 1 ? "" : "s"}`}
        </p>
      </div>

      <section className="mt-5 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <label className="min-w-[220px] flex-1 text-xs font-medium text-gray-600">
          Search invoice
          <span className="relative mt-1 block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Invoice number"
              className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </span>
        </label>
        <label className="text-xs font-medium text-gray-600">
          From
          <input
            type="date"
            value={dateFrom}
            max={dateTo || undefined}
            onChange={(event) => {
              setDateFrom(event.target.value);
              setPage(1);
            }}
            className="mt-1 block h-10 rounded-lg border border-gray-200 px-3 text-sm"
          />
        </label>
        <label className="text-xs font-medium text-gray-600">
          To
          <input
            type="date"
            value={dateTo}
            min={dateFrom || undefined}
            onChange={(event) => {
              setDateTo(event.target.value);
              setPage(1);
            }}
            className="mt-1 block h-10 rounded-lg border border-gray-200 px-3 text-sm"
          />
        </label>
        <label className="text-xs font-medium text-gray-600">
          Payment status
          <select
            value={paymentStatus}
            onChange={(event) => {
              setPaymentStatus(event.target.value);
              setPage(1);
            }}
            className="mt-1 block h-10 min-w-36 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </label>
        <button type="button" onClick={resetFilters} className="flex h-10 items-center gap-1 rounded-lg px-3 text-sm text-gray-600 hover:bg-gray-100">
          <X size={16} /> Clear
        </button>
      </section>

      {isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error?.response?.data?.message || "Sales could not be loaded."}
        </p>
      )}
      <SaleOrderTable
        sales={sales}
        isLoading={isLoading}
        isError={isError}
        onView={setSelectedSale}
      />
      {lastPage > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-gray-600">
            Showing {pagination?.from ?? 0} to {pagination?.to ?? 0} of {total} sales
          </span>
          <SaleOrderPagination
            count={lastPage}
            page={page}
            disabled={isFetching}
            onChange={(_, value) => setPage(value)}
          />
        </div>
      )}

      {selectedSale && <SaleReceiptModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}
    </div>
  );
}
