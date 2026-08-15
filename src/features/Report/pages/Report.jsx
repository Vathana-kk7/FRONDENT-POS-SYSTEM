import { Download, Plus } from 'lucide-react'
import React, { useState } from 'react'
import DatePicker from '../../../components/common/DatePicker'
import { closestCenter, DndContext } from '@dnd-kit/core'
import { ProductsCards } from '../data/ReportData'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import SortableCard from '../components/SortableCard'
import { useReportLayout } from '../../../context/ReportLayoutContext'
import CustomLineMarks from '../components/Chart'
import TrasferStatus from '../components/TrasferStatus'
import TopLocationsByTransfers from '../components/TopLocationsByTransfers'
import ImformationTransfer from '../components/ImformationTransfer'
import ImformationTransferRequest from '../components/ImformationTransferRequest'
import RecntTransfer from '../components/RecntTransfer'
import RecentOrder from '../components/RecentOrder'

function Report() {
  const {Showdrag}=useReportLayout();
  const [cards,setCards]=useState(ProductsCards);
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
                <h1 className='font-medium text-xl'>Reports </h1>
                <p className='text-sm text-gray-600 text-shadow-2xs'>Analyze your stock transfer activities and performance</p>
              </div>
          </div>
          <div className="flex gap-3">

            {/* Download + Dropdown */}
            
              
              <DatePicker/>
            {/* Export */}
              <div className="h-10 px-6 border border-gray-200 active:scale-x-104 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
                <Download size={16} />
                <span>Export Reports</span>
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
                  disabled={!Showdrag}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className='mt-5 flex gap-5 w-[100%] h-[400px]'>
          <div className='w-[38%]'>
            <CustomLineMarks/>
          </div>
          <div className='w-[30%]'>
             <TrasferStatus/>
          </div>
          <div className='w-[31%] '>
              <TopLocationsByTransfers/>
          </div>
      </div>
        <div className='flex gap-5 w-[100%] h-[400px] mb-5'>
          <div className='w-[38%]'>
            {/* <CustomLineMarks/> */}
            <ImformationTransfer/>
          </div>
          <div className='w-[28.5%]'>
             <ImformationTransferRequest/>
          </div>
          <div className='w-[33.5%] '>
              {/* <RecntTransfer/> */}
              <RecentOrder/>
          </div>
      </div>

    </div>
  )
}

export default Report