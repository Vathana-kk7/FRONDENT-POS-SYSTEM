import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BrandCart from "./BrandCart";

export default function SortableCard({ card, disabled,isLoading  }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
} = useSortable({
    id: card.id,
    disabled,
});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <BrandCart 
      card={card}
      isLoading={isLoading}
      />
    </div>
  );
}