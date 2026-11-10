import { Filter, Plus } from "lucide-react";
import { useState } from "react";
import { useStockTransferLayout } from "../../../../context/StockTransferLayoutContext";
import { useStockTransferMutations, useStockTransferRequests, useStockTransferStats } from "../../hook/useStockTransfers";
import StockTransferService from "../../service/StockTransferService";
import StockTransferTable from "../components/StockTransferTable";
import TransferFormModal from "../../StockTransfer/components/TransferFormModal";
import TransferSummaryCards from "../../StockTransfer/components/TransferSummaryCards";
import { createInitialTransferCards } from "../../service/transferUtils";
import FilterAll from "../../StockTransferHistory/components/FilterAll";
import ProductPagination from "../../StockTransferHistory/components/ProductPagination";
import { useQuery } from "@tanstack/react-query";
import { showToast } from "../../../../utils/toast";

function StockTransferRequest() {
  const { dragIsopenes } = useStockTransferLayout();
  const [cards, setCards] = useState(createInitialTransferCards);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const params = { ...filters, page, per_page: 10 };
  const requestsQuery = useStockTransferRequests(params);
  const statsQuery = useStockTransferStats();
  const warehousesQuery = useQuery({
    queryKey: ["warehouses"],
    queryFn: StockTransferService.getWarehouses,
  });
  const mutations = useStockTransferMutations();
  const rows = requestsQuery.data?.data ?? [];

  function openCreateModal() {
    setEditingRequest(null);
    setModalOpen(true);
  }

  function submitRequest(data) {
    const mutation = editingRequest ? mutations.updateRequest : mutations.createRequest;
    mutation.mutate(
      editingRequest ? { id: editingRequest.id, data } : data,
      {
        onSuccess: () => {
          setModalOpen(false);
          setEditingRequest(null);
          showToast(editingRequest ? "Transfer request updated." : "Transfer request created.", "success");
        },
      },
    );
  }

  function deleteRequest(request) {
    if (!window.confirm(`Delete transfer request ${request.transfer_no}?`)) return;
    mutations.deleteRequest.mutate(request.id, {
      onSuccess: () => showToast("Transfer request deleted.", "success"),
    });
  }

  function applyFilters(nextFilters) {
    const cleanFilters = Object.fromEntries(
      Object.entries(nextFilters).filter(([, value]) => value !== ""),
    );
    setFilters(cleanFilters);
    setPage(1);
  }

  return (
    <div className="px-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-medium">Transfer Request</h1>
            <p className="text-sm text-gray-600">Request stock transfer between locations/warehouses</p>
          </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setShowFilters((visible) => !visible)} className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-5 text-gray-700 hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button type="button" onClick={openCreateModal} className="flex h-10 items-center gap-2 rounded-lg bg-blue-800 px-4 text-white hover:bg-blue-900">
            <Plus size={16} /> Add Transfer Request
          </button>
        </div>
      </div>

      <TransferSummaryCards stats={statsQuery.data} cards={cards} setCards={setCards} disabled={!dragIsopenes} />
      {statsQuery.isError && <p className="mt-2 text-sm text-red-600">Failed to load transfer summary.</p>}
      {showFilters && (
        <FilterAll
          filters={filters}
          warehouses={warehousesQuery.data ?? []}
          onApply={applyFilters}
          onClear={applyFilters}
          showStatus={false}
        />
      )}
      {warehousesQuery.isError && showFilters && <p className="mt-2 text-sm text-red-600">Failed to load warehouse filters.</p>}
      {requestsQuery.isError && <p className="mt-5 text-sm text-red-600">Failed to load transfer requests.</p>}
      {requestsQuery.isLoading ? (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">Loading transfer requests...</div>
      ) : (
        <StockTransferTable
          rows={rows}
          onEdit={(request) => { setEditingRequest(request); setModalOpen(true); }}
          onDelete={deleteRequest}
          busyId={mutations.deleteRequest.isPending ? mutations.deleteRequest.variables : null}
        />
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3">
        <span className="text-sm font-semibold text-gray-700">
          {requestsQuery.data?.from ?? 0}-{requestsQuery.data?.to ?? 0} of {requestsQuery.data?.total ?? 0} transfer requests
        </span>
        <ProductPagination
          page={requestsQuery.data?.current_page ?? page}
          count={requestsQuery.data?.last_page ?? 1}
          onChange={setPage}
        />
      </div>
      <TransferFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingRequest(null); }}
        onSubmit={submitRequest}
        isSaving={mutations.createRequest.isPending || mutations.updateRequest.isPending}
        initialData={editingRequest}
        title={editingRequest ? "Edit Transfer Request" : "Add Transfer Request"}
      />
    </div>
  );
}

export default StockTransferRequest;