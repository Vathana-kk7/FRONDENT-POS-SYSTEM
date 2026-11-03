import { useState } from "react";
import { useReceivePurchaseOrder } from "../hook/useReceivePurchaseOrder";
import { X } from "lucide-react";

export default function ReceiveStockModal({ purchase, onClose }) {
  const { mutateAsync, isPending } = useReceivePurchaseOrder();

  const [error, setError] = useState("");
 
  // បង្ហាញតែ item ដែលនៅសល់ត្រូវ receive
  const rows = (purchase.items ?? []).map((item) => ({
    id: item.id,
    name: item.product?.name ?? `Product #${item.product_id}`,
    ordered: Number(item.quantity),
    received: Number(item.received_quantity ?? 0),
    remaining: Number(item.quantity) - Number(item.received_quantity ?? 0),
  }));
 
  // លំនាំដើម = receive ទាំងអស់ដែលនៅសល់
  const [qtys, setQtys] = useState(
    Object.fromEntries(rows.map((r) => [r.id, r.remaining]))
  );
 
  function handleChange(row, value) {
    const n = Math.max(0, Math.min(row.remaining, Number(value) || 0));
    setQtys((q) => ({ ...q, [row.id]: n }));
  }
 
  async function handleSubmit() {
    const items = rows
      .filter((r) => (qtys[r.id] ?? 0) > 0)
      .map((r) => ({
        purchase_item_id: r.id,
        received_quantity: qtys[r.id],
      }));
 
    if (items.length === 0) {
      setError("Enter a received quantity for at least one item.");
      return;
    }
 
    try {
      await mutateAsync({ id: purchase.id, items });
      onClose();
    } catch (e) {
      setError(e.response?.data?.message ?? "Receive failed.");
    }
  }
 
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div>
            <h2 className="text-lg font-medium">Receive stock</h2>
            <p className="text-sm text-gray-600">
              {purchase.purchase_order_no} · {purchase.supplier?.name}
            </p>
          </div>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
 
        {/* Items */}
        <div className="max-h-[50vh] overflow-auto p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-2">Product</th>
                <th className="pb-2 text-right">Ordered</th>
                <th className="pb-2 text-right">Received</th>
                <th className="pb-2 text-right">Remaining</th>
                <th className="pb-2 text-right">Receive now</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-100">
                  <td className="py-3 font-medium">{row.name}</td>
                  <td className="py-3 text-right">{row.ordered}</td>
                  <td className="py-3 text-right">{row.received}</td>
                  <td className="py-3 text-right">{row.remaining}</td>
                  <td className="py-3 text-right">
                    <input
                      type="number"
                      min={0}
                      max={row.remaining}
                      disabled={row.remaining === 0 || isPending}
                      value={qtys[row.id] ?? 0}
                      onChange={(e) => handleChange(row, e.target.value)}
                      className="h-9 w-20 rounded-lg border border-gray-200 px-2 text-right disabled:bg-gray-100"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
 
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
 
        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-100 p-5">
          <button
            onClick={onClose}
            disabled={isPending}
            className="h-10 cursor-pointer rounded-lg border border-gray-200 px-4 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="h-10 cursor-pointer rounded-lg bg-blue-800 px-4 text-white hover:bg-blue-900 disabled:opacity-50"
          >
            {isPending ? "Receiving..." : "Confirm receive"}
          </button>
        </div>
      </div>
    </div>
  );
}