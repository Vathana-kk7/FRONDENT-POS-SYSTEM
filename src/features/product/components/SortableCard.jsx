import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ProductCart from "./ProductCart";

export default function SortableCard({
  card,
  disabled = false,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        touch-none
        ${disabled ? "cursor-default" : "cursor-grab"}
        ${isDragging ? "cursor-grabbing" : ""}
      `}
    >
      <ProductCart card={card} />
    </div>
  );
}