import { closestCenter, DndContext } from '@dnd-kit/core'
import { ChevronDown, Download, Ellipsis, Filter, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useStockTransferAllLayout } from '../../../../context/StockTransferAllLayoutContext';
import { stockdataCardData } from '../../StockTransferRequest/data/stockdata';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableCard from '../../StockTransferRequest/components/SortableCard';
import StockTransferAllTable from '../components/StockTransferAllTable';
import GRNDetail from '../components/GRNDetail';
import StockTransferUnderTable from '../components/StockTransferUnderTable';
import ApproveCart from '../components/ApproveCart';
// import 
function StockTransfer() {
  const { dragIsopened } = useStockTransferAllLayout();
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
                <p className='text-sm text-gray-600 text-shadow-2xs'>Manage and track stock transfer between warehouses</p>
              </div>
          </div>
          <div className="flex gap-3">
            {/* Print */}
            <div className="h-10 px-6 border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
              <Filter size={16} />
              <span>Filter</span>
            </div>

            {/* Download + Dropdown */}
            <div className="h-10 border border-gray-200 rounded-lg overflow-hidden flex">
              
              {/* Download */}
              <div className="px-4 flex items-center justify-center gap-3 text-gray-700 cursor-pointer bg-blue-800 text-white transition">
                <Plus color="white" className='text-white' size={16} />
                <span>Add Stock Transfer</span>
              </div>
            </div>
            {/* Export */}
              <div className="h-10 px-6 border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
                <Download size={16} />
                <span>Export</span>
              </div>
            {/* More Action */}
            <div className='bg-blue-800 rounded-lg flex gap-2 justify-center items-center px-4 h-10 text-white cursor-pointer'>
                <Ellipsis size={16}/>
                More Actions
                <ChevronDown size={16} />
            </div>
          </div>
        </div>
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
                    disabled={!dragIsopened}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <StockTransferAllTable/>
          <div className='flex gap-5'>
            <GRNDetail/>
            <StockTransferUnderTable/>
            <ApproveCart/>
          </div>
    </div>
  )
}

export default StockTransfer