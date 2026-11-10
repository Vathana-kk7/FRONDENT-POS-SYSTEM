import { X } from "lucide-react";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export default function TransferDetailsModal({ transfer, onClose }) {
  if (!transfer) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{transfer.transfer_no}</h2>
            <p className="mt-1 text-sm text-gray-500">{transfer.status}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <dl className="grid gap-4 rounded-lg bg-gray-50 p-4 text-sm sm:grid-cols-2">
          <div><dt className="text-gray-500">From warehouse</dt><dd className="font-medium">{transfer.source_warehouse?.name ?? "—"}</dd></div>
          <div><dt className="text-gray-500">To warehouse</dt><dd className="font-medium">{transfer.destination_warehouse?.name ?? "—"}</dd></div>
          <div><dt className="text-gray-500">Requested by</dt><dd className="font-medium">{transfer.requester?.name ?? "—"}</dd></div>
          <div><dt className="text-gray-500">Requested date</dt><dd className="font-medium">{formatDate(transfer.created_at)}</dd></div>
          <div><dt className="text-gray-500">Dispatched</dt><dd className="font-medium">{formatDate(transfer.dispatched_at)}</dd></div>
          <div><dt className="text-gray-500">Completed</dt><dd className="font-medium">{formatDate(transfer.completed_at)}</dd></div>
          {transfer.notes && <div className="sm:col-span-2"><dt className="text-gray-500">Notes</dt><dd className="font-medium">{transfer.notes}</dd></div>}
        </dl>
        <h3 className="mb-2 mt-5 font-semibold text-gray-800">Items</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left text-gray-700">
              <tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">SKU</th><th className="px-4 py-3 text-right">Quantity</th></tr>
            </thead>
            <tbody>
              {(transfer.items ?? []).map((item) => (
                <tr key={item.id} className="border-t border-gray-100">
                  <td className="px-4 py-3">{item.product?.name ?? "Product unavailable"}</td>
                  <td className="px-4 py-3">{item.product?.sku ?? "—"}</td>
                  <td className="px-4 py-3 text-right">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
