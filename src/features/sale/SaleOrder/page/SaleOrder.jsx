import { closestCenter, DndContext } from '@dnd-kit/core';
import { Download, File, FileSpreadsheet, FileText, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useSaleOrderLayout } from '../../../../context/SaleOrderLayoutContext';
import { SaleOrderCards } from '../data/SaleOrderdata';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableCard from '../components/SortableCard';
import SaleOrderFilter from '../components/SaleOrderFilter';
import { useSaleOrder } from '../../../../context/SaleOrderContext';
import SaleOrderTable from '../components/SaleOrderTable';
import ProductPagination from '../../../product/components/ProductPagination';
import SaleOrderPagination from '../components/SaleOrderPagination';
import ViewSaleOrderModal from '../components/ViewSaleOrderModal';
import EditeSaleOrder from '../components/EditeSaleOrder';
import ModelSaleOrder from '../components/ModelSaleOrder';
// import DeleteModal from "../../../components/common/Delete";

function SaleOrder() {
    const { dragEnablede } = useSaleOrderLayout();
    const [cards, setCards] = useState(SaleOrderCards);
    const [isImportOpen, setIsImportOpen] = useState(false);
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
    } = useSaleOrder();
  return (
    <div className='px-5'>
        <div className="flex justify-between">
            <h1 className="text-xl font-medium">
                Sale Orders
            </h1>
            <div className="flex gap-3">
                {/*  */}
                <button type="button" onClick={openAdd} className="flex h-11 w-40 items-center justify-center  rounded-xl bg-blue-800 text-white shadow-lg  transition hover:bg-blue-900 cursor-pointer">
                    <Plus size={20} />
                    <span className="ms-2">
                        New Sale Order
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
                        Export
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
            {/* Cart */}
        </div>
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
                    disabled={!dragEnablede}
                    />
                ))}
                </div>
            </SortableContext>
        </DndContext>
        
        {/* Search */}
        <div >
            <SaleOrderFilter/>
            <SaleOrderTable
                onView={openView}
                onEdit={openEdit}
                onDelete={openDelete}
            />
                <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
                <h1 className="font-simbold text-gray-600">Showing 1 to 7 of 1,250 products</h1>
                <SaleOrderPagination />
                </div>
        </div>
        {/* Product Model */}
      {/* View */}
      {isViewOpen && (
        <ViewSaleOrderModal
          product={selectedProduct}
          closeView={closeView}
        />
      )}

      {/* Edit */}
      {isEditOpen && (
        <EditeSaleOrder
          product={selectedProduct}
          closeEdit={closeEdit}
        />
      )}
      {/* Model Product */}
      {isAddOpen  && (
        <ModelSaleOrder
          onClose={closeAdd}
        />
      )}
      {/* Delete */}
      {/* {isDeleteOpen && (
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
      )} */}
    </div>
  )
}

export default SaleOrder