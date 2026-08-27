import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import ModelBrand from "../components/ModelBrand";
import BrandFilter from "../components/BrandFilter";
import BrandTable from "../components/BrandTable";
import ProductPagination from "../components/ProductPagination";
import SortableCard from "../components/SortableCard";
import ImportBrand from "../components/ImportBrand";
import ExportBrand from "../components/ExportBrand";

import { useBrandLayout } from "../../../context/BrandLayoutContext";
import { useBrandContext } from "../../../context/BrandContext";

import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { closestCenter, DndContext } from "@dnd-kit/core";

import { BrandCardConfig } from "../data/BrandData";

import useCreateBrand from "../hooks/useCreateBrand";
import useBrands from "../hooks/useBrand";
import useEditBrand from "../hooks/useEditeBrand";
import useBrandStats from "../hooks/useBrandStats";

function Brand() {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  const {
    isAddOpen,
    openAdd,
    closeAdd,
    openEdit,
    closeEdit,
    isEditOpen,
    selectedBrand,
  } = useBrandContext();

  const { dragShow } = useBrandLayout();

  /*
  |--------------------------------------------------------------------------
  | Brand Data
  |--------------------------------------------------------------------------
  */

  const {
    brands,
    isLoading,
    currentPage,
    lastPage,
    total,
    from,
    to,
  } = useBrands({
    page,
    per_page: perPage,
    search: filters.search,
    status: filters.status,
  });

  /*
  |--------------------------------------------------------------------------
  | Create Brand
  |--------------------------------------------------------------------------
  */

  const {
    createBrandAsync,
    isPending,
  } = useCreateBrand();

  /*
  |--------------------------------------------------------------------------
  | Edit Brand
  |--------------------------------------------------------------------------
  */

  const {
    mutateAsync: editBrand,
    isPending: isEditing,
  } = useEditBrand();

  /*
  |--------------------------------------------------------------------------
  | Brand Stats
  |--------------------------------------------------------------------------
  */

  const {
    stats,
    isLoading: isStatsLoading,
  } = useBrandStats();

  /*
  |--------------------------------------------------------------------------
  | Cards
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | Don't use useEffect + setCards here.
  | That was causing:
  |
  | Maximum update depth exceeded
  |
  */

  const cards = useMemo(() => {
    return BrandCardConfig.map((card) => ({
      ...card,
      value: stats?.[card.id] ?? 0,
      growth: stats?.growth ?? null,
    }));
  }, [stats]);

  /*
  |--------------------------------------------------------------------------
  | Drag & Drop
  |--------------------------------------------------------------------------
  |
  | If you want cards to be sortable, we need local state.
  |
  */

  const [orderedCards, setOrderedCards] = useState(BrandCardConfig);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    setOrderedCards((currentCards) => {
      const oldIndex = currentCards.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = currentCards.findIndex(
        (item) => item.id === over.id
      );

      if (oldIndex === -1 || newIndex === -1) {
        return currentCards;
      }

      return arrayMove(currentCards, oldIndex, newIndex);
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Merge Ordered Cards + Stats
  |--------------------------------------------------------------------------
  */

  const displayCards = useMemo(() => {
    return orderedCards.map((card) => ({
      ...card,
      value: stats?.[card.id] ?? 0,
      growth: stats?.growth ?? null,
    }));
  }, [orderedCards, stats]);

  /*
  |--------------------------------------------------------------------------
  | Filter
  |--------------------------------------------------------------------------
  */

  const handleFilter = (newFilters) => {
    setFilters({
      search: newFilters?.search ?? "",
      status: newFilters?.status ?? "",
    });

    // Reset pagination when filter changes
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="px-5">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="flex justify-between">

        <h1 className="text-xl font-medium">
          Brands
        </h1>

        <div className="flex gap-3">

          {/* Add Brand */}

          <button
            type="button"
            onClick={openAdd}
            className="
              flex h-11 w-40
              items-center justify-center
              rounded-xl
              bg-blue-800
              text-white
              shadow-lg
              transition
              hover:bg-blue-900
              cursor-pointer
            "
          >
            <Plus size={20} />

            <span className="ms-2">
              Add Brand
            </span>
          </button>

          {/* Import */}

          <div className="relative">
            <ImportBrand />
          </div>

          {/* Export */}

          <ExportBrand
            filters={filters}
            brandData={brands}
          />

        </div>
      </div>

      {/* =========================================================
          ADD BRAND MODAL
      ========================================================= */}

      {isAddOpen && (
        <ModelBrand
          createBrand={createBrandAsync}
          isPending={isPending}
          onClose={closeAdd}
        />
      )}

      {/* =========================================================
          EDIT BRAND MODAL
      ========================================================= */}

      {isEditOpen && selectedBrand && (
        <ModelBrand
          editingBrand={selectedBrand}
          editBrand={editBrand}
          isPending={isEditing}
          onClose={closeEdit}
        />
      )}

      {/* =========================================================
          BRAND CARDS
      ========================================================= */}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={displayCards.map((card) => card.id)}
          strategy={rectSortingStrategy}
        >
          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            mt-5
          ">
            {displayCards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                disabled={!dragShow}
                isLoading={isStatsLoading}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* =========================================================
          FILTER
      ========================================================= */}

      <BrandFilter
        onFilter={handleFilter}
      />

      {/* =========================================================
          TABLE
      ========================================================= */}

      <BrandTable
        brands={brands}
        isLoading={isLoading}
        openAdd={openAdd}
        openEdit={openEdit}
      />

      {/* =========================================================
          PAGINATION
      ========================================================= */}

      <div className="
        flex
        items-center
        justify-between
        border
        border-gray-200
        bg-gray-100
        p-3
      ">

        <h1 className="font-semibold text-gray-600">
          Showing {from} to {to} of {total} brands
        </h1>

        <ProductPagination
          page={currentPage}
          count={lastPage}
          onChange={handlePageChange}
        />

      </div>

    </div>
  );
}

export default Brand;