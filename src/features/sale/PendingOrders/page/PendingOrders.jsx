import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import usePendingOrders from "../../hook/usePendingOrders";
import usePendingOrderActions from "../../hook/usePendingOrderActions";
import { formatCurrency, toCents } from "../../utils/posFormat";
import DeleteModal from "../../../../components/common/Delete";
import { showToast } from "../../../../utils/toast";
import AddDepositModal from "../components/AddDepositModal";
import EditOrderSpecsModal from "../components/EditOrderSpecsModal";

function unwrapOrder(value) {
  let result = value;
  for (let depth = 0; depth < 4 && result && !Array.isArray(result); depth += 1) {
    if (result.id !== undefined) return result;
    if (result.data === undefined) return result;
    result = result.data;
  }
  return result;
}

function getItems(order) {
  return Array.isArray(order.items) ? order.items : Array.isArray(order.order_items) ? order.order_items : [];
}

function getDeposit(order) {
  const value = order.deposit_total ?? order.total_deposit ?? order.paid_amount ?? order.deposit_amount;
  if (value !== undefined && value !== null) return Number(value) || 0;
  const payments = Array.isArray(order.payments) ? order.payments : Array.isArray(order.order_payments) ? order.order_payments : [];
  return payments.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);
}

function formatPickupDate(value) {
  if (!value) return "—";
  const date = String(value).slice(0, 10);
  return new Date(`${date}T00:00:00`).toLocaleDateString();
}

