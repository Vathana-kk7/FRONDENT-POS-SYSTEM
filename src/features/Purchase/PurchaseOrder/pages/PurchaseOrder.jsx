
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Ellipsis,
  Filter,
  Plus,
  Download,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import {
  closestCenter,
  DndContext,
} from "@dnd-kit/core";

import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

import { PurchaseCards } from "../data/Purchasedata";

import SortableCard from "../components/SortableCard";
import PurchaseOrderTable from "../components/PurchaseOrderTable";
import PurchaseCartReport from "../components/PurchaseCartReport";
import AddPurchaseOrderModal from "../components/AddPurchaseOrderModal";
import { usePurchaseOrderLayout } from "../../../../context/PurchaseOrderlayoutContext";
import { usePurchase } from "../../../../context/PurchaseContext";
import useDeletePurchaseOrder from "../hook/useDeletePurchaseOrder";
import DeleteModal from "../../../../components/common/Delete";
import useStatePurchaseOrder from "../hook/useStatePurchaseOrder";
import ReceiveStockModal from "../components/ReceiveStockModal";

function PurchaseOrder() {
  const [cards, setCards] =useState(PurchaseCards);
const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
const [isFilterOpen, setIsFilterOpen] = useState(false);
const moreActionsRef = useRef(null);
const fileInputRef = useRef(null);
const { dragEnabledes, setDragEnabledes } = usePurchaseOrderLayout();
const isPurchaseActionPending = false; // Replace with mutation loading states
 useEffect(() => {
  if (!isMoreActionsOpen) return;

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
function handleImportFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";

  if (!file) return;

  if (!/\.(xlsx|xls)$/i.test(file.name)) {
    alert("Please choose an Excel file (.xlsx or .xls).");
    return;
  }

  console.log("Purchase Order Excel:", file);

  // TODO: Connect Purchase Order Import API
}

function handleExport(type) {
  setIsMoreActionsOpen(false);

  if (type === "excel") {
    console.log("Export Purchase Orders Excel");
    // TODO: Connect Excel Export API
  }

  if (type === "pdf") {
    console.log("Export Purchase Orders PDF");
    // TODO: Connect PDF Export API
  }
}
  /*
  |--------------------------------------------------------------------------
  | Drag Card
  |--------------------------------------------------------------------------
  */

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    const oldIndex = cards.findIndex(
      (item) => item.id === active.id
    );

    const newIndex = cards.findIndex(
      (item) => item.id === over.id
    );

    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      return;
    }

    setCards((currentCards) =>
      arrayMove(
        currentCards,
        oldIndex,
        newIndex
      )
    );
  }
  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */
 const {
     isAddOpen,
     isDeleteOpen,
     isViewOpen,
     isEditOpen,
     selectedPurchase,
 
     openAdd,
     closeAdd,
 
     openView,
     closeView,
 
     openEdit,
     closeEdit,
 
     openDelete,
     closeDelete,
   } = usePurchase();
   const { mutateAsync: deletePurchase, isPending: isDeleting } = useDeletePurchaseOrder();

async function handleConfirmDelete() {
  if (!selectedPurchase) return;

  try {
    await deletePurchase(selectedPurchase.id);
    closeDelete();
  } catch (error) {
    console.error("Delete error:", error); // toast បង្ហាញក្នុង hook រួចហើយ
  }
}

