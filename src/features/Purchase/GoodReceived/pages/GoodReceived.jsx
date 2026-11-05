import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { GoodReceivedCards } from "../data/GoodReceiveddata";
import { useGoodReceivedLayout } from "../../../../context/GoodReceivedLayout";
import SortableCard from "../components/SortableCard";
import GoodReceivedTable from "../components/GoodReceivedTable";
import GoodReceivedUnderTable from "../components/GoodReceivedUnderTable";
import GRNDetail from "../components/GRNDetail";
import ReceiveGoodsModal from "../components/ReceiveGoodsModal";
import useGetAllGoodReceived from "../hook/useGetAllGoodReceived";

function GoodReceived() {
  const [cards, setCards] = useState(GoodReceivedCards);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);
  const { dragcart } = useGoodReceivedLayout();
  const { data, isLoading, isError } = useGetAllGoodReceived();
  const receipts = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  const activeReceipt = receipts.find((receipt) => receipt.id === selectedReceipt?.id) ?? receipts[0] ?? null;

  const cardValues = useMemo(() => {
    const today = new Date().toDateString();
    const quantity = receipts.reduce(
      (total, receipt) => total + (receipt.items ?? []).reduce((sum, item) => sum + Number(item.quantity || 0), 0),
      0
    );
    const receivedToday = receipts.filter(
      (receipt) => receipt.received_at && new Date(receipt.received_at).toDateString() === today
    ).length;
    return {
      1: receipts.length,
      2: quantity,
      3: receivedToday,
      4: receipts.reduce((sum, receipt) => sum + (receipt.items ?? []).reduce(
        (itemSum, item) => itemSum + Number(item.quantity || 0) * Number(item.purchase_item?.cost_price || 0),
        0
      ), 0),
      5: new Set(receipts.flatMap((receipt) =>
        (receipt.items ?? []).map((item) => item.purchase_item?.product_id).filter(Boolean)
      )).size,
    };
  }, [receipts]);

  const liveCards = cards.map((card) => ({
    ...card,
    title: ["Total Receipts", "Quantity Received", "Received Today", "Received Value", "Products Received"][card.id - 1] ?? card.title,
    value: isLoading ? "..." : card.id === 4
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cardValues[card.id])
      : cardValues[card.id],
    growth: card.id === 3 ? "Receipts today" : "Based on recorded receipts",
  }));

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = cards.findIndex((card) => card.id === active.id);
    const newIndex = cards.findIndex((card) => card.id === over.id);
    if (oldIndex >= 0 && newIndex >= 0) {
      setCards((current) => arrayMove(current, oldIndex, newIndex));
    }
  }

  return (
    <div className="px-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium">Goods Received</h1>
          <p className="text-sm text-gray-600">View receipts and receive approved purchase orders.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsReceiveOpen(true)}
          className="flex h-10 items-center gap-2 rounded-lg bg-blue-800 px-4 text-white transition hover:bg-blue-900"
        >
          <Plus size={16} />
          Receive Goods
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={liveCards} strategy={rectSortingStrategy}>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
            {liveCards.map((card) => (
              <SortableCard key={card.id} card={card} disabled={!dragcart} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <GoodReceivedTable
        receipts={receipts}
        selectedReceiptId={activeReceipt?.id}
        onSelect={setSelectedReceipt}
        isLoading={isLoading}
        isError={isError}
      />
      {activeReceipt && (
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[380px_1fr]">
          <GRNDetail receipt={activeReceipt} />
          <GoodReceivedUnderTable receipt={activeReceipt} />
        </div>
      )}
      {isReceiveOpen && (
        <ReceiveGoodsModal
          onClose={() => setIsReceiveOpen(false)}
          onReceived={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
}

export default GoodReceived;