export default function PendingOrders() {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [depositOrder, setDepositOrder] = useState(null);
  const [specsOrder, setSpecsOrder] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [actionError, setActionError] = useState("");
  const { orders, isLoading, isError, error, refetch } = usePendingOrders(search);
  const {
    addDeposit,
    updateSpecs,
    convertToSale,
    cancelOrder,
    isAddingDeposit,
    isUpdatingSpecs,
    isConverting,
    isCancelling,
  } = usePendingOrderActions();

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(searchText.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [searchText]);

  async function collectPayment(order) {
    setActionError("");
    try {
      await convertToSale(order.id);
    } catch (requestError) {
      setActionError(requestError?.response?.data?.message || requestError?.message || "Payment could not be collected.");
    }
  }

  async function submitDeposit(amount, paymentMethod) {
    setActionError("");
    try {
      await addDeposit({
        id: depositOrder.id,
        data: { amount, payment_method: paymentMethod },
      });
      setDepositOrder(null);
    } catch (requestError) {
      setActionError(requestError?.response?.data?.message || requestError?.message || "Deposit could not be recorded.");
    }
  }

  async function submitSpecs(specs) {
    setActionError("");
    try {
      await updateSpecs({ id: specsOrder.id, data: specs });
      setSpecsOrder(null);
    } catch (requestError) {
      setActionError(requestError?.response?.data?.message || requestError?.message || "Computer specs could not be updated.");
    }
  }

  function cancelPendingOrder(order) {
    setActionError("");
    setCancelTarget({
      ...order,
      customer_name: order.customer?.name ?? order.customer_name ?? "this customer",
    });
  }

  function closeCancelModal() {
    if (isCancelling) return;
    setCancelTarget(null);
  }

  async function confirmCancelOrder() {
    if (!cancelTarget || isCancelling) return;
    setActionError("");
    try {
      await cancelOrder(cancelTarget.id);
      setCancelTarget(null);
      showToast("Pending order cancelled successfully.", "success");
    } catch (requestError) {
      const message = requestError?.response?.data?.message || requestError?.message || "Order could not be cancelled.";
      setActionError(message);
      showToast(message, "error");
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isBusy = isAddingDeposit || isUpdatingSpecs || isConverting || isCancelling;

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Pending Orders</h1>
        <p className="mt-1 text-sm text-gray-500">Orders on hold that have not yet been converted to sales.</p>
      </div>

      <div className="relative max-w-lg">
        <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search customer, phone, product, or specs" className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-blue-500" />
      </div>

      {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
      {isError ? (
        <div role="alert" className="rounded-xl border border-red-100 bg-white p-8 text-center text-sm text-red-700">
          <p>{error?.response?.data?.message || "Pending orders could not be loaded."}</p>
          <button type="button" onClick={() => refetch()} className="mt-3 font-semibold underline">Try again</button>
        </div>
      ) : (
        <div aria-busy={isLoading} className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          {isLoading && <p role="status" className="sr-only">Loading pending orders...</p>}
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3">Customer</th>
                <th scope="col" className="px-4 py-3">Phone</th>
                <th scope="col" className="px-4 py-3">Product</th>
                <th scope="col" className="px-4 py-3">Specs</th>
                <th scope="col" className="px-4 py-3">Deposit</th>
                <th scope="col" className="px-4 py-3">Pickup date</th>
                <th scope="col" className="px-4 py-3">Status</th>
                <th scope="col" className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <>
                  {Array.from({ length: 5 }, (_, index) => (
                    <tr key={`skeleton-${index}`} aria-hidden="true" className="animate-pulse">
                      <td className="px-4 py-4"><div className="h-4 w-28 rounded bg-gray-200" /></td>
                      <td className="px-4 py-4"><div className="h-4 w-24 rounded bg-gray-100" /></td>
                      <td className="px-4 py-4"><div className="h-4 w-32 rounded bg-gray-200" /></td>
                      <td className="px-4 py-4">
                        <div className="space-y-1.5">
                          <div className="h-4 w-12 rounded bg-gray-200" />
                          <div className="h-3 w-20 rounded bg-gray-100" />
                        </div>
                      </td>
                      <td className="px-4 py-4"><div className="h-4 w-12 rounded bg-gray-100" /></td>
                      <td className="px-4 py-4"><div className="h-4 w-20 rounded bg-gray-100" /></td>
                      <td className="px-4 py-4"><div className="h-6 w-16 rounded-full bg-amber-100" /></td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <div className="h-8 w-16 rounded bg-gray-100" />
                          <div className="h-8 w-20 rounded bg-gray-200" />
                          <div className="h-8 w-16 rounded bg-gray-100" />
                          <div className="h-8 w-12 rounded bg-red-50" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-sm text-gray-500">No pending orders found.</td>
                </tr>
              ) : orders.map((rawOrder) => {
                const order = unwrapOrder(rawOrder);
                const customer = order.customer ?? {};
                const pickupDate = order.expected_pickup_date ?? order.pickup_date;
                const pickupDay = pickupDate ? new Date(`${String(pickupDate).slice(0, 10)}T00:00:00`) : null;
                const overdue = pickupDay && pickupDay < today;
                const products = getItems(order).map((item) => {
                  const name = item.product?.name ?? item.product_name ?? item.name ?? "Product";
                  return `${name} × ${item.quantity ?? 1}`;
                }).join(", ");
                return (
                  <tr key={order.id} className={overdue ? "bg-red-50/70" : "hover:bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-900">{customer.name ?? order.customer_name ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{customer.phone ?? order.customer_phone ?? "—"}</td>
                    <td className="max-w-[260px] px-4 py-3 text-gray-700"><span className="line-clamp-2">{products || "—"}</span></td>
                    <td className="px-4 py-3">
                      {order.cpu_gen || order.ram || order.storage ? (
                        <>
                          <p className="font-semibold text-gray-800">{order.cpu_gen || "—"}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{[order.ram, order.storage].filter(Boolean).join(" · ") || "—"}</p>
                        </>
                      ) : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">{formatCurrency(getDeposit(order))}</td>
                    <td className={`px-4 py-3 ${overdue ? "font-semibold text-red-700" : "text-gray-600"}`}>
                      {formatPickupDate(pickupDate)}{overdue && <span className="ml-2 text-xs">Overdue</span>}
                    </td>
                    <td className="px-4 py-3"><span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium capitalize text-amber-800">{order.status ?? "pending"}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => { setSpecsOrder(order); setActionError(""); }} disabled={isBusy} className="rounded-md border border-gray-300 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Edit specs</button>
                        <button type="button" onClick={() => collectPayment(order)} disabled={isBusy} className="rounded-md bg-blue-800 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-900 disabled:opacity-50">
                          {isConverting ? "Processing..." : "Collect Payment"}
                        </button>
                        <button type="button" onClick={() => { setDepositOrder(order); setActionError(""); }} disabled={isBusy} className="rounded-md border border-blue-200 px-2.5 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-50 disabled:opacity-50">Add Deposit</button>
                        <button type="button" onClick={() => cancelPendingOrder(order)} disabled={isBusy} className="rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50">
                          {isCancelling && cancelTarget?.id === order.id ? "Cancelling..." : "Cancel"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {depositOrder && (
        <AddDepositModal
          order={depositOrder}
          maxAmount={Math.max(0, (toCents(depositOrder.grand_total) - toCents(getDeposit(depositOrder)) - 1) / 100)}
          isPending={isAddingDeposit}
          error={actionError}
          onClose={() => setDepositOrder(null)}
          onSubmit={submitDeposit}
        />
      )}
      {specsOrder && (
        <EditOrderSpecsModal
          order={specsOrder}
          isPending={isUpdatingSpecs}
          error={actionError}
          onClose={() => setSpecsOrder(null)}
          onSubmit={submitSpecs}
        />
      )}
      <DeleteModal
        item={cancelTarget ? { name: `Pending order #${cancelTarget.id}` } : null}
        isDeleting={isCancelling}
        title="Cancel Pending Order"
        message={`Are you sure you want to cancel the pending order for ${cancelTarget?.customer_name}? This action cannot be undone.`}
        onClose={closeCancelModal}
        onConfirm={confirmCancelOrder}
      />
    </section>
  );
}
