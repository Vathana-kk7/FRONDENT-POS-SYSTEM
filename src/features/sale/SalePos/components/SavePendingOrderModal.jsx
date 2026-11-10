import { useState } from "react";
import { X } from "lucide-react";
import useGetAllCustomer from "../../../customer/hook/useGetAllCustomer";
import usePendingOrderActions from "../../hook/usePendingOrderActions";
import { calculateSaleTotals, fromCents, toCents } from "../../utils/posFormat";

const amountPattern = /^\d+(?:\.\d{1,2})?$/;
const specSuggestions = {
  cpu: ["I3", "I5", "I7"],
  ram: ["4G", "8G", "16G"],
  storage: ["SSD-128", "SSD-256", "SSD-512"],
};

export default function SavePendingOrderModal({ cart, customer, discount, onClose, onSaved }) {
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(customer);
  const [pickupDate, setPickupDate] = useState("");
  const [cpuGen, setCpuGen] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const { Customer: customers, isLoading: isCustomersLoading, isError: isCustomersError } = useGetAllCustomer({
    page: 1,
    perPage: 100,
    search: customerSearch,
    status: "Active",
  });
  const { createOrder, addDeposit, isCreating, isAddingDeposit } = usePendingOrderActions();
  const totals = calculateSaleTotals(cart, discount);
  const depositValid = depositAmount === "" || (
    amountPattern.test(depositAmount) &&
    toCents(depositAmount) > 0 &&
    toCents(depositAmount) < totals.totalCents
  );
  const isPending = isCreating || isAddingDeposit;
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  async function saveOrder(event) {
    event.preventDefault();
    setError("");

    if (!selectedCustomer || !pickupDate || !cart.length || !totals.discountValid || !totals.discountWithinSubtotal || !depositValid) {
      setError("Choose a customer and pickup date, and check the cart and deposit amount.");
      return;
    }

    try {
      const order = await createOrder({
        customer_id: selectedCustomer.id,
        expected_pickup_date: pickupDate,
        note: note.trim() || null,
        cpu_gen: cpuGen.trim() || null,
        ram: ram.trim() || null,
        storage: storage.trim() || null,
        discount: fromCents(totals.discountCents),
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: Number(item.quantity),
        })),
      });

      if (depositAmount !== "") {
        const orderId = order?.data?.id ?? order?.id ?? order?.data?.data?.id;
        if (!orderId) {
          onSaved({ error: "Pending order saved, but the API did not return its ID; the deposit was not recorded." });
          return;
        }
        try {
          await addDeposit({
            id: orderId,
            data: { amount: fromCents(toCents(depositAmount)), payment_method: paymentMethod },
          });
        } catch (depositError) {
          const message = depositError?.response?.data?.message || depositError?.message || "Deposit could not be recorded.";
          onSaved({ error: `Pending order saved, but the deposit failed: ${message}` });
          return;
        }
      }

      onSaved();
    } catch (saveError) {
      setError(saveError?.response?.data?.message || saveError?.message || "Pending order could not be saved.");
    }
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <form onSubmit={saveOrder} role="dialog" aria-modal="true" aria-labelledby="pending-order-title" className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 id="pending-order-title" className="text-lg font-semibold text-gray-900">Save as Pending Order</h2>
            <p className="mt-1 text-sm text-gray-500">The items will be held without reducing stock.</p>
          </div>
          <button type="button" onClick={onClose} disabled={isPending} aria-label="Close" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50">
            <X size={20} />
          </button>
        </header>

        <div className="space-y-4 p-6">
          <div>
            <label htmlFor="pending-customer-search" className="mb-1 block text-sm font-medium text-gray-700">Customer <span className="text-red-600">*</span></label>
            <input id="pending-customer-search" type="search" value={customerSearch} onChange={(event) => setCustomerSearch(event.target.value)} placeholder="Search customer by name or phone" disabled={isPending} className="mb-2 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-blue-500" />
            <select required value={selectedCustomer?.id ?? ""} onChange={(event) => setSelectedCustomer(customers.find((entry) => String(entry.id) === event.target.value) ?? null)} disabled={isPending || isCustomersLoading} className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm">
              <option value="">{isCustomersLoading ? "Loading customers..." : "Select a customer"}</option>
              {selectedCustomer && !customers.some((entry) => entry.id === selectedCustomer.id) && (
                <option value={selectedCustomer.id}>{selectedCustomer.name} · {selectedCustomer.phone}</option>
              )}
              {customers.map((entry) => <option key={entry.id} value={entry.id}>{entry.name} · {entry.phone}</option>)}
            </select>
            {isCustomersError && <p role="alert" className="mt-1 text-sm text-red-600">Customers could not be loaded.</p>}
          </div>

          <div>
            <label htmlFor="pending-pickup-date" className="mb-1 block text-sm font-medium text-gray-700">Expected pickup date <span className="text-red-600">*</span></label>
            <input id="pending-pickup-date" type="date" min={minDate} required value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} disabled={isPending} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-gray-700">Computer specs <span className="font-normal text-gray-400">(optional)</span></legend>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="pending-cpu-gen" className="mb-1 block text-xs text-gray-600">CPU / Generation</label>
                <input id="pending-cpu-gen" list="pending-cpu-suggestions" maxLength="50" value={cpuGen} onChange={(event) => setCpuGen(event.target.value)} disabled={isPending} placeholder="I5-3" className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
                <datalist id="pending-cpu-suggestions">{specSuggestions.cpu.map((value) => <option key={value} value={value} />)}</datalist>
              </div>
              <div>
                <label htmlFor="pending-ram" className="mb-1 block text-xs text-gray-600">RAM</label>
                <input id="pending-ram" list="pending-ram-suggestions" maxLength="50" value={ram} onChange={(event) => setRam(event.target.value)} disabled={isPending} placeholder="8G" className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
                <datalist id="pending-ram-suggestions">{specSuggestions.ram.map((value) => <option key={value} value={value} />)}</datalist>
              </div>
              <div>
                <label htmlFor="pending-storage" className="mb-1 block text-xs text-gray-600">Storage</label>
                <input id="pending-storage" list="pending-storage-suggestions" maxLength="50" value={storage} onChange={(event) => setStorage(event.target.value)} disabled={isPending} placeholder="SSD-128" className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
                <datalist id="pending-storage-suggestions">{specSuggestions.storage.map((value) => <option key={value} value={value} />)}</datalist>
              </div>
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="pending-deposit" className="mb-1 block text-sm font-medium text-gray-700">Deposit <span className="font-normal text-gray-400">(optional)</span></label>
              <input id="pending-deposit" type="number" min="0" max={Math.max(0, (totals.totalCents - 1) / 100)} step="0.01" value={depositAmount} onChange={(event) => setDepositAmount(event.target.value)} disabled={isPending} placeholder="0.00" className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm" />
              {!depositValid && <p role="alert" className="mt-1 text-xs text-red-600">Deposit must be greater than zero and less than the order total.</p>}
            </div>
            {depositAmount !== "" && (
              <div>
                <label htmlFor="pending-payment-method" className="mb-1 block text-sm font-medium text-gray-700">Deposit method</label>
                <select id="pending-payment-method" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} disabled={isPending} className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm">
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="bakong">Bakong</option>
                  <option value="bank_transfer">Bank transfer</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="pending-note" className="mb-1 block text-sm font-medium text-gray-700">Note <span className="font-normal text-gray-400">(optional)</span></label>
            <textarea id="pending-note" rows="3" maxLength="1000" value={note} onChange={(event) => setNote(event.target.value)} disabled={isPending} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
          </div>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        </div>

        <footer className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50">Close</button>
          <button type="submit" disabled={isPending || !depositValid} className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50">
            {isPending ? "Saving order..." : "Save Pending Order"}
          </button>
        </footer>
      </form>
    </div>
  );
}
