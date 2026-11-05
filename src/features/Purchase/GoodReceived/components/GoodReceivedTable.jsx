import { Eye } from "lucide-react";
import { formatCurrency, formatReceiptDate, receiptLabel } from "../utils/goodsReceiptFormat";

export default function GoodReceivedTable({
  receipts = [],
  selectedReceiptId,
  onSelect,
  isLoading,
  isError,
}) {
  return (
    <div className="mt-5 h-[575px] overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm font-medium">
        <thead className="sticky top-0 z-10 bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="px-6 py-4 font-semibold">GRN No.</th>
            <th className="px-6 py-4 font-semibold">PO No.</th>
            <th className="px-6 py-4 font-semibold">Supplier</th>
            <th className="px-6 py-4 font-semibold">Received Date</th>
            <th className="px-6 py-4 font-semibold text-right">Items</th>
            <th className="px-6 py-4 font-semibold text-right">Total Qty</th>
            <th className="px-6 py-4 font-semibold text-right">Total Value</th>
            <th className="px-6 py-4 font-semibold">Received By</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <tr key={index} className="animate-pulse border-b">
                {Array.from({ length: 9 }, (_, cell) => (
                  <td key={cell} className="px-6 py-5"><div className="h-4 rounded bg-gray-200" /></td>
                ))}
              </tr>
            ))
          ) : isError ? (
            <tr><td colSpan={9} className="px-6 py-12 text-center text-red-600">Failed to load goods receipts. Refresh and try again.</td></tr>
          ) : receipts.length === 0 ? (
            <tr><td colSpan={9} className="px-6 py-12 text-center text-gray-500">No goods receipts have been recorded.</td></tr>
          ) : receipts.map((receipt) => {
            const items = receipt.items ?? [];
            const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
            const totalValue = items.reduce(
              (sum, item) => sum + Number(item.quantity || 0) * Number(item.purchase_item?.cost_price || 0),
              0
            );
            return (
              <tr
                key={receipt.id}
                className={`border-b border-gray-200 transition-colors hover:bg-blue-50 ${selectedReceiptId === receipt.id ? "bg-blue-50" : ""}`}
              >
                <td className="px-6 py-4 font-medium text-blue-800">{receiptLabel(receipt)}</td>
                <td className="px-6 py-4">{receipt.purchase?.purchase_order_no || "—"}</td>
                <td className="px-6 py-4">{receipt.purchase?.supplier?.name || "—"}</td>
                <td className="px-6 py-4">{formatReceiptDate(receipt.received_at)}</td>
                <td className="px-6 py-4 text-right">{items.length}</td>
                <td className="px-6 py-4 text-right">{totalQty}</td>
                <td className="px-6 py-4 text-right">{formatCurrency(totalValue)}</td>
                <td className="px-6 py-4">{receipt.user?.name || "—"}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    aria-label={`View ${receiptLabel(receipt)}`}
                    onClick={() => onSelect?.(receipt)}
                    className="rounded-lg border border-blue-200 p-2 hover:bg-white"
                  >
                    <Eye className="text-blue-600" size={18} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
