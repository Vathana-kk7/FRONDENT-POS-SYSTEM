import { useState } from "react";
import { X } from "lucide-react";
import { toCents } from "../../utils/posFormat";

const amountPattern = /^\d+(?:\.\d{1,2})?$/;

export default function AddDepositModal({ order, maxAmount, isPending, error: serverError, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!amountPattern.test(amount) || toCents(amount) <= 0 || toCents(amount) / 100 > maxAmount) {
      setError("Enter a deposit greater than zero and less than the remaining balance.");
      return;
    }
    setError("");
    onSubmit(amount, paymentMethod);
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="add-deposit-title" className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 id="add-deposit-title" className="font-semibold text-gray-900">Add Deposit</h2>
            <p className="mt-1 text-sm text-gray-500">{order.customer?.name ?? order.customer_name ?? "Pending order"}</p>
          </div>
          <button type="button" onClick={onClose} disabled={isPending} aria-label="Close" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"><X size={19} /></button>
        </header>
        <div className="space-y-4 p-5">
          <div>
            <label htmlFor="order-deposit-amount" className="mb-1 block text-sm font-medium text-gray-700">Amount</label>
            <input id="order-deposit-amount" type="number" min="0.01" max={maxAmount} step="0.01" required value={amount} onChange={(event) => setAmount(event.target.value)} disabled={isPending} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="order-deposit-method" className="mb-1 block text-sm font-medium text-gray-700">Payment method</label>
            <select id="order-deposit-method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} disabled={isPending} className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm">
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="bakong">Bakong</option>
              <option value="bank_transfer">Bank transfer</option>
            </select>
          </div>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          {serverError && <p role="alert" className="text-sm text-red-600">{serverError}</p>}
        </div>
        <footer className="flex justify-end gap-3 border-t border-gray-200 px-5 py-4">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:opacity-50">Close</button>
          <button type="submit" disabled={isPending} className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-50">{isPending ? "Adding..." : "Add Deposit"}</button>
        </footer>
      </form>
    </div>
  );
}
