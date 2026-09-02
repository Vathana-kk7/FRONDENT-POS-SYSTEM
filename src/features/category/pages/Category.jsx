import React, { useMemo, useState } from "react";

import CategoryCart from "../components/CategoryCart";
import CategoryFilter from "../components/CategoryFilter";
import CategoryTable from "../components/CategoryTable";
import EditeCategory from "../components/EditeCategory";
import ModelCategory from "../components/ModelCategory";

import { CategoryCardConfig, Categorydata } from "../data/Categorydata";

import { useCategory } from "../../../context/CategoryContext";
import { useCategoryLayout } from "../../../context/CategoryLayoutContext";

import DeleteModal from "../../../components/common/Delete";

import { Download, Plus } from "lucide-react";
import {
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableCard from "../components/SortableCard";
import CategoryPagination from "../components/CategoryPagination";
import useGetAllCategory from "../hook/useGetAllCategory";
import useEditCategory from "../hook/useEditeCategory";
import useCreateCategory from "../hook/useCreateCategory";
import useDeleteCategory from "../hook/useDeleteCategory";
import useCategoryState from "../hook/useCategoryState";
import ImportCategory from "../components/ImportCategory";
import ExportCategory from "../components/ExportCategory";


function Category() {

  // ==============================
  // Category Layout
  // ==============================

  const { drag, setDrag } = useCategoryLayout();

  // ==============================
  // Cards
  // ==============================

    const [orderedCards, setOrderedCards] = useState(CategoryCardConfig);

  // ==============================
  // Import Dropdown
  // ==============================

  const [isImportOpen, setIsImportOpen] = useState(false);

  // ==============================
  // Category Modal Context
  // ==============================
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });
  const {
    isAddOpen,
    isDeleteOpen,
    isViewOpen,
    isEditOpen,

    selectedCategory,

    openAdd,
    openView,
    openEdit,
    openDelete,

    closeAdd,
    closeView,
    closeEdit,
    closeDelete,
  } = useCategory();
 const {
    currentPage,
    lastPage,
    total,from,to,isFetching,
    query,
    category = [],  
    isLoading,
    isError,
    
  } = useGetAllCategory({
    page,
    perPage,
    search:filters.search,
    status:filters.status,
});
//   console.log("Category Filters:", {
//   page,
//   per_page: perPage,
//   search: filters.search,
//   status: filters.status,
// });
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // ==============================
  // Drag & Drop
  // ==============================

  function handleDragEnd(event) {

    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {

      const oldIndex = cards.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = cards.findIndex(
        (item) => item.id === over.id
      );

      setCards(
        arrayMove(
          cards,
          oldIndex,
          newIndex
        )
      );
    }
  }

  const handleFilter=(newFilters)=>{
    setFilters({
      search:newFilters?.search ?? "",
      status:newFilters?.status ?? ""
    });
    // Reset pagination when filter changes
    setPage(1);
  }

  const {
    mutateAsync: editeCategory,
    isPending:isEditing
  }=useEditCategory();

  const {
    createCategoryAsync,
    isPending: isPending,
  }=useCreateCategory();
  const {
    mutate: deleteCategory,
    isPending: isDeleting,
  } = useDeleteCategory();
  const [deleteItem, setDeleteItem] = useState(null);
  
 const handleConfirmDelete = () => {
  const targetId = selectedCategory?.id ?? selectedCategory?.brand_id;

  if (!targetId) return;

  deleteCategory(targetId, {
    onSuccess: () => {
      closeDelete();
    },
  });
};
 /*
  |--------------------------------------------------------------------------
  | Merge Ordered Cards + Stats
  |--------------------------------------------------------------------------
  */
 const {
    stats,
    isLoading: isStatsLoading,
  } = useCategoryState();
  const displayCards = useMemo(() => {
    return orderedCards.map((card) => ({
      ...card,
      value: stats?.[card.id] ?? 0,
      growth: stats?.growth ?? null,
    }));
  }, [orderedCards, stats]);
  return (
    <div className="px-5">

      {/* ================================= */}
      {/* Header */}
      {/* ================================= */}

      <div className="flex justify-between">

        <h1 className="text-xl font-medium">
          Categories
        </h1>


        <div className="flex gap-3">

          {/* Add Category */}

          <button
            type="button"
            onClick={openAdd}
            className="
              flex
              h-11
              w-40
              items-center
              justify-center
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
              Add Category
            </span>
          </button>
          {/* Import */}
          <div className="relative">
            <ImportCategory />
          </div>
          <div>
            <ExportCategory filters={filters}/>
          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* Category Cards */}
      {/* ================================= */}
      {/* handleDragEnd */}
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
                disabled={!drag}
                isLoading={isStatsLoading}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>


      {/* ================================= */}
      {/* Category Content */}
      {/* ================================= */}

      <div className="w-full h-full  mt-5">

        <CategoryFilter
          onFilter={handleFilter}
        />

        <CategoryTable
        className="bg-white "
          onView={openView}
          onEdit={openEdit}
          onDelete={openDelete}
          category={category}
          isLoading={isLoading}
          isError={isError}
          query={query}
        />
        <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
          <h1 className="font-simbold text-gray-600">Showing {from} to {to} of {total} cateogries</h1>
          <CategoryPagination
            currentPage={currentPage}
            lastPage={lastPage}
            onChange={handlePageChange}
          />
        </div>
      </div>


      {/* ================================= */}
      {/* Edit Category */}
      {/* ================================= */}
      {
        isEditOpen&& selectedCategory &&(
          <ModelCategory 
            onClose={closeEdit}
            selectedCategory={selectedCategory}
            editeCategory={editeCategory}
            isPending={isEditing}
          />
        )
      }


      {/* ================================= */}
      {/* Add Category */}
      {/* ================================= */}

      {isAddOpen && (

        <ModelCategory
          onClose={closeAdd}
          createCategory={createCategoryAsync}
          isPending={isPending}
        />

      )}


      {/* ================================= */}
      {/* Delete Category */}
      {/* ================================= */}

      {isDeleteOpen && (
        <DeleteModal
          item={selectedCategory}
          title="Delete Category?"
          message="Are you sure you want to delete this category?"
          isPending={isDeleting}
          onClose={closeDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      

    </div>
  );
}

export default Category;