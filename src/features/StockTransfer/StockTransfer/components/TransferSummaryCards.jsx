import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import SortableCard from "../../StockTransferRequest/components/SortableCard";

export default function TransferSummaryCards({ stats, cards, setCards, disabled }) {
  const summaryCards = useMemo(() => {
    const metrics = [
      { title: "Pending", value: stats?.pending ?? 0, growth: null },
      { title: "In Transit", value: stats?.in_transit ?? 0, growth: null },
      { title: "Completed", value: stats?.completed ?? 0, growth: null },
      { title: "Cancelled", value: stats?.cancelled ?? 0, growth: null },
      { title: "Total Transfers", value: stats?.total ?? 0, growth: null },
    ];

    return cards.map((card) => ({
      ...card,
      ...metrics[card.id - 1],
    }));
  }, [cards, stats]);

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;

    const oldIndex = cards.findIndex((card) => card.id === active.id);
    const newIndex = cards.findIndex((card) => card.id === over.id);
    setCards(arrayMove(cards, oldIndex, newIndex));
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={cards} strategy={rectSortingStrategy}>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <SortableCard key={card.id} card={card} disabled={disabled} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