function formatCurrency(amount) {
  return `$${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ក្នុង function PurchaseOrder() ក្រោម useState cards
const { data: stats, isLoading: isStatsLoading } = useStatePurchaseOrder();

const liveCards = cards.map((card) => {
  if (isStatsLoading || !stats) return { ...card, value: "..." };

  switch (card.id) {
    case 1: return { ...card, value: stats.total_orders };
    case 2: return { ...card, value: formatCurrency(stats.total_value) };
    case 3: return { ...card, value: stats.received_count };
    case 4: return { ...card, value: stats.pending_count };
    case 5: return { ...card, value: stats.cancelled_count };
    default: return card;
  }
});
const [receivePurchase, setReceivePurchase] = useState(null);

  return (
    <div className="px-5">

      {/* ================================================================
          HEADER
      ================================================================ */}

      <div className="flex items-start justify-between">

        {/* LEFT */}
        <div>
          <h1 className="text-xl font-medium">
            Purchase Orders
          </h1>

          <p className="text-sm text-gray-600">
            Manage all your purchase orders
            and track their status
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex gap-3">

          

          {/* ADD PURCHASE */}

          <button
            type="button"
            onClick={
              openAdd
            }
            className="flex h-10 items-center cursor-pointer justify-center gap-3 rounded-lg border border-gray-200 bg-blue-800 px-4 text-white transition hover:bg-blue-900"
          >
            <Plus size={16} />

            <span>
              Add Purchase Orders
            </span>
          </button>

          {/* MORE ACTION */}

         <div className="relative" ref={moreActionsRef}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImportFile}
            className="hidden"
            aria-label="Choose purchase order Excel file"
          />

          <button
            type="button"
            disabled={isPurchaseActionPending}
            aria-expanded={isMoreActionsOpen}
            onClick={() => setIsMoreActionsOpen((open) => !open)}
            className="flex h-10 items-center gap-2 rounded-lg bg-blue-800 px-4 text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Ellipsis size={16} />
            <span>More Actions</span>
            <ChevronDown size={16} />
          </button>

          {isMoreActionsOpen && (
            <div className="absolute right-0 top-12 z-[999] w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
              {/* Import Excel */}
              <button
                type="button"
                onClick={() => {
                  setIsMoreActionsOpen(false);
                  fileInputRef.current?.click();
                }}
                disabled={isPurchaseActionPending}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-green-50 disabled:opacity-50"
              >
                <Download size={18} className="text-green-600" />
                Import Excel
              </button>

              <p className="px-3 pb-2 pt-1 text-xs text-gray-500">
                Import purchase orders using an Excel file.
              </p>

              <div className="my-1 border-t border-gray-100" />

              {/* Export Excel */}
              <button
                type="button"
                onClick={() => handleExport("excel")}
                disabled={isPurchaseActionPending}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-green-50 disabled:opacity-50"
              >
                <FileSpreadsheet size={18} className="text-green-600" />
                Export Excel
              </button>

              {/* Export PDF */}
              <button
                type="button"
                onClick={() => handleExport("pdf")}
                disabled={isPurchaseActionPending}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-red-50 disabled:opacity-50"
              >
                <FileText size={18} className="text-red-500" />
                Export PDF
              </button>

              <div className="my-1 border-t border-gray-100" />

              {/* Filter */}
              <button
                type="button"
                onClick={() => {
                  setIsFilterOpen((open) => !open);
                  setIsMoreActionsOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-blue-50"
              >
                <Filter size={18} className="text-blue-600" />
                {isFilterOpen ? "Hide filters" : "Filter purchase orders"}
              </button>

              <p className="px-3 pb-2 pt-1 text-xs text-gray-500">
                Exports use your current filters.
              </p>
            </div>
          )}
        </div>

        </div>
      </div>

      {/* ================================================================
          PURCHASE STAT CARDS
      ================================================================ */}

      <DndContext
        collisionDetection={
          closestCenter
        }
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={liveCards}
          strategy={
            rectSortingStrategy
          }
        >
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

            {liveCards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                disabled={
                  !dragEnabledes
                }
              />
            ))}

          </div>
        </SortableContext>
      </DndContext>

      {/* ================================================================
          PURCHASE ORDER TABLE
      ================================================================ */}

      <PurchaseOrderTable 
        onEdite={(purchase) => openEdit(purchase)} 
        onDelete={(purchase) => openDelete(purchase)}
        onView={(purchase) => openView(purchase)}
        // onReceive={(p) => setReceivePurchase(p)}
    />
    {/* {receivePurchase && (
  <ReceiveStockModal
    purchase={receivePurchase}
    onClose={() => setReceivePurchase(null)}
  />
)} */}

      {/* ================================================================
          PURCHASE REPORT
      ================================================================ */}

      <PurchaseCartReport />

      {/* ================================================================
          ADD PURCHASE ORDER MODAL
      ================================================================ */}

      {isAddOpen && (
        <AddPurchaseOrderModal
          onClose={closeAdd}
        />
      )}

      {isEditOpen && (
        <AddPurchaseOrderModal
          onClose={closeEdit}
          purchase={selectedPurchase}
        />
      )}
      {isDeleteOpen && selectedPurchase && (
        <DeleteModal
          item={{
            name: selectedPurchase.purchase_order_no,
            sku: selectedPurchase.supplier?.name,
          }}
          title="Delete Purchase Order?"
          message="Are you sure you want to delete this purchase order? All its items will be removed. This action cannot be undone."
          isDeleting={isDeleting}
          onClose={closeDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

    </div>
  );
}

export default PurchaseOrder;