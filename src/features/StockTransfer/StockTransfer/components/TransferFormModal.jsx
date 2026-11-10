import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import StockTransferService from "../../service/StockTransferService";

const emptyForm = {
  from_warehouse_id: "",
  to_warehouse_id: "",
  expected_date: "",
  notes: "",
  items: [{ product_id: "", quantity: 1 }],
};
const emptyList = [];

export default function TransferFormModal({
  open,
  onClose,
  onSubmit,
  isSaving,
  initialData,
  title = "Add Stock Transfer",
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [warehouseName, setWarehouseName] = useState("");
  const [showWarehouseForm, setShowWarehouseForm] = useState(false);
  const [formError, setFormError] = useState("");
  const warehousesQuery = useQuery({
    queryKey: ["warehouses"],
    queryFn: StockTransferService.getWarehouses,
    enabled: open,
  });
  const productsQuery = useQuery({
    queryKey: ["stock-transfer-products"],
    queryFn: StockTransferService.getProducts,
    enabled: open,
  });
  const stocksQuery = useQuery({
    queryKey: ["warehouse-stocks", form.from_warehouse_id],
    queryFn: () => StockTransferService.getWarehouseStocks(form.from_warehouse_id),
    enabled: open && Boolean(form.from_warehouse_id),
  });

  useEffect(() => {
    if (!open) return;

    setForm(initialData ? {
      from_warehouse_id: String(initialData.from_warehouse_id ?? ""),
      to_warehouse_id: String(initialData.to_warehouse_id ?? ""),
      expected_date: initialData.expected_date?.slice(0, 10) ?? "",
      notes: initialData.notes ?? "",
      items: initialData.items?.map((item) => ({
        product_id: String(item.product_id),
        quantity: item.quantity,
      })) ?? emptyForm.items,
    } : emptyForm);
    setFormError("");
  }, [initialData, open]);

  const warehouses = warehousesQuery.data ?? emptyList;
  const products = productsQuery.data ?? emptyList;
  const stocks = stocksQuery.data ?? emptyList;
  const stockByProduct = useMemo(
    () => new Map(stocks.map((stock) => [String(stock.id), Number(stock.warehouse_stock ?? 0)])),
    [stocks],
  );

  function updateWarehouse(field, value) {
    const otherField = field === "from_warehouse_id" ? "to_warehouse_id" : "from_warehouse_id";
    setForm((current) => ({
      ...current,
      [field]: value,
      [otherField]: current[otherField] === value ? "" : current[otherField],
    }));
  }

  function updateItem(index, field, value) {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => (
        itemIndex === index ? { ...item, [field]: value } : item
      )),
    }));
  }

  function addItem() {
    setForm((current) => ({
      ...current,
      items: [...current.items, { product_id: "", quantity: 1 }],
    }));
  }

  function removeItem(index) {
    setForm((current) => ({
      ...current,
      items: current.items.filter((_, itemIndex) => itemIndex !== index),
    }));
  }

  async function handleAddWarehouse(event) {
    event.preventDefault();
    const name = warehouseName.trim();
    if (!name) return;

    try {
      const created = await StockTransferService.createWarehouse({ name });
      await queryClient.invalidateQueries({ queryKey: ["warehouses"] });
      setForm((current) => ({
        ...current,
        to_warehouse_id: current.from_warehouse_id === String(created.id) ? "" : String(created.id),
      }));
      setWarehouseName("");
      setShowWarehouseForm(false);
    } catch (error) {
      setFormError(error?.response?.data?.message || "Failed to add warehouse.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (!form.from_warehouse_id || !form.to_warehouse_id) {
      setFormError("Select both source and destination warehouses.");
      return;
    }
    if (form.from_warehouse_id === form.to_warehouse_id) {
      setFormError("Source and destination warehouses must be different.");
      return;
    }
    if (!form.items.length || form.items.some((item) => !item.product_id || Number(item.quantity) < 1)) {
      setFormError("Add at least one product and enter a quantity of at least one.");
      return;
    }
    if (new Set(form.items.map((item) => item.product_id)).size !== form.items.length) {
      setFormError("Each product can only be added once.");
      return;
    }

    onSubmit({
      from_warehouse_id: Number(form.from_warehouse_id),
      to_warehouse_id: Number(form.to_warehouse_id),
      expected_date: form.expected_date || null,
      notes: form.notes.trim() || null,
      items: form.items.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
      })),
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <form onSubmit={handleSubmit} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-gray-700">
            From warehouse
            <select
              required
              value={form.from_warehouse_id}
              onChange={(event) => updateWarehouse("from_warehouse_id", event.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3"
            >
              <option value="">Select warehouse</option>
              {warehouses.filter((warehouse) => String(warehouse.id) !== form.to_warehouse_id).map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-gray-700">
            To warehouse
            <select
              required
              value={form.to_warehouse_id}
              onChange={(event) => updateWarehouse("to_warehouse_id", event.target.value)}
              className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3"
            >
              <option value="">Select warehouse</option>
              {warehouses.filter((warehouse) => String(warehouse.id) !== form.from_warehouse_id).map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </label>
        </div>
        {warehousesQuery.isError && <p className="mt-2 text-sm text-red-600">Failed to load warehouses.</p>}
        <button
          type="button"
          onClick={() => setShowWarehouseForm((visible) => !visible)}
          className="mt-3 text-sm font-medium text-blue-800 hover:underline"
        >
          {showWarehouseForm ? "Cancel adding warehouse" : "Add a warehouse"}
        </button>
        {showWarehouseForm && (
          <div className="mt-2 flex gap-2">
            <input
              value={warehouseName}
              onChange={(event) => setWarehouseName(event.target.value)}
              placeholder="Warehouse name"
              className="h-10 flex-1 rounded-lg border border-gray-200 px-3"
              maxLength={255}
            />
            <button type="button" onClick={handleAddWarehouse} className="rounded-lg bg-blue-800 px-4 text-white">
              Add
            </button>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Products</h3>
          <button type="button" onClick={addItem} className="inline-flex items-center gap-1 text-sm font-medium text-blue-800">
            <Plus size={16} /> Add product
          </button>
        </div>
        {productsQuery.isError && <p className="mt-2 text-sm text-red-600">Failed to load products.</p>}
        <div className="mt-2 space-y-3">
          {form.items.map((item, index) => (
            <div key={`transfer-item-${index}`} className="grid gap-2 rounded-lg border border-gray-100 p-3 sm:grid-cols-[1fr_130px_40px]">
              <label className="text-xs font-medium text-gray-600">
                Product
                <select
                  required
                  value={item.product_id}
                  onChange={(event) => updateItem(index, "product_id", event.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm"
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.sku}) — {stockByProduct.get(String(product.id)) ?? 0} available
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-medium text-gray-600">
                Quantity
                <input
                  required
                  min="1"
                  type="number"
                  value={item.quantity}
                  onChange={(event) => updateItem(index, "quantity", event.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm"
                />
              </label>
              <button
                type="button"
                onClick={() => removeItem(index)}
                disabled={form.items.length === 1}
                className="mt-5 rounded-lg p-2 text-red-600 hover:bg-red-50 disabled:opacity-40"
                aria-label="Remove product"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
          {stocksQuery.isError && <p className="text-sm text-red-600">Failed to load source warehouse stock.</p>}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-gray-700">
            Expected date
            <input
              type="date"
              value={form.expected_date}
              onChange={(event) => setForm((current) => ({ ...current, expected_date: event.target.value }))}
              className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3"
            />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Notes
            <input
              value={form.notes}
              onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
              className="mt-1 h-10 w-full rounded-lg border border-gray-200 px-3"
              maxLength={1000}
            />
          </label>
        </div>
        {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="h-10 rounded-lg border border-gray-200 px-5 text-gray-700">
            Cancel
          </button>
          <button type="submit" disabled={isSaving || productsQuery.isLoading || warehousesQuery.isLoading} className="h-10 rounded-lg bg-blue-800 px-5 text-white disabled:opacity-60">
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
