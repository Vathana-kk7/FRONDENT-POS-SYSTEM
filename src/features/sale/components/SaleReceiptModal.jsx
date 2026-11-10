import { Printer, X } from "lucide-react";
import { formatCurrency } from "../utils/posFormat";

function formatSaleDate(date) {
  if (!date) return "—";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "—" : new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

export default function SaleReceiptModal({ sale, onClose }) {
  if (!sale) return null;
  const items = sale.items ?? [];

  return (
    <div className="sale-receipt-modal fixed inset-0 z-[1200] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #sale-receipt, #sale-receipt * { visibility: visible !important; }
          #sale-receipt { position: absolute; inset: 0; width: 100%; max-width: none; box-shadow: none; border: 0; }
          .receipt-no-print { display: none !important; }
        }
      `}</style>
      <section id="sale-receipt" className="my-auto w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="receipt-no-print mb-4 flex justify-end gap-2">
          <button type="button" onClick={() => window.print()} className="flex items-center gap-2 rounded-lg bg-blue-800 px-3 py-2 text-sm font-medium text-white hover:bg-blue-900">
            <Printer size={16} /> Print
          </button>
          <button type="button" aria-label="Close receipt" onClick={onClose} className="rounded-lg border p-2 text-gray-600 hover:bg-gray-50">
            <X size={18} />
          </button>
        </div>

        <header className="border-b border-dashed border-gray-300 pb-4 text-center">
          <img src="/Logo_POS.png" alt="Store logo" className="mx-auto mb-2 h-14 w-14 object-contain" />
          <h1 className="text-lg font-bold text-gray-900">All-in-One Computer Shop</h1>
          <p className="mt-1 text-xs text-gray-500">Sales receipt</p>
        </header>

        <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-b border-dashed border-gray-300 py-4 text-xs">
          <dt className="text-gray-500">Invoice</dt><dd className="text-right font-semibold">{sale.invoice_no || "—"}</dd>
          <dt className="text-gray-500">Date</dt><dd className="text-right">{formatSaleDate(sale.sale_date)}</dd>
          <dt className="text-gray-500">Cashier</dt><dd className="text-right">{sale.cashier?.name || "—"}</dd>
          <dt className="text-gray-500">Customer</dt><dd className="text-right">{sale.customer?.name || "Walk-in"}</dd>
        </dl>

        <div className="border-b border-dashed border-gray-300 py-3">
          <div className="mb-2 grid grid-cols-[1fr_auto] text-xs font-semibold text-gray-600">
            <span>Item</span><span className="text-right">Amount</span>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_auto] gap-3 text-xs">
                <div>
                  <p className="font-medium text-gray-800">{item.product_name || item.product?.name || "Product"}</p>
                  <p className="mt-0.5 text-gray-500">
                    SKU {item.sku || item.product?.sku || "—"} · {item.quantity} × {formatCurrency(item.unit_price)}
                  </p>
                </div>
                <p className="text-right font-medium">{formatCurrency(item.subtotal)}</p>
              </div>
            ))}
          </div>
        </div>

        <dl className="space-y-2 border-b border-dashed border-gray-300 py-4 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd>{formatCurrency(sale.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Discount</dt><dd>-{formatCurrency(sale.discount)}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Tax (0%)</dt><dd>{formatCurrency(sale.tax)}</dd></div>
          <div className="flex justify-between pt-2 text-base font-bold"><dt>Total</dt><dd>{formatCurrency(sale.total)}</dd></div>
        </dl>

        <dl className="space-y-2 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-gray-500">Payment</dt><dd className="capitalize">{String(sale.payment_method || "cash").replaceAll("_", " ")}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-500">Amount paid</dt><dd>{formatCurrency(sale.amount_paid)}</dd></div>
          <div className="flex justify-between font-semibold text-green-700"><dt>Change</dt><dd>{formatCurrency(sale.change_amount)}</dd></div>
        </dl>
        <p className="mt-6 text-center text-xs text-gray-500">Thank you for your purchase!</p>
      </section>
    </div>
  );
}
