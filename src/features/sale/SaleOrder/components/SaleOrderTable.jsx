import { Eye } from "lucide-react";
import { formatCurrency } from "../../utils/posFormat";

function formatDate(date) {
  if (!date) return "—";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "—" : new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export default function SaleOrderTable({ sales = [], isLoading, isError, onView }) {
  return (
    <div className="mt-5 max-h-[575px] overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 z-10 bg-gray-100 text-left text-gray-700">
          <tr>
            <th className="px-5 py-4 font-semibold">Invoice Number</th>
            <th className="px-5 py-4 font-semibold">Customer</th>
            <th className="px-5 py-4 font-semibold">Sale Date</th>
            <th className="px-5 py-4 font-semibold">Cashier</th>
            <th className="px-5 py-4 text-right font-semibold">Total</th>
            <th className="px-5 py-4 font-semibold">Payment Method</th>
            <th className="px-5 py-4 font-semibold">Payment Status</th>
            <th className="px-5 py-4 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 6 }, (_, index) => (
              <tr key={`loading-${index}`} className="animate-pulse border-t border-gray-100">
                {Array.from({ length: 8 }, (_, cell) => (
                  <td key={cell} className="px-5 py-5"><div className="h-4 rounded bg-gray-200" /></td>
                ))}
              </tr>
            ))
          ) : isError ? (
            <tr><td colSpan={8} className="px-5 py-12 text-center text-red-600">Sales could not be loaded. Refresh and try again.</td></tr>
          ) : sales.length === 0 ? (
            <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-500">No sales match these filters.</td></tr>
          ) : sales.map((sale) => (
            <tr key={sale.id} className="border-t border-gray-100 transition hover:bg-blue-50">
              <td className="px-5 py-4 font-semibold text-blue-800">{sale.invoice_no}</td>
              <td className="px-5 py-4">{sale.customer?.name || "Walk-in"}</td>
              <td className="px-5 py-4">{formatDate(sale.sale_date)}</td>
              <td className="px-5 py-4">{sale.cashier?.name || "—"}</td>
              <td className="px-5 py-4 text-right font-medium">{formatCurrency(sale.total)}</td>
              <td className="px-5 py-4 capitalize">{String(sale.payment_method || "cash").replaceAll("_", " ")}</td>
              <td className="px-5 py-4">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                  {sale.payment_status || "paid"}
                </span>
              </td>
              <td className="px-5 py-4 text-center">
                <button
                  type="button"
                  aria-label={`View receipt ${sale.invoice_no}`}
                  onClick={() => onView?.(sale)}
                  className="rounded-lg border border-blue-200 p-2 hover:bg-white"
                >
                  <Eye size={18} className="text-blue-700" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
