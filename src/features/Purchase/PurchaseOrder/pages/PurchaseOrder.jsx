import {
  ChevronDown,
  Ellipsis,
  Filter,
  Plus,
} from "lucide-react";
import { useState } from "react";

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

import { usePurchaseOrderLayout } from "../../../../context/PurchaseOrderlayoutContext";

import SortableCard from "../components/SortableCard";
import PurchaseOrderTable from "../components/PurchaseOrderTable";
import PurchaseCartReport from "../components/PurchaseCartReport";
import AddPurchaseOrderModal from "../components/AddPurchaseOrderModal";

function PurchaseOrder() {
  const [cards, setCards] =
    useState(PurchaseCards);

  const [isAddOrderOpen, setIsAddOrderOpen] =
    useState(false);

  const { dragEnabledes } =
    usePurchaseOrderLayout();

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
  | Open Add Modal
  |--------------------------------------------------------------------------
  */

  function handleOpenAddPurchase() {
    setIsAddOrderOpen(true);
  }

  /*
  |--------------------------------------------------------------------------
  | Close Add Modal
  |--------------------------------------------------------------------------
  */

  function handleCloseAddPurchase() {
    setIsAddOrderOpen(false);
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

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

          {/* FILTER */}

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-3 rounded-lg border border-gray-200 px-6 text-gray-700 transition hover:bg-gray-50"
          >
            <Filter size={16} />

            <span>
              Filter
            </span>
          </button>

          {/* ADD PURCHASE */}

          <button
            type="button"
            onClick={
              handleOpenAddPurchase
            }
            className="flex h-10 items-center justify-center gap-3 rounded-lg border border-gray-200 bg-blue-800 px-4 text-white transition hover:bg-blue-900"
          >
            <Plus size={16} />

            <span>
              Add Purchase Orders
            </span>
          </button>

          {/* MORE ACTION */}

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 text-white transition hover:bg-blue-900"
          >
            <Ellipsis size={16} />

            <span>
              More Actions
            </span>

            <ChevronDown size={16} />
          </button>

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
          items={cards}
          strategy={
            rectSortingStrategy
          }
        >
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

            {cards.map((card) => (
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

      <PurchaseOrderTable />

      {/* ================================================================
          PURCHASE REPORT
      ================================================================ */}

      <PurchaseCartReport />

      {/* ================================================================
          ADD PURCHASE ORDER MODAL
      ================================================================ */}

      {isAddOrderOpen && (
        <AddPurchaseOrderModal
          onClose={
            handleCloseAddPurchase
          }
        />
      )}

    </div>
  );
}

export default PurchaseOrder;