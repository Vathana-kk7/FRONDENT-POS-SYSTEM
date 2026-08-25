import { useState } from "react";

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
import { Download, Plus } from "lucide-react";
import ModelProduct from "../components/ModelProduct";
import ProductFilter from "../components/ProductFilter";
import ProductTable from "../components/ProductTable";
import ProductPagination from "../components/ProductPagination";
import ViewProductModal from "../components/ViewProductModal";
import DeleteModal from "../../../components/common/Delete";
import EditeProduct from "../components/EditeProduct";
import { FileText, FileSpreadsheet, File } from "lucide-react";
import {useProduct } from "../../../context/ProductContext";
function Product() {
  const { dragEnabled } = useProductLayout();
  const [cards, setCards] = useState(ProductsCards);
  const [isImportOpen, setIsImportOpen] = useState(false);
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

      setCards(arrayMove(cards, oldIndex, newIndex));
    }
  }

  return (
    <>
    <div className="px-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">
          Products
        </h1>
        <div className="flex gap-3">
         <button type="button" onClick={openAdd} className="flex h-11 w-40 items-center justify-center  rounded-xl bg-blue-800 text-white shadow-lg  transition hover:bg-blue-900 cursor-pointer">
            <Plus size={20} />
            <span className="ms-2">
              Add Product
            </span>
          </button>
          <div className="relative">

            {/* Import Button */}
            <button
              type="button"
              onClick={() => setIsImportOpen(!isImportOpen)}
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
            {/* Dropdown */}
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

                  animate-[dropdown_0.2s_ease-out]
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
                    transition
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
                    transition
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
                    transition
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
      {/* Cart */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cards}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">

            {cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                disabled={!dragEnabled}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {/* Search */}
      <div >
          <ProductFilter/>
          <ProductTable  
            onView={openView}
            onEdit={openEdit}
            onDelete={openDelete}
          />
            <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
              <h1 className="font-simbold text-gray-600">Showing 1 to 7 of 1,250 products</h1>
              <ProductPagination />
            </div>
      </div>
    </div>
      {/* Product Model */}
      {/* View */}
      {isViewOpen && (
        <ViewProductModal
          product={selectedProduct}
          closeView={closeView}
        />
      )}

      {/* Edit */}
      {isEditOpen && (
        <EditeProduct
          product={selectedProduct}
          closeEdit={closeEdit}
        />
      )}
      {/* Model Product */}
      {isAddOpen  && (
        <ModelProduct
          onClose={closeAdd}
        />
      )}
      {/* Delete */}
      {isDeleteOpen && (
        <DeleteModal
          item={selectedProduct}
          title="Delete Product?"
          message="Are you sure you want to delete this product? This action cannot be undone."
          onClose={closeDelete}
          onConfirm={() => {
            console.log("Delete product:", selectedProduct);
            closeDelete();
          }}
        />
      )}
  </>
  );
}

export default Product;