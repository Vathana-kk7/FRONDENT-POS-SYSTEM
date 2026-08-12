import { ChevronDown, Ellipsis, Filter, Plus } from 'lucide-react'
import React, { useState } from 'react'
import PurchaseOrderCart from '../components/PurchaseOrderCart'
import { PurchaseCards } from '../data/Purchasedata';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { usePurchaseOrderLayout } from '../../../../context/PurchaseOrderlayoutContext';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import SortableCard from '../components/SortableCard';
import PurchaseOrderTable from '../components/PurchaseOrderTable';
import PurchaseCartReport from '../components/PurchaseCartReport';
import usePrurchaseOrder from '../hook/usePrurchaseOrder';

function PurchaseOrder() {
 
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
    const [cards, setCards] = useState(PurchaseCards);
    const { dragEnabledes  } = usePurchaseOrderLayout();
  return (
    <div className='px-5'>
        <div className='flex justify-between'>
          <div>
              <div className=''>
                <h1 className='font-medium text-xl'>Purchase Orders</h1>
                <p className='text-sm text-gray-600 text-shadow-2xs'>Manage all your purchase orders and track their status</p>
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
                <span>Add Supplier</span>
              </div>
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
                  disabled={!dragEnabledes }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <PurchaseOrderTable/>
        <PurchaseCartReport/>
    </div>
  )
}

export default PurchaseOrder