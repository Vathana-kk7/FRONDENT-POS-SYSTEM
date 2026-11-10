import { Filter, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useStockTransferAllLayout } from "../../../../context/StockTransferAllLayoutContext";
import { showToast } from "../../../../utils/toast";
import {
  useStockTransferMutations,
  useStockTransferStats,
  useStockTransfers,
} from "../../hook/useStockTransfers";
import StockTransferService from "../../service/StockTransferService";
import FilterAll from "../../StockTransferHistory/components/FilterAll";
import ProductPagination from "../../StockTransferHistory/components/ProductPagination";
import StockTransferAllTable from "../components/StockTransferAllTable";
import TransferDetailsModal from "../components/TransferDetailsModal";
import TransferFormModal from "../components/TransferFormModal";
import TransferSummaryCards from "../components/TransferSummaryCards";
import { createInitialTransferCards } from "../../service/transferUtils";

function StockTransfer() {
  const { dragIsopened } = useStockTransferAllLayout();
  const [cards, setCards] = useState(createInitialTransferCards);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState(null);
  const [viewingTransfer, setViewingTransfer] = useState(null);
  const params = { ...filters, page, per_page: 10 };
  const transfersQuery = useStockTransfers(params);
  const statsQuery = useStockTransferStats();
  const warehousesQuery = useQuery({
    queryKey: ["warehouses"],
    queryFn: StockTransferService.getWarehouses,
  });
  const mutations = useStockTransferMutations();
  const rows = transfersQuery.data?.data ?? [];

  function applyFilters(nextFilters) {
    const cleanFilters = Object.fromEntries(
      Object.entries(nextFilters).filter(([, value]) => value !== ""),
    );
    setFilters(cleanFilters);
    setPage(1);
  }

  function saveTransfer(data) {
    const mutation = editingTransfer ? mutations.updateTransfer : mutations.createTransfer;
    mutation.mutate(
      editingTransfer ? { id: editingTransfer.id, data } : data,
      {
        onSuccess: () => {
          setModalOpen(false);
          setEditingTransfer(null);
          showToast(editingTransfer ? "Stock transfer updated." : "Stock transfer created.", "success");
        },
      },
    );
  }

  function deleteTransfer(transfer) {
    if (!window.confirm(`Delete stock transfer ${transfer.transfer_no}?`)) return;
    mutations.deleteTransfer.mutate(transfer.id, {
      onSuccess: () => showToast("Stock transfer deleted.", "success"),
    });
  }

  function changeStatus(transfer, status) {
    const action = status === "In Transit" ? "dispatch" : status === "Completed" ? "complete" : "cancel";
    if (!window.confirm(`Are you sure you want to ${action} ${transfer.transfer_no}?`)) return;
    mutations.changeStatus.mutate({ id: transfer.id, status }, {
      onSuccess: () => showToast("Stock transfer status updated.", "success"),
    });
  }

  function openCreateModal() {
    setEditingTransfer(null);
    setModalOpen(true);
  }

  return (
    <div className="px-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium">Stock Transfer</h1>
          <p className="text-sm text-gray-600">Manage and track stock transfer between warehouses</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => setShowFilters((visible) => !visible)} className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-5 text-gray-700 hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button type="button" onClick={openCreateModal} className="flex h-10 items-center gap-2 rounded-lg bg-blue-800 px-4 text-white hover:bg-blue-900">
            <Plus size={16} /> Add Stock Transfer
          </button>
        </div>
      </div>

      <TransferSummaryCards stats={statsQuery.data} cards={cards} setCards={setCards} disabled={!dragIsopened} />
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
      {transfersQuery.isError && <p className="mt-5 text-sm text-red-600">Failed to load stock transfers.</p>}
      {transfersQuery.isLoading ? (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">Loading stock transfers...</div>
      ) : (
        <StockTransferAllTable
          rows={rows}
          onEdit={(transfer) => { setEditingTransfer(transfer); setModalOpen(true); }}
          onView={setViewingTransfer}
          onDelete={deleteTransfer}
          onChangeStatus={changeStatus}
          busyId={mutations.changeStatus.isPending ? mutations.changeStatus.variables?.id : null}
        />
      )}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-100 p-3">
        <span className="text-sm font-semibold text-gray-700">
          {transfersQuery.data?.from ?? 0}-{transfersQuery.data?.to ?? 0} of {transfersQuery.data?.total ?? 0} stock transfers
        </span>
        <ProductPagination
          page={transfersQuery.data?.current_page ?? page}
          count={transfersQuery.data?.last_page ?? 1}
          onChange={setPage}
        />
      </div>
      <TransferFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTransfer(null); }}
        onSubmit={saveTransfer}
        isSaving={mutations.createTransfer.isPending || mutations.updateTransfer.isPending}
        initialData={editingTransfer}
        title={editingTransfer ? "Edit Stock Transfer" : "Add Stock Transfer"}
      />
      <TransferDetailsModal transfer={viewingTransfer} onClose={() => setViewingTransfer(null)} />
    </div>
  );
}

export default StockTransfer;
