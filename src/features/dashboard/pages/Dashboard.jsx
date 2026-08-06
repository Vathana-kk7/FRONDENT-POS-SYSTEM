import { Home, RefreshCcw } from 'lucide-react'
import React, { useState } from 'react'
import DatePicker from '../../../components/common/DatePicker'
import DashboardCart from '../components/DashboardCart'


import {
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableCard from "../../dashboard/components/SortableCard";
import { DashboardCards } from "../data/dataCart";
import { useDashboardLayout } from '../../../context/DashboardLayoutContext';
import SaleCart from '../components/SaleCart';
import TopSellingCart from '../components/TopSellingCart';
import SalePayment from '../components/SalePayment';
import RecentOrder from '../components/RecentOrder';
import LowStock from '../components/LowStock';
import MounthlySummery from '../components/MounthlySummery';
function Dashboard() {
  const { drage, setDrage } = useDashboardLayout();
  const [cards, setCards] = useState(DashboardCards);
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
  return (
    <div>
      {/* Header */}
      <div className='flex justify-between px-5'>
          <div className='flex gap-3 justify-center items-center'>
            <Home size={20} color="black"/>
            <h1 className='font-medium text-xl'>Dashboard</h1>
          </div>
          <div className='flex gap-3'>
            <div><DatePicker /></div>
            <div className='flex gap-2 border cursor-pointer border-gray-200 px-4 py-2 bg-blue-800 text-white rounded-lg'>
              <RefreshCcw size={20}/>
              Refresh
            </div>
          </div>
      </div>
      {/* Cart */}
      <div className='mt-5'>

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
            "
          >

            {cards.map((card) => (

              <SortableCard
                key={card.id}
                card={card}
                disabled={!drage}
              />

            ))}

          </div>

        </SortableContext>

      </DndContext>
      </div>
      {/* Sale Cart */}
      <div className='mt-5 flex gap-5 w-[100%] h-[400px]'>
          <div className='w-[38%]'>
            <SaleCart/>
          </div>
          <div className='w-[30%]'>
            <TopSellingCart/>
          </div>
          <div className='w-[31%]'>
            <SalePayment/>
          </div>
      </div>
      <div className='flex gap-5 w-[100%] h-[400px]'>
          <div className='w-[38%]'>
            <RecentOrder/>
          </div>
          <div className='w-[30%]'>
            <LowStock/>
          </div>
          <div className='w-[31%]'>
            <MounthlySummery/>
          </div>
      </div>
    </div>
  )
}

export default Dashboard