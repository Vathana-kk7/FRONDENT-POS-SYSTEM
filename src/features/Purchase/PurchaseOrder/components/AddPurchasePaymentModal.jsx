import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { X } from "lucide-react";
import SupplierService from "../../../Supplier/service/SupplierService";
import useCreatePurchasePayment from "../hook/useCreatePurchasePayment";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount) || 0);
}

function getImageUrl(image) {
  if (!image || typeof image !== "string") return "";
  if (/^(https?:)?\/\//i.test(image) || /^(data|blob):/i.test(image)) return image;
  const backendOrigin = new URL(
    import.meta.env.VITE_API_URL || "/api",
    window.location.origin
  ).origin;
  return new URL(`/storage/${image.replace(/^\/+/, "").replace(/^storage\//i, "")}`, backendOrigin).toString();
}

export default function AddPurchasePaymentModal({ purchase, onClose }) {
  const [error, setError] = useState("");
  const { mutateAsync, isPending } = useCreatePurchasePayment();
  const supplierId = purchase.supplier_id ?? purchase.supplier?.id;
  const { data: supplierResponse, isLoading: isSupplierLoading, isError: isSupplierError } = useQuery({
    queryKey: ["supplier", supplierId],
    queryFn: () => SupplierService.getById(supplierId),
    enabled: Boolean(supplierId),
  });
  const supplier = supplierResponse?.data?.data ?? supplierResponse?.data ?? purchase.supplier;
  const total = Number(purchase.total ?? purchase.grand_total ?? purchase.amount ?? 0);
  const paidFromPayments = Array.isArray(purchase.payments)
    ? purchase.payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
    : 0;
  const paid = Number(purchase.paid_amount ?? purchase.paid_total ?? paidFromPayments);
  const balance = Math.max(0, total - paid);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const amount = Number(formData.get("amount"));
    if (!Number.isFinite(amount) || amount <= 0 || amount > balance) {
      setError(`Enter an amount greater than 0 and no more than ${formatCurrency(balance)}.`);
      return;
    }

    try {
      await mutateAsync({ purchaseId: purchase.id, data: formData });
      onClose();
    } catch (submitError) {
      setError(submitError?.response?.data?.message || "Payment could not be saved.");
    }
  }

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add Purchase Payment</h2>
            <p className="text-sm text-gray-500">{purchase.purchase_order_no || `Purchase #${purchase.id}`}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} disabled={isPending} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-3 rounded-lg bg-gray-50 p-4 text-sm">
          <div><p className="text-gray-500">Total Amount</p><p className="mt-1 font-semibold">{formatCurrency(total)}</p></div>
          <div><p className="text-gray-500">Paid Amount</p><p className="mt-1 font-semibold text-green-700">{formatCurrency(paid)}</p></div>
          <div><p className="text-gray-500">Balance Due</p><p className="mt-1 font-semibold text-red-700">{formatCurrency(balance)}</p></div>
        </div>

        <section className="mb-5 rounded-lg border border-blue-100 p-4">
          <h3 className="mb-2 font-medium">Supplier payment details</h3>
          {isSupplierLoading ? (
            <p className="text-sm text-gray-500">Loading supplier account details...</p>
          ) : isSupplierError ? (
            <p className="text-sm text-red-600">Could not load supplier account details.</p>
          ) : (
            <div className="grid gap-1 text-sm text-gray-700 sm:grid-cols-2">
              <p>Bank: {supplier?.bank_name || "—"}</p>
              <p>Account Name: {supplier?.account_name || "—"}</p>
              <p>Account Number: {supplier?.account_number || "—"}</p>
              <p>Bakong ID: {supplier?.bakong_account_id || "—"}</p>
              {supplier?.khqr_image && (
                <img src={getImageUrl(supplier.khqr_image)} alt="Supplier KHQR code" className="mt-2 h-36 w-36 rounded border object-contain sm:col-span-2" />
              )}
            </div>
          )}
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-gray-700">
            Payment Method
            <select name="method" required defaultValue="cash" disabled={isPending} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">
              <option value="cash">Cash</option>
              <option value="bakong">Bakong</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </label>
          <label className="text-sm font-medium text-gray-700">
            Amount
            <input name="amount" required type="number" min="0.01" max={balance} step="0.01" disabled={isPending || balance === 0} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-gray-700 sm:col-span-2">
            Reference No. (Transaction ID)
            <input name="reference_no" required maxLength={255} disabled={isPending} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Proof Image (optional)
            <input name="proof_image" type="file" accept="image/*" disabled={isPending} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Notes (optional)
            <input name="notes" maxLength={2000} disabled={isPending} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
          </label>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={isPending || balance === 0} className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">
            {isPending ? "Saving..." : "Save Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
