import { ChevronDown, Download, Ellipsis, Filter, Plus } from 'lucide-react'
import React, { useState } from 'react'
import FilterAll from '../components/FilterAll'
import { stockdataCardData } from '../data/stockdata';
import { StockTransferHistoryLayout } from '../../../../context/StockTransferHistoryLayoutContext';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import SortableCard from '../components/SortableCard';
import StockTransferHistoryTable from '../components/StockTransferHistoryTable';
import ProductPagination from '../../../product/components/ProductPagination';

function StockTransferHistory() {

  const { dragIsopenies } = StockTransferHistoryLayout();
  const [cards, setCards] = useState(stockdataCardData);
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
    <div className='px-5'>
        <div className='flex justify-between'>
          <div>
              <div className=''>
                <h1 className='font-medium text-xl'>Stock Transfer</h1>
                <p className='text-sm text-gray-600 text-shadow-2xs'>View all complet stock transfer between locations/warehouses</p>
              </div>
          </div>
          <div className="flex gap-3">
            {/* Print */}
            <div className="h-10 px-6 border active:scale-105 border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
              <Filter size={16} />
              <span>Filter</span>
            </div>

           
            {/* Export */}
              <div className="h-10 px-6 border border-gray-200 active:scale-105 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
                <Download size={16} />
                <span>Export</span>
              </div>
            
          </div>
        </div>
        <FilterAll/>
        {/* Cart */}
         <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={cards}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mt-5">
    
                {cards.map((card) => (
                  <SortableCard
                    key={card.id}
                    card={card}
                    disabled={!dragIsopenies}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <StockTransferHistoryTable/>
          <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
              <h1 className="font-simbold text-gray-800">Showing 1 to 7 of 1,250 products</h1>
              <ProductPagination />
            </div>
    </div>
  )
}

export default StockTransferHistory