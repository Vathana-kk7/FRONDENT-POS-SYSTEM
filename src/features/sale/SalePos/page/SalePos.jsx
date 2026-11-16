import { ScanLine, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { showToast } from "../../../../utils/toast";
import SaleReceiptModal from "../../components/SaleReceiptModal";
import useCreateSale from "../../hook/useCreateSale";
import SavePendingOrderModal from "../components/SavePendingOrderModal";
import {
  calculateSaleTotals,
  createIdempotencyKey,
  fromCents,
  toCents,
} from "../../utils/posFormat";
import BageCart from "../components/BageCart";
import ProductGrid from "../components/ProductGrid";

export default function SalePos() {
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [customer, setCustomer] = useState(null);
  const [discount, setDiscount] = useState("0");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [checkoutError, setCheckoutError] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [isPendingOrderOpen, setIsPendingOrderOpen] = useState(false);
  const idempotencyKey = useRef(null);
  const { mutateAsync, isPending } = useCreateSale();

  useEffect(() => {
    const timer = window.setTimeout(() => setSearch(searchText.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [searchText]);

  function addProduct(product) {
    const stock = Number(product.stock_qty) || 0;
    if (stock <= 0) {
      showToast("This product is out of stock.", "error");
      return;
    }
    const existing = cart.find((item) => item.id === product.id);
    if (existing && Number(existing.quantity) >= stock) {
      showToast(`Only ${stock} unit(s) are available.`, "error");
      return;
    }

    setCart((items) => {
      const current = items.find((item) => item.id === product.id);
      if (current) {
        if (Number(current.quantity) >= stock) return items;
        return items.map((item) => item.id === product.id
          ? { ...item, stock_qty: stock, quantity: item.quantity + 1 }
          : item);
      }

      return [...items, { ...product, quantity: 1 }];
    });
    setCheckoutError("");
  }

  async function completeSale() {
    setCheckoutError("");
    const totals = calculateSaleTotals(cart, discount);
    const amountPaidValid = /^\d+(?:\.\d{1,2})?$/.test(String(amountPaid));
    const paidCents = toCents(amountPaid);
    if (!cart.length || !totals.discountValid || !totals.discountWithinSubtotal || !amountPaidValid || paidCents < totals.totalCents) {
      setCheckoutError("Review the cart discount and amount paid before completing the sale.");
      return;
    }

    idempotencyKey.current ??= createIdempotencyKey();
    try {
      const response = await mutateAsync({
        idempotency_key: idempotencyKey.current,
        customer_id: customer?.id ?? null,
        payment_method: paymentMethod,
        amount_paid: fromCents(paidCents),
        discount: fromCents(totals.discountCents),
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      });
      const sale = response?.data ?? response;
      setReceipt({
        ...sale,
        customer: sale?.customer
          ? {
            ...sale.customer,
            address: sale.customer.address ?? customer?.address,
            phone: sale.customer.phone ?? customer?.phone,
          }
          : customer ?? null,
      });
      setCart([]);
      setCustomer(null);
      setDiscount("0");
      setAmountPaid("");
      setPaymentMethod("cash");
      idempotencyKey.current = null;
    } catch (error) {
      setCheckoutError(error?.response?.data?.message || "Sale could not be completed. Review the cart and try again.");
    }
  }

  return (
    <div className="px-5 pb-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <main className="min-w-0">
          <div className="mb-1">
            <h1 className="text-xl font-semibold text-gray-900">Point of Sale</h1>
            <p className="mt-1 text-sm text-gray-500">Select products to add them to the cart.</p>
          </div>
          <label htmlFor="pos-product-search" className="sr-only">Search products or scan a barcode</label>
          <div className="relative mt-4 w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="pos-product-search"
              type="search"
              autoComplete="off"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  setSearch(searchText.trim());
                }
              }}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-12 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Search by product name, SKU or scan barcode..."
            />
            <ScanLine size={18} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <ProductGrid search={search} onAdd={addProduct} />
        </main>

        <div className="w-full lg:sticky lg:top-2 lg:self-start">
          <BageCart
            cart={cart}
            setCart={setCart}
            customer={customer}
            setCustomer={setCustomer}
            discount={discount}
            setDiscount={setDiscount}
            amountPaid={amountPaid}
            setAmountPaid={setAmountPaid}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onComplete={completeSale}
            isPending={isPending}
            error={checkoutError}
            onSavePending={() => setIsPendingOrderOpen(true)}
          />
        </div>
      </div>

      {receipt && <SaleReceiptModal sale={receipt} onClose={() => setReceipt(null)} />}
      {isPendingOrderOpen && (
        <SavePendingOrderModal
          cart={cart}
          customer={customer}
          discount={discount}
          onClose={() => setIsPendingOrderOpen(false)}
          onSaved={({ error } = {}) => {
            setIsPendingOrderOpen(false);
            setCart([]);
            setCustomer(null);
            setDiscount("0");
            setAmountPaid("");
            showToast(error || "Pending order saved successfully.", error ? "error" : "success");
          }}
        />
      )}
    </div>
  );
}
