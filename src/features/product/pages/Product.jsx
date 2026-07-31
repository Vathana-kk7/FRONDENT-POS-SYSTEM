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
import ProductFilter from "../components/ProductFilter";
import ProductTable from "../components/ProductTable";
import ProductPagination from "../components/ProductPagination";

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
        <div className="flex gap-3">
          <button onClick={()=>setIsopen(!isOpen)} className="bg-blue-800 shadow-lg text-white w-40 h-11 rounded-xl flex cursor-pointer justify-center items-center">
            <div><Plus /></div>
            <div className="ms-2">
              <h1>Add Product</h1>
            </div>
          </button>
          <div className="bg-white flex justify-center items-center text-black w-40 h-11 rounded-xl shadow-lg border border-gray-200 cursor-pointer">
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
      {/* Search */}
      <div className="w-full h-full bg-white shadow-lg">
          <ProductFilter/>
          <ProductTable/>
            <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
              <h1 className="font-simbold text-gray-600">Showing 1 to 7 of 1,250 products</h1>
              <ProductPagination />
            </div>
      </div>
    </div>

    {isOpen && (
      <ModelProduct onClose={() => setIsopen(false)} />
    )}
  </>
  );
}

export default Product;