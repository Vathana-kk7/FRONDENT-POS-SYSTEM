import { formatCurrency } from "../utils/goodsReceiptFormat";

export default function GoodReceivedUnderTable({ receipt }) {
  const items = receipt?.items ?? [];
  const totalValue = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.purchase_item?.cost_price || 0),
    0
  );

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-gray-700">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3 text-right">Qty Received</th>
              <th className="px-4 py-3 text-right">Unit Cost</th>
              <th className="px-4 py-3 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? items.map((item, index) => {
              const product = item.purchase_item?.product;
              const unitCost = Number(item.purchase_item?.cost_price || 0);
              return (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{product?.name || "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{product?.sku || "—"}</td>
                  <td className="px-4 py-3 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(unitCost)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(unitCost * Number(item.quantity || 0))}</td>
                </tr>
              );
            }) : (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No receipt items.</td></tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t bg-gray-50 font-semibold">
              <td colSpan={5} className="px-4 py-3 text-right">Total Value</td>
              <td className="px-4 py-3 text-right text-blue-800">{formatCurrency(totalValue)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
