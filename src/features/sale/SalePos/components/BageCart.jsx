import React, { useState } from "react";
import {
  X,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  WalletCards,
  Smartphone,
  Landmark,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";
import "../../../../Style/global.css";

function BageCart() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "MacBook Pro 14",
      price: 1299,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=100",
    },
    {
      id: 2,
      name: "Logitech MX Master 3",
      price: 99,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=100",
    },
    {
      id: 3,
      name: "USB-C Cable",
      price: 20,
      qty: 2,
      image:
        "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=100",
    },
    {
      id: 4,
      name: 'Samsung 24" Monitor',
      price: 120,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100",
    },
    {
      id: 5,
      name: "SanDisk 32GB USB",
      price: 10,
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1624823183493-ed5832f48f8c?w=100",
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [amountPaid, setAmountPaid] = useState(2000);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const updateQty = (id, amount) => {
    setCart((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty + amount),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const discountAmount = Number(discount) || 0;
  const tax = Math.max(0, subtotal - discountAmount) * 0.1;
  const total = subtotal - discountAmount + tax;
  const change = Math.max(0, Number(amountPaid || 0) - total);

  const paymentMethods = [
    { name: "Cash", icon: CircleDollarSign },
    { name: "Card", icon: CreditCard },
    { name: "Mobile Money", icon: Smartphone },
    { name: "Bank Transfer", icon: Landmark },
    { name: "Other", icon: WalletCards },
  ];

  return (
    /*
      IMPORTANT:
      h-[calc(100vh-110px)]
      = cart has a fixed height based on screen

      flex-col
      = header + items + checkout

      overflow-hidden
      = whole cart doesn't scroll
    */
    <div className="flex h-[calc(100vh-110px)] w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Cart ({cart.length})
        </h2>

        <button
          type="button"
          onClick={clearCart}
          className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600"
        >
          Clear Cart
          <Trash2 size={13} />
        </button>
      </div>

      {/* ================================================= */}
      {/* CART ITEMS */}
      {/* ONLY THIS AREA SCROLLS */}
      {/* ================================================= */}

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">

        {cart.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-xs text-gray-400">
            Your cart is empty
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex min-h-[72px] items-center gap-2 border-b border-gray-100 px-4 py-2"
            >
              {/* IMAGE */}
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* NAME + PRICE */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-gray-800">
                  {item.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* QUANTITY */}
              <div className="flex h-7 shrink-0 items-center rounded-md border border-gray-200">
                <button
                  type="button"
                  onClick={() => updateQty(item.id, -1)}
                  className="flex h-full w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  <Minus size={11} />
                </button>

                <span className="w-7 text-center text-xs font-medium">
                  {item.qty}
                </span>

                <button
                  type="button"
                  onClick={() => updateQty(item.id, 1)}
                  className="flex h-full w-7 items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  <Plus size={11} />
                </button>
              </div>

              {/* TOTAL */}
              <span className="w-16 shrink-0 text-right text-xs font-semibold text-gray-800">
                ${(item.price * item.qty).toFixed(2)}
              </span>

              {/* REMOVE */}
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500"
              >
                <X size={11} />
              </button>
            </div>
          ))
        )}

      </div>

      {/* ================================================= */}
      {/* CHECKOUT SECTION */}
      {/* THIS PART DOES NOT SCROLL */}
      {/* ================================================= */}

      <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">

        {/* SUBTOTAL */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Subtotal
          </span>

          <span className="text-xs font-semibold text-gray-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* DISCOUNT */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Discount
          </span>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="h-8 w-24 rounded-md border border-gray-200 px-2 text-xs outline-none focus:border-indigo-500"
            />

            <span className="w-16 text-right text-xs font-semibold">
              ${discountAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* TAX */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Tax (10%)
          </span>

          <span className="text-xs font-semibold">
            ${tax.toFixed(2)}
          </span>
        </div>

        {/* TOTAL */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <span className="text-sm font-semibold">
            Total
          </span>

          <span className="text-lg font-bold text-indigo-700">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* PAYMENT METHOD */}
        <div className="mt-3">
          <p className="mb-2 text-xs font-semibold">
            Payment Method
          </p>

          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              const active = paymentMethod === method.name;

              return (
                <button
                  key={method.name}
                  type="button"
                  onClick={() => setPaymentMethod(method.name)}
                  className={`flex h-8 items-center gap-1.5 rounded-md border px-3 text-[10px] font-medium ${
                    active
                      ? "border-indigo-700 bg-indigo-700 text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300"
                  }`}
                >
                  <Icon size={12} />
                  {method.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* AMOUNT PAID */}
        <div className="mt-3 border-t border-gray-100 pt-3">
          <label className="mb-1.5 block text-[11px] text-gray-500">
            Amount Paid
          </label>

          <input
            type="number"
            min="0"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            className="h-9 w-full rounded-md border border-gray-200 px-3 text-xs outline-none focus:border-indigo-500"
          />
        </div>

        {/* CHANGE */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-green-600">
            Change
          </span>

          <span className="text-base font-bold text-green-600">
            ${change.toFixed(2)}
          </span>
        </div>

        {/* COMPLETE SALE */}
        <button
          type="button"
          disabled={cart.length === 0}
          className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-indigo-700 text-sm font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 size={15} />
          Complete Sale
        </button>
      </div>
    </div>
  );
}

export default BageCart;