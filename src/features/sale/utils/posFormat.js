export function toCents(value) {
  const amount = String(value ?? "0").trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(amount)) return 0;
  const [whole, fraction = ""] = amount.split(".");
  return Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
}

export function fromCents(cents) {
  const safeCents = Math.max(0, Math.trunc(Number(cents) || 0));
  return `${Math.floor(safeCents / 100)}.${String(safeCents % 100).padStart(2, "0")}`;
}

export function formatCurrency(value) {
  const cents = typeof value === "number" ? Math.round(value * 100) : toCents(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function getProductImageUrl(image) {
  if (!image || typeof image !== "string") return "/Images/no.png";
  if (/^(https?:)?\/\//i.test(image) || /^(data|blob):/i.test(image)) return image;

  const backendOrigin = new URL(
    import.meta.env.VITE_API_URL || "/api",
    window.location.origin
  ).origin;
  const path = image.replace(/^\/+/, "").replace(/^storage\//i, "");
  return new URL(`/storage/${path}`, backendOrigin).toString();
}

export function createIdempotencyKey() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    return (character === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

export function calculateSaleTotals(cart, discount) {
  const subtotalCents = cart.reduce(
    (sum, item) => sum + toCents(item.selling_price) * Number(item.quantity || 0),
    0
  );
  const discountText = String(discount ?? "0");
  const discountValid = /^\d+(?:\.\d{1,2})?$/.test(discountText);
  const discountCents = discountValid ? toCents(discountText) : 0;
  const discountWithinSubtotal = discountCents <= subtotalCents;
  const appliedDiscountCents = Math.min(discountCents, subtotalCents);
  const taxableCents = subtotalCents - appliedDiscountCents;
  const taxCents = 0;

  return {
    subtotalCents,
    discountCents,
    discountValid,
    discountWithinSubtotal,
    taxCents,
    totalCents: taxableCents + taxCents,
  };
}
