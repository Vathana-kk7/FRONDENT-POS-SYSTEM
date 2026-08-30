import React, { useState } from "react";

import CategoryCart from "../components/CategoryCart";
import CategoryFilter from "../components/CategoryFilter";
import CategoryTable from "../components/CategoryTable";
import EditeCategory from "../components/EditeCategory";
import ModelCategory from "../components/ModelCategory";

import { Categorydata } from "../data/Categorydata";

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


function Category() {

  // ==============================
  // Category Layout
  // ==============================

  const { drag, setDrag } = useCategoryLayout();

  // ==============================
  // Cards
  // ==============================

  const [cards, setCards] = useState(Categorydata);

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

            <button
              type="button"
              onClick={() =>
                setIsImportOpen(!isImportOpen)
              }
              className="
                bg-white
                flex
                justify-center
                items-center
                text-black
                w-40
                h-11
                rounded-xl
                shadow-lg
                border
                border-gray-200
                cursor-pointer
                hover:bg-gray-50
                transition
              "
            >

              <Download size={20} />

              <span className="ms-2">
                Import
              </span>

            </button>


            {/* Import Dropdown */}

            {isImportOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-48
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  shadow-xl
                  p-2
                "
              >

                {/* PDF */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-lg
                    cursor-pointer
                    hover:bg-red-50
                  "
                >

                  <FileText
                    size={20}
                    className="text-red-500"
                  />

                  <span className="font-medium text-gray-700">
                    PDF File
                  </span>

                </div>


                {/* DOC */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-lg
                    cursor-pointer
                    hover:bg-blue-50
                  "
                >

                  <File
                    size={20}
                    className="text-blue-500"
                  />

                  <span className="font-medium text-gray-700">
                    DOC File
                  </span>

                </div>


                {/* Excel */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-lg
                    cursor-pointer
                    hover:bg-green-50
                  "
                >

                  <FileSpreadsheet
                    size={20}
                    className="text-green-600"
                  />

                  <span className="font-medium text-gray-700">
                    Excel File
                  </span>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* Category Cards */}
      {/* ================================= */}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <SortableContext
          items={cards}
          strategy={rectSortingStrategy}
        >

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-5
              mt-5
            "
          >

            {cards.map((card) => (

              <SortableCard
                key={card.id}
                card={card}
                disabled={!drag}
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