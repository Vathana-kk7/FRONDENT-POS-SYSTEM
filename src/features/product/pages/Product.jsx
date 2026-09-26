import { useMemo, useState } from "react";

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
import { ProductsCards } from "../data/ProductCate";
import { useProductLayout } from "../../../context/ProductLayoutContext";

import { Plus } from "lucide-react";

import ModelProduct from "../components/ModelProduct";
import ProductFilter from "../components/ProductFilter";
import ProductTable from "../components/ProductTable";
import ProductPagination from "../components/ProductPagination";
import ViewProductModal from "../components/ViewProductModal";
import DeleteModal from "../../../components/common/Delete";
import ProductImport from "../components/ProductImport";

import { useProduct } from "../../../context/ProductContext";

import useCreateProduct from "../hook/useCreateProduct";
import useGetAllProduct from "../hook/useGetAllProduct";
import useGetAllCategory from "../../category/hook/useGetAllCategory";
import useEditeProduct from "../hook/useEditeProduct";
import useDeleteProduct from "../hook/useDeleteProduct";
import useProductState from "../hook/useProductState";

function Product() {
  // =========================================================
  // Product Layout
  // =========================================================

  const { dragEnabled } = useProductLayout();
  const [filter,setFilter]=useState({
    search:"",
    status:""
  });

  // =========================================================
  // Product Context
  // =========================================================

  const {
    isAddOpen,
    isDeleteOpen,
    isViewOpen,
    isEditOpen,
    selectedProduct,

    openAdd,
    closeAdd,

    openView,
    closeView,

    openEdit,
    closeEdit,

    openDelete,
    closeDelete,
  } = useProduct();

  // =========================================================
  // Card Order State
  // =========================================================

  const [orderedCards, setOrderedCards] = useState(ProductsCards);

  // =========================================================
  // Drag & Drop
  // =========================================================

  function handleDragEnd(event) {
    const { active, over } = event;

    // User drops outside another sortable item
    if (!over) {
      return;
    }

    // Same position
    if (active.id === over.id) {
      return;
    }

    // Find old position
    const oldIndex = orderedCards.findIndex(
      (item) => item.id === active.id
    );

    // Find new position
    const newIndex = orderedCards.findIndex(
      (item) => item.id === over.id
    );

    // Safety check
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    // Change card order
    setOrderedCards((currentCards) =>
      arrayMove(currentCards, oldIndex, newIndex)
    );
  }

  // =========================================================
  // Create Product
  // =========================================================

  const {
    CreateProductAsync,
    isPending,
  } = useCreateProduct();

  // =========================================================
  // Get Products
  // =========================================================
  const [page,setPage]=useState(1);
  const perPage = 10;
  const {
    query,
    product,
    currentPage,
    lastPage,
    total,
    from,
    to,
    isLoading,
    isFetching,
    isError,
  } = useGetAllProduct({
    page,
    perPage,
    search:filter.search,
    status:filter.status,
  });
    console.log("Category Filters:", {
  page,
  per_page: perPage,
  search: filter.search,
  status: filter.status,
});
  const handleChange = (event,value)=>{
    if (isFetching) {
    return;
  }
    setPage(value);
  }

  const handleFilter=(newFilter)=>{
    setFilter({
      search:newFilter?.search??"",
      status:newFilter?.status??""
    })
    setPage(1);
  }
  
  // =========================================================
  // Get Categories
  // =========================================================
  const { category } = useGetAllCategory();
  // =========================================================
  // Edit Product
  // =========================================================
  const {
    mutateAsync: editProduct,
    isPending: isEditPending,
  } = useEditeProduct();
  // =========================================================
  // Delete Product
  // =========================================================
  const {
    mutate: deleteProduct,
    isPending: isDeleting,
  } = useDeleteProduct();
  const handleConfirmDelete = () => {
    const targetId =selectedProduct?.id ??selectedProduct?.brand_id;
    if (!targetId) {
      return;
    }
    deleteProduct(targetId, {
      onSuccess: () => {
        closeDelete();
      },
    });
  };
const productState = useProductState();
const { state } = productState;
const displayCards = useMemo(() => {
  return orderedCards.map((card) => ({
    ...card,
    value: state?.[card.key] ?? 0,
    growth: state?.growth ?? null,
  }));
}, [orderedCards, state]);
  return (
    <>
      <div className="px-5">
        {/* ===================================================
            HEADER
        =================================================== */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">
            Products
          </h1>
          <div className="flex gap-3">

            {/* Add Product */}
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
                Add Product
              </span>
            </button>

            {/* Import Product */}
            <ProductImport />

          </div>
        </div>

        {/* ===================================================
            PRODUCT STATISTICS CARDS
        =================================================== */}

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >

          <SortableContext
            items={displayCards.map((card) => card.id)}
            strategy={rectSortingStrategy}
          >

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
                mt-5
              "
            >

              {displayCards.map((card) => (
                <SortableCard
                  key={card.id}
                  card={card}
                  disabled={!dragEnabled}
                />
              ))}

            </div>

          </SortableContext>

        </DndContext>

        {/* ===================================================
            PRODUCT FILTER
        =================================================== */}

        <div>

          <ProductFilter
            onFilter={handleFilter}
          />

          {/* =================================================
              PRODUCT TABLE
          ================================================= */}

          <ProductTable
            onView={openView}
            onEdit={openEdit}
            onDelete={openDelete}
            productData={product}
            isLoading={isLoading}
            categoryData={category}
          />

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div
            className="
              flex
              justify-between
              border
              border-gray-200
              bg-gray-100
              p-3
            "
          >

            <h1 className="font-semibold text-gray-600">
              Showing {from} to {to} of {total} products
            </h1>

            <ProductPagination
              currentPage={currentPage}
              lastPage={lastPage}
              onChange={handleChange}
              disabled={isFetching}

            />

          </div>

        </div>
      </div>

      {/* =====================================================
          VIEW PRODUCT
      ===================================================== */}

      {isViewOpen && (
        <ViewProductModal
          product={selectedProduct}
          closeView={closeView}
        />
      )}

      {/* =====================================================
          EDIT PRODUCT
      ===================================================== */}

      {isEditOpen && (
        <ModelProduct
          onClose={closeEdit}
          selectedProduct={selectedProduct}
          editeProduct={editProduct}
          isEditing={true}
          isPending={isEditPending}
        />
      )}

      {/* =====================================================
          ADD PRODUCT
      ===================================================== */}

      {isAddOpen && (
        <ModelProduct
          onSubmitApi={(formData) =>
            CreateProductAsync(formData)
          }
          onClose={closeAdd}
          isPending={isPending}
        />
      )}

      {/* =====================================================
          DELETE PRODUCT
      ===================================================== */}

      {isDeleteOpen && (
        <DeleteModal
          item={selectedProduct}
          title="Delete Product?"
          message="Are you sure you want to delete this product?"
          isPending={isDeleting}
          onClose={closeDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

    </>
  );
}

export default Product;