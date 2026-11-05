import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import useGetAllPurchaseOrder from "../../PurchaseOrder/hook/useGetAllPurchaseOrder";
import useReceiveGoods from "../hook/useReceiveGoods";

export default function ReceiveGoodsModal({ onClose, onReceived }) {
  const [purchaseId, setPurchaseId] = useState("");
  const [quantities, setQuantities] = useState({});
  const [submitError, setSubmitError] = useState("");
  const { data: purchaseResponse, isLoading, isError } = useGetAllPurchaseOrder();
  const { mutateAsync, isPending } = useReceiveGoods();

  const purchases = Array.isArray(purchaseResponse?.data) ? purchaseResponse.data : [];
  const availablePurchases = purchases.filter((purchase) =>
    ["approved", "partial"].includes(String(purchase.status).toLowerCase())
  );
  const purchase = availablePurchases.find((entry) => String(entry.id) === purchaseId);
  const items = useMemo(
    () => (purchase?.items ?? []).map((item) => ({
      id: item.id,
      name: item.product?.name ?? `Product #${item.product_id}`,
      sku: item.product?.sku ?? "—",
      ordered: Number(item.quantity),
      received: Number(item.received_quantity ?? 0),
      remaining: Math.max(0, Number(item.quantity) - Number(item.received_quantity ?? 0)),
    })),
    [purchase]
  );

  useEffect(() => {
    setQuantities(Object.fromEntries(items.map((item) => [item.id, item.remaining])));
  }, [items]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!purchase) return;
    const receivedItems = items
      .filter((item) => Number(quantities[item.id]) > 0)
      .map((item) => ({
        purchase_item_id: item.id,
        received_quantity: Number(quantities[item.id]),
      }));

    if (receivedItems.length === 0) return;
    setSubmitError("");
    try {
      await mutateAsync({ purchaseId: purchase.id, items: receivedItems });
      onReceived?.();
      onClose();
    } catch (error) {
      setSubmitError(error?.response?.data?.message || "Goods receipt could not be saved.");
    }
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-semibold">Receive Goods</h2>
            <p className="text-sm text-gray-500">Choose an approved purchase order and enter quantities received.</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} disabled={isPending} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[65vh] space-y-4 overflow-auto p-5">
          <label className="block text-sm font-medium text-gray-700">
            Purchase Order
            <select
              required
              value={purchaseId}
              onChange={(event) => setPurchaseId(event.target.value)}
              disabled={isLoading || isPending}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="">{isLoading ? "Loading purchase orders..." : "Select an approved PO"}</option>
              {availablePurchases.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.purchase_order_no} — {entry.supplier?.name} ({entry.status})
                </option>
              ))}
            </select>
          </label>

          {isError && <p role="alert" className="text-sm text-red-600">Failed to load purchase orders.</p>}
          {submitError && <p role="alert" className="text-sm text-red-600">{submitError}</p>}
          {!isLoading && !isError && availablePurchases.length === 0 && (
            <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">There are no approved purchase orders awaiting receipt.</p>
          )}

          {purchase && (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-600">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 text-right">Ordered</th>
                    <th className="px-4 py-3 text-right">Received</th>
                    <th className="px-4 py-3 text-right">Remaining</th>
                    <th className="px-4 py-3 text-right">Receive now</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-3">
                        <span className="block font-medium">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.sku}</span>
                      </td>
                      <td className="px-4 py-3 text-right">{item.ordered}</td>
                      <td className="px-4 py-3 text-right">{item.received}</td>
                      <td className="px-4 py-3 text-right">{item.remaining}</td>
                      <td className="px-4 py-3 text-right">
                        <input
                          type="number"
                          min="0"
                          max={item.remaining}
                          step="1"
                          value={quantities[item.id] ?? 0}
                          disabled={isPending || item.remaining === 0}
                          onChange={(event) => {
                            const value = Math.min(item.remaining, Math.max(0, Number(event.target.value) || 0));
                            setQuantities((current) => ({ ...current, [item.id]: value }));
                          }}
                          className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-right disabled:bg-gray-100"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t p-5">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
          <button
            type="submit"
            disabled={isPending || !purchase || !items.some((item) => Number(quantities[item.id]) > 0)}
            className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {isPending ? "Receiving..." : "Confirm Receipt"}
          </button>
        </div>
      </form>
    </div>
  );
}
  