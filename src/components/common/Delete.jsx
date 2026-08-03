import { AlertTriangle, Trash2, X } from "lucide-react";

function DeleteModal({
  item,
  title = "Delete Item?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onClose,
  onConfirm,
}) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      
      <div className="relative w-[450px] rounded-2xl bg-white p-6 shadow-2xl">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute right-4 top-4
            flex h-9 w-9
            items-center justify-center
            rounded-full
            text-gray-500
            hover:bg-gray-100
            hover:text-gray-700
            transition
            cursor-pointer
          "
        >
          <X size={20} />
        </button>

        {/* Warning */}
        <div className="flex justify-center">
          <div className="
            flex h-16 w-16
            items-center justify-center
            rounded-full
            bg-red-100
          ">
            <AlertTriangle
              size={32}
              className="text-red-500"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mt-5 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {message}
          </p>
        </div>

        {/* Item */}
        <div className="
          mt-5
          flex
          items-center
          gap-4
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          p-3
        ">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="h-14 w-14 rounded-lg object-cover"
            />
          )}

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {item.name}
            </h3>

            {item.sku && (
              <p className="mt-1 text-sm text-gray-500">
                SKU: {item.sku}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4 py-2.5
              font-semibold
              text-gray-700
              hover:bg-gray-50
              transition
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-red-500
              px-4 py-2.5
              font-semibold
              text-white
              hover:bg-red-600
              active:bg-red-700
              transition
              cursor-pointer
            "
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteModal;