import { useEffect, useRef, useState } from "react";
import {
  Download,
  Ellipsis,
  FileSpreadsheet,
  FileText,
  Filter,
  Plus,
  Search,
  X,
} from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useSupplierLayout } from "../../../context/SupplierLayoutContext";
import { showToast } from "../../../utils/toast";
import DeleteModal from "../../../components/common/Delete";
import SupplierFormModal from "../components/SupplierFormModal";
import SupplierPagination from "../components/SupplierPagination";
import SupplierTable from "../components/SupplierTable";
import SortableCard from "../components/SortableCard";
import { SupplierCards } from "../data/Supplierdata";
import SupplierService from "../service/SupplierService";
import useCreateSupplier from "../hook/useCreateSupplier";
import useDeleteSupplier from "../hook/useDeleteSupplier";
import useEditSupplier from "../hook/useEditSupplier";
import useGetAllSupplier from "../hook/useGetAllSupplier";
import useGetSupplierStats from "../hook/useGetSupplierStats";
import useSupplierImport from "../hook/useSupplierImport";

const PER_PAGE = 10;

export default function Supplier() {
  const { Opendraged } = useSupplierLayout();
  const [cards, setCards] = useState(SupplierCards);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [searchInput, setSearchInput] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  const fileInputRef = useRef(null);
  const moreActionsRef = useRef(null);

  useEffect(() => {
    if (!isMoreActionsOpen) return undefined;

    const handleOutsideClick = (event) => {
      if (!moreActionsRef.current?.contains(event.target)) {
        setIsMoreActionsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsMoreActionsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMoreActionsOpen]);

  const {
    suppliers,
    currentPage,
    lastPage,
    total,
    from,
    to,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllSupplier({ page, perPage: PER_PAGE, ...filters });
  const {
    data: supplierStats,
    isError: isStatsError,
    error: statsError,
  } = useGetSupplierStats();
  const {
    createSupplierAsync,
    isPending: isCreating,
  } = useCreateSupplier();
  const {
    mutateAsync: editSupplier,
    isPending: isEditing,
  } = useEditSupplier();
  const {
    mutateAsync: deleteSupplier,
    isPending: isDeleting,
  } = useDeleteSupplier();
  const {
    mutate: importSuppliers,
    isPending: isImporting,
  } = useSupplierImport();
  const isSupplierActionPending =
    isCreating || isEditing || isDeleting || isImporting || isExporting;

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = cards.findIndex((card) => card.id === active.id);
    const newIndex = cards.findIndex((card) => card.id === over.id);
    setCards((previous) => arrayMove(previous, oldIndex, newIndex));
  };

  const handleFilter = (nextFilters) => {
    setFilters(nextFilters);
    setSearchInput(nextFilters.search);
    setPage(1);
  };

  const handleImportFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      showToast("Choose an Excel workbook (.xlsx or .xls).", "error");
      return;
    }
    importSuppliers(file);
  };

  const handleExport = async (type) => {
    setIsMoreActionsOpen(false);
    setIsExporting(true);
    try {
      const response = await SupplierService.export(type, filters);
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `suppliers_${new Date().toISOString().slice(0, 10)}.${type === "excel" ? "xlsx" : "pdf"}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      showToast(`Supplier ${type.toUpperCase()} exported successfully.`, "success");
    } catch (exportError) {
      console.error(`Supplier ${type} export failed:`, exportError);
      showToast(
        exportError?.response?.data?.message || `Supplier ${type} export failed.`,
        "error"
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleDialogSubmit = async (data) => {
    try {
      if (dialog.mode === "create") {
        await createSupplierAsync(data);
      } else if (dialog.mode === "edit") {
        await editSupplier({ id: dialog.supplier.id, data });
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleDelete = (supplier) => {
    setSupplierToDelete(supplier);
  };

  const handleConfirmDelete = async () => {
    if (!supplierToDelete?.id) return;
    try {
      await deleteSupplier(supplierToDelete.id);
      setSupplierToDelete(null);
    } catch {
      // The mutation hook displays the API error.
    }
  };

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const statsByCardId = {
    1: supplierStats?.total_suppliers,
    2: supplierStats?.active_suppliers,
    3: supplierStats?.inactive_suppliers,
    4: currency.format(Number(supplierStats?.total_payable) || 0),
  };

  return (
    <div className="px-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium">Suppliers</h1>
          <p className="text-sm text-gray-600">Manage suppliers and their information</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isSupplierActionPending}
            onClick={() => setDialog({ mode: "create" })}
            className="flex h-11 items-center justify-center rounded-xl bg-blue-800 px-4 text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={18} className="mr-2" /> Add Supplier
          </button>
          <div className="relative" ref={moreActionsRef}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              onChange={handleImportFile}
              className="hidden"
              aria-label="Choose supplier Excel file"
            />
            <button
              type="button"
              disabled={isSupplierActionPending}
              aria-expanded={isMoreActionsOpen}
              onClick={() => setIsMoreActionsOpen((open) => !open)}
              className="flex h-11 items-center rounded-xl border border-gray-200 bg-white px-4 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Ellipsis size={18} className="mr-2" />
              More Actions
            </button>
            {isMoreActionsOpen && (
              <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreActionsOpen(false);
                    fileInputRef.current?.click();
                  }}
                  disabled={isSupplierActionPending}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download size={18} className="text-green-600" />
                  {isImporting ? "Importing Excel..." : "Import Excel"}
                </button>
                <p className="px-3 pb-2 pt-1 text-xs text-gray-500">
                  Excel columns: name, contact_person, email, phone, address, status.
                </p>
                <div className="my-1 border-t border-gray-100" />
                <button
                  type="button"
                  onClick={() => handleExport("excel")}
                  disabled={isSupplierActionPending}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FileSpreadsheet size={18} className="text-green-600" />
                  {isExporting ? "Exporting..." : "Export Excel"}
                </button>
                <button
                  type="button"
                  onClick={() => handleExport("pdf")}
                  disabled={isSupplierActionPending}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FileText size={18} className="text-red-500" /> Export PDF
                </button>
                <div className="my-1 border-t border-gray-100" />
                <button
                  type="button"
                  disabled={isSupplierActionPending}
                  onClick={() => {
                    setIsFilterOpen((open) => !open);
                    setIsMoreActionsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Filter size={18} className="text-blue-600" />
                  {isFilterOpen ? "Hide filters" : "Filter suppliers"}
                </button>
                <p className="px-3 pb-2 pt-1 text-xs text-gray-500">
                  Exports use your current filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards} strategy={rectSortingStrategy}>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <SortableCard
                key={card.id}
                card={{
                  ...card,
                  value: isStatsError
                    ? "Unavailable"
                    : statsByCardId[card.id] ?? (card.id === 4 ? "$0.00" : 0),
                }}
                disabled={!Opendraged}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {(isStatsError || isError) && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {statsError?.message ||
            error?.response?.data?.message ||
            "Unable to load supplier data."}
        </p>
      )}

      {isFilterOpen && (
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <label className="relative min-w-55 flex-1 sm:max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
                setFilters((old) => ({ ...old, search: event.target.value }));
                setPage(1);
              }}
              placeholder="Search suppliers..."
              aria-label="Search suppliers"
              className="h-10 w-full rounded-lg border border-gray-200 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <select
            value={filters.status}
            disabled={isFetching || isSupplierActionPending}
            onChange={(event) => {
              setFilters((old) => ({ ...old, status: event.target.value }));
              setPage(1);
            }}
            aria-label="Filter suppliers by status"
            className="h-10 min-w-37.5 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="button"
            disabled={isFetching || isSupplierActionPending}
            onClick={() => handleFilter({ search: "", status: "" })}
            className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={16} /> Clear filters
          </button>
        </div>
      )}

      <SupplierTable
        suppliers={suppliers}
        startIndex={from > 0 ? from - 1 : (currentPage - 1) * PER_PAGE}
        isLoading={isLoading}
        isBusy={isFetching || isSupplierActionPending}
        onView={(supplier) => setDialog({ mode: "view", supplier })}
        onEdit={(supplier) => setDialog({ mode: "edit", supplier })}
        onDelete={handleDelete}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 bg-gray-100 p-3">
        <p className="text-sm text-gray-600">
          Showing {from} to {to} of {total} suppliers
        </p>
        <SupplierPagination
          currentPage={currentPage}
          lastPage={lastPage}
          disabled={isFetching || isSupplierActionPending}
          onChange={(_, value) => setPage(value)}
        />
      </div>

      {dialog && (
        <SupplierFormModal
          key={`${dialog.mode}-${dialog.supplier?.id ?? "new"}`}
          mode={dialog.mode}
          supplier={dialog.supplier}
          onClose={() => setDialog(null)}
          onSubmit={handleDialogSubmit}
          isPending={isCreating || isEditing}
        />
      )}

      {supplierToDelete && (
        <DeleteModal
          isDeleting={isDeleting}
          item={supplierToDelete}
          title="Delete Supplier?"
          message="Are you sure you want to delete this supplier? This action cannot be undone."
          onClose={() => setSupplierToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
