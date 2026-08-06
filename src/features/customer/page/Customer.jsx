import { Download, File, FileSpreadsheet, FileText, Plus } from 'lucide-react'
import React, { useState } from 'react'
import SortableCard from '../components/SortableCard';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Customerdata } from '../data/Customerdata';
import { useCustomerLayout } from '../../../context/CustomerLayoutContext';
import CustomerFilter from '../components/CustomerFilter';
import CustomerTable from '../components/CustomerTable';
import CustomerPagination from '../components/CustomerPagination';
import { useCustomer } from '../../../context/CustomerContext';
import DeleteModal from '../../../components/common/Delete';
import ModelCustomer from '../components/ModelCustomer';
import EditeCustomer from '../components/EditeCustomer';

function Customer() {
    // ==============================
    // Category Layout
    // ==============================
  
    const { drages, setDrages } = useCustomerLayout();
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
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [cards, setCards] = useState(Customerdata);
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
      } = useCustomer();
  return (
    <div className="px-5">
       <div className="flex justify-between">

        <h1 className="text-xl font-medium">
          Categories
        </h1>

      {/* Header */}
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
              Add Customer
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
                disabled={!drages}
              />

            ))}

          </div>

        </SortableContext>

      </DndContext>
      <div className="w-full h-full bg-white shadow-lg mt-5">

        <CustomerFilter/>

        <CustomerTable
          onView={openView}
          onEdit={openEdit}
          onDelete={openDelete}
        />
        <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
          <h1 className="font-simbold text-gray-600">Showing 1 to 7 of 1,250 products</h1>
          <CustomerPagination />
        </div>
      </div>

      {/* ================================= */}
      {/* Edit Category */}
      {/* ================================= */}

      {isEditOpen && (

        <EditeCustomer
          category={selectedCategory}
          closeEdit={closeEdit}
        />

      )}


      {/* ================================= */}
      {/* Add Category */}
      {/* ================================= */}

      {isAddOpen && (

        <ModelCustomer
          onClose={closeAdd}
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
          onClose={closeDelete}
          onConfirm={() => {

            console.log(
              "Delete category:",
              selectedCategory
            );

            closeDelete();

          }}
        />

      )}

    </div>
  )
}

export default Customer