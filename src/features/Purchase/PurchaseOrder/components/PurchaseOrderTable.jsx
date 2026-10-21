import { Eye, MoreVertical } from "lucide-react";
import useGetAllPurchaseOrder from "../hook/useGetAllPurchaseOrder";

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(amount) || 0);
}

function formatDate(date) {
    if (!date) return "—";

    return new Intl.DateTimeFormat("en-CA").format(new Date(`${date}T00:00:00`));
}

function PurchaseOrderTable() {
    const { data, isLoading, isError } = useGetAllPurchaseOrder();
    const purchases = Array.isArray(data?.data) ? data.data : [];

    return (
        <div className="mt-5 h-[575px] overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm font-medium">
                <thead className="sticky top-0 z-50 bg-gray-100">
                    <tr className="text-left text-gray-700">
                        <th className="px-6 py-4 font-semibold">#</th>
                        <th className="px-6 py-4 font-semibold">Order Number</th>
                        <th className="px-6 py-4 font-semibold">Supplier</th>
                        <th className="px-6 py-4 font-semibold">Purchase Date</th>
                        <th className="px-6 py-4 font-semibold">Expected Delivery</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                        <th className="px-6 py-4 text-center font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                Loading purchase orders...
                            </td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-red-600">
                                Failed to load purchase orders. Please refresh and try again.
                            </td>
                        </tr>
                    ) : purchases.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                No purchase orders found.
                            </td>
                        </tr>
                    ) : purchases.map((purchase, index) => (
                        <tr
                            key={purchase.id}
                            className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                        >
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{purchase.purchase_order_no || "—"}</td>
                            <td className="px-6 py-4">{purchase.supplier?.name || "—"}</td>
                            <td className="px-6 py-4">{formatDate(purchase.purchase_date)}</td>
                            <td className="px-6 py-4">{formatDate(purchase.expected_delivery_date)}</td>
                            <td className="px-6 py-4">
                                <span className="rounded-md bg-blue-100 px-3 py-1 capitalize text-blue-800">
                                    {purchase.status || "—"}
                                </span>
                            </td>
                            <td className="px-6 py-4">{formatCurrency(purchase.total)}</td>
                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                    <button
                                        type="button"
                                        aria-label={`View purchase order ${purchase.purchase_order_no || purchase.id}`}
                                        className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100"
                                    >
                                        <Eye className="text-blue-600" size={18} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label={`More actions for purchase order ${purchase.purchase_order_no || purchase.id}`}
                                        className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100"
                                    >
                                        <MoreVertical className="text-blue-600" size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PurchaseOrderTable;
