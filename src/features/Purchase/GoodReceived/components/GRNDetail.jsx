import { formatReceiptDate, receiptLabel } from "../utils/goodsReceiptFormat";

export default function GRNDetail({ receipt }) {
  const fields = [
    ["GRN No.", receiptLabel(receipt)],
    ["PO No.", receipt.purchase?.purchase_order_no || "—"],
    ["Supplier", receipt.purchase?.supplier?.name || "—"],
    ["Received Date", formatReceiptDate(receipt.received_at)],
    ["Received By", receipt.user?.name || "—"],
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 font-semibold text-gray-800">GRN Details</h2>
      <dl className="space-y-3">
        {fields.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <dt className="text-gray-500">{label}</dt>
            <dd className="text-right font-medium text-gray-800">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
