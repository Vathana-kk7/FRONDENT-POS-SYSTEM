import { ChevronDown, Download, Ellipsis, Filter, Plus } from 'lucide-react'
import React, { useState } from 'react'
import FilterAll from '../components/FilterAll'
import UserAllTable from '../components/UserAllTable'
import ProductPagination from '../components/ProductPagination'
import { useUserAllLayout } from '../../../../context/UserAllLayoutContext'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import SortableCard from '../components/SortableCard'
import { ProductsCards } from '../data/Userdata'

function AllUsers() {
  const { Opendrag } = useUserAllLayout();
    const [cards, setCards] = useState(ProductsCards);
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
                <h1 className='font-medium text-xl'>All Users && Role ManageMent</h1>
                <p className='text-sm text-gray-600 text-shadow-2xs'>Track User and Roles</p>
              </div>
          </div>
          <div className="flex gap-3">

            {/* Download + Dropdown */}
            <div className="h-10 border border-gray-200 rounded-lg overflow-hidden flex">
              
              {/* Download */}
              <div className="px-4 flex items-center justify-center gap-3 text-gray-700 cursor-pointer bg-blue-800 text-white transition">
                <Plus color="white" className='text-white' size={16} />
                <span>Add New Users</span>
              </div>
            </div>
            {/* Export */}
              <div className="h-10 px-6 border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">
    
                {cards.map((card) => (
                  <SortableCard
                    key={card.id}
                    card={card}
                    disabled={!Opendrag}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        <UserAllTable/>
        <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
          <h1 className="font-simbold text-gray-600">Showing 1 to 7 of 1,250 products</h1>
          <ProductPagination />
        </div>
    </div>
  )
}

export default AllUsers