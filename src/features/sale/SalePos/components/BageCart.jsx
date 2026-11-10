import {
  CircleDollarSign,
  CreditCard,
  Landmark,
  Minus,
  Plus,
  Smartphone,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import useGetAllCustomer from "../../../customer/hook/useGetAllCustomer";
import {
  calculateSaleTotals,
  formatCurrency,
  getProductImageUrl,
  toCents,
} from "../../utils/posFormat";

const paymentMethods = [
  { value: "cash", label: "Cash", Icon: CircleDollarSign },
  { value: "card", label: "Card", Icon: CreditCard },
  { value: "bakong", label: "Bakong", Icon: Smartphone },
  { value: "bank_transfer", label: "Bank", Icon: Landmark },
];

export default function BageCart({
  cart,
  setCart,
  customer,
  setCustomer,
  discount,
  setDiscount,
  amountPaid,
  setAmountPaid,
  paymentMethod,
  setPaymentMethod,
  onComplete,
  onSavePending,
  isPending,
  error,
}) {
  const [customerSearch, setCustomerSearch] = useState("");
  const {
    Customer: customers,
    isLoading: isCustomersLoading,
    isError: isCustomersError,
  } = useGetAllCustomer({
    page: 1,
    perPage: 10,
    search: customerSearch,
    status: "Active",
  });
  const totals = calculateSaleTotals(cart, discount);
  const amountPaidValid = /^\d+(?:\.\d{1,2})?$/.test(String(amountPaid));
  const paidCents = amountPaidValid ? toCents(amountPaid) : 0;
  const changeCents = paidCents - totals.totalCents;
  const insufficient = paidCents < totals.totalCents;
  const canCheckout = cart.length > 0
    && totals.discountValid
    && totals.discountWithinSubtotal
    && amountPaidValid
    && !insufficient
    && !isPending;
  const customerOptionIsLoaded = customers.some((entry) => entry.id === customer?.id);

  function updateQuantity(productId, delta) {
    setCart((items) => items.map((item) => {
      if (item.id !== productId) return item;
      const quantity = Math.min(Number(item.stock_qty), Math.max(1, Number(item.quantity) + delta));
      return { ...item, quantity };
    }));
  }

  function selectCustomer(value) {
    const selected = customers.find((entry) => String(entry.id) === value) ?? null;
    setCustomer(selected);
    setCustomerSearch("");
  }

  return (
    <aside className="flex max-h-[calc(100vh-110px)] min-h-[620px] w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        <h2 className="text-sm font-semibold text-gray-900">Cart ({cart.length})</h2>
        <button
          type="button"
          onClick={() => setCart([])}
          disabled={cart.length === 0 || isPending}
          className="flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-40"
        >
          Clear Cart <Trash2 size={14} />
        </button>
      </header>

      <section className="shrink-0 border-b border-gray-100 p-3">
        <label htmlFor="sale-customer-search" className="mb-1.5 block text-xs font-semibold text-gray-700">
          Customer <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          id="sale-customer-search"
          type="search"
          value={customerSearch}
          onChange={(event) => setCustomerSearch(event.target.value)}
          placeholder="Search customer by name or phone"
          disabled={isPending}
          className="h-9 w-full rounded-lg border border-gray-200 px-3 text-xs outline-none focus:border-blue-500"
        />
        <div className="mt-2 flex gap-2">
          <select
            value={customer?.id ?? ""}
            onChange={(event) => selectCustomer(event.target.value)}
            disabled={isPending || isCustomersLoading}
            className="h-9 min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-2 text-xs"
          >
            <option value="">{isCustomersLoading ? "Loading customers..." : "Walk-in customer"}</option>
            {customer && !customerOptionIsLoaded && (
              <option value={customer.id}>{customer.name} · {customer.phone}</option>
            )}
            {customers.map((entry) => (
              <option key={entry.id} value={entry.id}>{entry.name} · {entry.phone}</option>
            ))}
          </select>
          {customer && (
            <button type="button" aria-label="Clear selected customer" onClick={() => setCustomer(null)} disabled={isPending} className="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50">
              <X size={15} />
            </button>
          )}
        </div>
        {isCustomersError && <p role="alert" className="mt-1 text-xs text-red-600">Customers could not be loaded.</p>}
        {customer && <p className="mt-2 truncate text-xs text-gray-500">{customer.phone}{customer.email ? ` · ${customer.email}` : ""}</p>}
      </section>

      <section className="min-h-0 flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="flex h-full min-h-40 items-center justify-center px-4 text-center text-sm text-gray-400">
            Click a product to add it to the cart.
          </div>
        ) : (
          cart.map((item) => (
            <article key={item.id} className="flex min-h-[74px] items-center gap-2 border-b border-gray-100 px-3 py-2">
              <img
                src={getProductImageUrl(item.image)}
                alt=""
                onError={(event) => { event.currentTarget.src = "/Images/no.png"; }}
                className="h-10 w-10 shrink-0 rounded-md bg-gray-50 object-contain"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-gray-800">{item.name}</p>
                <p className="mt-1 text-xs text-gray-500">{formatCurrency(item.selling_price)}</p>
              </div>
              <div className="flex h-7 shrink-0 items-center rounded-md border border-gray-200">
                <button type="button" aria-label={`Decrease ${item.name} quantity`} disabled={isPending} onClick={() => updateQuantity(item.id, -1)} className="flex h-full w-7 items-center justify-center text-gray-500 hover:bg-gray-50">
                  <Minus size={12} />
                </button>
                <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                <button type="button" aria-label={`Increase ${item.name} quantity`} disabled={isPending || Number(item.quantity) >= Number(item.stock_qty)} onClick={() => updateQuantity(item.id, 1)} className="flex h-full w-7 items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40">
                  <Plus size={12} />
                </button>
              </div>
              <span className="w-[68px] shrink-0 text-right text-xs font-semibold">
                {formatCurrency(String((toCents(item.selling_price) * Number(item.quantity)) / 100))}
              </span>
              <button type="button" aria-label={`Remove ${item.name}`} disabled={isPending} onClick={() => setCart((items) => items.filter((entry) => entry.id !== item.id))} className="rounded-full p-1 text-gray-400 hover:bg-red-50 hover:text-red-600">
                <X size={14} />
              </button>
            </article>
          ))
        )}
      </section>

      <section className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-semibold">{formatCurrency(String(totals.subtotalCents / 100))}</span>
        </div>
        <label htmlFor="sale-discount" className="mt-3 flex items-center justify-between gap-3 text-xs">
          <span className="text-gray-500">Discount</span>
          <input
            id="sale-discount"
            type="number"
            min="0"
            max={totals.subtotalCents / 100}
            step="0.01"
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            disabled={isPending}
            className="h-8 w-28 rounded-md border border-gray-200 px-2 text-right outline-none focus:border-blue-500"
          />
        </label>
        {!totals.discountValid && <p role="alert" className="mt-1 text-right text-xs text-red-600">Enter a valid discount amount.</p>}
        {totals.discountValid && !totals.discountWithinSubtotal && <p role="alert" className="mt-1 text-right text-xs text-red-600">Discount cannot exceed subtotal.</p>}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-gray-500">Tax (0%)</span>
          <span className="font-semibold">{formatCurrency(String(totals.taxCents / 100))}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-sm font-semibold">Grand Total</span>
          <span className="text-lg font-bold text-blue-800">{formatCurrency(String(totals.totalCents / 100))}</span>
        </div>

        <div className="mt-3">
          <p className="mb-2 text-xs font-semibold">Payment Method</p>
          <div className="grid grid-cols-4 gap-1.5">
            {paymentMethods.map(({ value, label, Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPaymentMethod(value)}
                disabled={isPending}
                className={`flex h-8 items-center justify-center gap-1 rounded-md border text-[10px] font-medium ${
                  paymentMethod === value ? "border-blue-800 bg-blue-800 text-white" : "border-gray-200 text-gray-700 hover:border-blue-300"
                }`}
              >
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </div>

        <label htmlFor="sale-amount-paid" className="mt-3 block border-t border-gray-100 pt-3 text-xs text-gray-500">
          Amount Paid
          <input
            id="sale-amount-paid"
            type="number"
            min="0"
            step="0.01"
            value={amountPaid}
            onChange={(event) => setAmountPaid(event.target.value)}
            disabled={isPending}
            placeholder="Enter amount received"
            className="mt-1.5 h-9 w-full rounded-md border border-gray-200 px-3 text-sm text-gray-900 outline-none focus:border-blue-500"
          />
        </label>
        {amountPaid !== "" && !amountPaidValid && <p role="alert" className="mt-1 text-xs text-red-600">Enter a valid amount with up to two decimals.</p>}
        {amountPaidValid && insufficient && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            Insufficient payment. {formatCurrency(String((totals.totalCents - paidCents) / 100))} remaining.
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-green-700">Change</span>
          <span className="text-base font-bold text-green-700">{formatCurrency(String(Math.max(0, changeCents) / 100))}</span>
        </div>
        {error && <p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onSavePending}
            disabled={cart.length === 0 || isPending}
            className="flex min-h-10 items-center justify-center rounded-md border border-blue-800 px-2 text-center text-xs font-semibold text-blue-800 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save as Pending Order
          </button>
          <button
            type="button"
            onClick={onComplete}
            disabled={!canCheckout}
            className="flex min-h-10 items-center justify-center rounded-md bg-blue-800 px-2 text-center text-xs font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Processing sale..." : "Complete Sale"}
          </button>
        </div>
      </section>
    </aside>
  );
}
