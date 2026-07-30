import { useState } from "react";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import SortableCard from "../components/SortableCard";
import { ProductsCards } from "../data/ProductCate";
import { useProductLayout } from "../../../context/ProductLayoutContext";
import { Download, Plus } from "lucide-react";
import ModelProduct from "../components/ModelProduct";

function Product() {
  const { dragEnabled } = useProductLayout();
  const [cards, setCards] = useState(ProductsCards);
  const [isOpen,setIsopen]=useState(false);

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
    <>
    <div className="px-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">
          Products
        </h1>
        <div className="flex gap-x-3">
          <div onClick={()=>setIsopen(!isOpen)} className="bg-blue-800 shadow-lg text-white px-5 py-1 rounded-xl flex cursor-pointer justify-center items-center">
            <div><Plus /></div>
            <div className="ms-2">
              <h1>Add Product</h1>
            </div>
          </div>
          <div className="bg-white flex text-black p-3 rounded-xl shadow-lg border border-gray-200 cursor-pointer">
            <div><Download color="black" /></div>
            <div className="ms-2">Import</div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">

            {cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                disabled={!dragEnabled}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
    {isOpen && (
      <ModelProduct onClose={() => setIsopen(false)} />
    )}ខ
  </>
  );
}

export default Product;