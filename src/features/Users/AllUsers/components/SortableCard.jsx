import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import UserAllCart from "./UserAllCart";

export default function SortableCard({ card, disabled }) {
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
      <UserAllCart card={card} />
    </div>
  );
}