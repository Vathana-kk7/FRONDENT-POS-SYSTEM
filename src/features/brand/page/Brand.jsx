import { Download, File, FileSpreadsheet, FileText, Plus } from 'lucide-react'
import React, { useState } from 'react'
import ModelBrand from '../components/ModelBrand';
import { useBrandLayout } from '../../../context/BrandLayoutContext';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import SortableCard from '../components/SortableCard';
import { BrandData } from '../data/BrandData';
import BrandFilter from '../components/BrandFilter';
import BrandTable from '../components/BrandTable';
import { useBrandContext } from '../../../context/BrandContext';
import ProductPagination from '../components/ProductPagination';
import useCreateBrand from '../hooks/useCreateBrand';
import useBrands from '../hooks/useBrand';
import useEditBrand from '../hooks/useEditeBrand';

function Brand() {
  const [page, setPage] = useState(1);  
  const perPage = 10;

const [filters, setFilters] = useState({
  search: "",
  status: "",
});
    const [isImportOpen, setIsImportOpen] = useState(false);
    const {
      isAddOpen,
      openAdd,
      closeAdd,
      openEdit,
      closeEdit,
      isEditOpen,
      selectedBrand
      
    }=useBrandContext();
    const { dragShow } = useBrandLayout();
    const [cards, setCards] = useState(BrandData);

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

    //For get Brand
   const {
        brands,
        isLoading,
        isFetching,
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

      //Create Brand
     const {
        createBrandAsync,
        isPending,
        isSuccess,
      } = useCreateBrand();

      //Edite Brand
      const {
        mutateAsync: editBrand,
        isPending: isEditing,
      } = useEditBrand();
  return (
    <div className='px-5'>
        <div className="flex justify-between">
        <h1 className="text-xl font-medium">
          Brands
        </h1>
        <div className="flex gap-3">
            
         <button type="button" onClick={openAdd} className="flex h-11 w-40 items-center justify-center  rounded-xl bg-blue-800 text-white shadow-lg  transition hover:bg-blue-900 cursor-pointer">
            <Plus size={20} />
            <span className="ms-2">
              Add Brand
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
      
        {isAddOpen && (
          <ModelBrand
            createBrand={createBrandAsync}
            isPending={isPending}
            onClose={closeAdd}
          />
        )}

        {isEditOpen && selectedBrand && (
          <ModelBrand
            editingBrand={selectedBrand}
            editBrand={editBrand}
            isPending={isEditing}
            onClose={closeEdit}
          />
        )}
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
                disabled={!dragShow}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
        <BrandFilter
          onFilter={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />

      {/* Table */}
      {/* <BrandTable
          openAdd={openAdd}
          brands={brands}
          isLoading={isLoading}
        /> */}
        <BrandTable
            brands={brands}
            isLoading={isLoading}
            openAdd={openAdd}
            openEdit={openEdit}
          />

      <div className="flex items-center justify-between border border-gray-200 bg-gray-100 p-3">
        <h1 className="font-semibold text-gray-600">
          Showing {from} to {to} of {total} brands
        </h1>
          <ProductPagination
            page={currentPage}
            count={lastPage}
            onChange={(event, value) => {
              setPage(value);
            }}
          />
      </div>
    </div>
  )
}

export default Brand