import { Download, Filter } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StockTransferHistoryLayout } from "../../../../context/StockTransferHistoryLayoutContext";
import { showToast } from "../../../../utils/toast";
import {
  useStockTransferStats,
  useStockTransfers,
} from "../../hook/useStockTransfers";
import StockTransferService from "../../service/StockTransferService";
import FilterAll from "../components/FilterAll";
import ProductPagination from "../components/ProductPagination";
import StockTransferHistoryTable from "../components/StockTransferHistoryTable";
import TransferSummaryCards from "../../StockTransfer/components/TransferSummaryCards";
import { createInitialTransferCards, exportTransfers } from "../../service/transferUtils";

function StockTransferHistory() {
  const { dragIsopenies } = StockTransferHistoryLayout();
  const [cards, setCards] = useState(createInitialTransferCards);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const params = { ...filters, page, per_page: 10 };
  const transfersQuery = useStockTransfers(params);
  const statsQuery = useStockTransferStats();
  const warehousesQuery = useQuery({
    queryKey: ["warehouses"],
    queryFn: StockTransferService.getWarehouses,
  });
  const rows = transfersQuery.data?.data ?? [];

  function applyFilters(nextFilters) {
    const cleanFilters = Object.fromEntries(
      Object.entries(nextFilters).filter(([, value]) => value !== ""),
    );
    setFilters(cleanFilters);
    setPage(1);
  }

  function handleExport() {
    if (!exportTransfers(rows)) {
      showToast("There are no transfer records on this page to export.", "error");
    }
  }

  return (
    <div className="px-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium">Transfer History</h1>
          <p className="text-sm text-gray-600">View stock transfers between locations and warehouses</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setShowFilters((visible) => !visible)} className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-5 text-gray-700 hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button type="button" onClick={handleExport} className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-5 text-gray-700 hover:bg-gray-50">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <TransferSummaryCards stats={statsQuery.data} cards={cards} setCards={setCards} disabled={!dragIsopenies} />
      {statsQuery.isError && <p className="mt-2 text-sm text-red-600">Failed to load transfer summary.</p>}
      {showFilters && (
        <FilterAll
          filters={filters}
          warehouses={warehousesQuery.data ?? []}
          onApply={applyFilters}
          onClear={applyFilters}
        />
      )}
      {warehousesQuery.isError && showFilters && <p className="mt-2 text-sm text-red-600">Failed to load warehouse filters.</p>}
      {transfersQuery.isError && <p className="mt-5 text-sm text-red-600">Failed to load transfer history.</p>}
      {transfersQuery.isLoading ? (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">Loading transfer history...</div>
      ) : (
        <StockTransferHistoryTable rows={rows} />
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3">
        <span className="text-sm font-semibold text-gray-700">
          {transfersQuery.data?.from ?? 0}-{transfersQuery.data?.to ?? 0} of {transfersQuery.data?.total ?? 0} transfers
        </span>
        <ProductPagination
          page={transfersQuery.data?.current_page ?? page}
          count={transfersQuery.data?.last_page ?? 1}
          onChange={setPage}
        />
      </div>
    </div>
  );
}

export default StockTransferHistory;
