import { Download, File, FileSpreadsheet, FileText, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ModelBrand from '../components/ModelBrand';
import { useBrandLayout } from '../../../context/BrandLayoutContext';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import SortableCard from '../components/SortableCard';
import { BrandCardConfig } from '../data/BrandData';
import BrandFilter from '../components/BrandFilter';
import BrandTable from '../components/BrandTable';
import { useBrandContext } from '../../../context/BrandContext';
import ProductPagination from '../components/ProductPagination';
import useCreateBrand from '../hooks/useCreateBrand';
import useBrands from '../hooks/useBrand';
import useEditBrand from '../hooks/useEditeBrand';
import useBrandStats from '../hooks/useBrandStats';
import ImportBrand from '../components/ImportBrand';
import ExportBrand from '../components/ExportBrand';

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
      selectedBrand
      
    }=useBrandContext();
    const { dragShow } = useBrandLayout();
    const [cards, setCards] = useState(BrandCardConfig );

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

      //Cart data
      const {
        stats,
        isLoading: isStatsLoading,
      } = useBrandStats();

      // useEffect(() => {
      //     setCards((prevCards) =>
      //         prevCards.map((card) => ({
      //             ...card,
      //             value: stats[card.id] ?? 0,
      //             growth: stats.growth ?? 0,
      //         }))
      //     );
      // }, [stats]);
      useEffect(() => {
    setCards((prevCards) =>
        prevCards.map((card) => ({
            ...card,
            value: stats[card.id] ?? 0,
            growth: stats.growth,
        }))
    );
}, [stats]);

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

            <ImportBrand/>
            </div>
            <ExportBrand filters={filters} brandData={brands} />
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
          items={cards.map((card) => card.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">

            {cards.map((card) => (
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
      
      {/* Filter */}
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