import { useState, useRef, useEffect } from "react";
import { Eye, MoreVertical, Edit, Trash2,PackageCheck  } from "lucide-react";
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

function PurchaseOrderTable({onEdite, onDelete, onView,onClose,onReceive }) {
    const { data, isLoading, isError } = useGetAllPurchaseOrder();
    const purchases = Array.isArray(data?.data) ? data.data : [];

   
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);

    // បិទ Dropdown វិញពេលចុចក្រៅ
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEdit = (purchase) => {
        console.log("Edit purchase order:", purchase);
        // សរសេរកូដសម្រាប់ Edit នៅទីនេះ (ឧទាហរណ៍៖ បើក Modal ឬ Navigate ទៅកាន់ទំព័រ Edit)
        setOpenMenuId(null);
    };

    const handleDelete = (purchase) => {
        console.log("Delete purchase order:", purchase);
        // សរសេរកូដសម្រាប់ Delete នៅទីនេះ (ឧទាហរណ៍៖ បង្ហាញ Confirmation Modal)
        setOpenMenuId(null);
    };

    // const {}

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
                        Array.from({ length: 5 }).map((_, index) => (
                            <tr key={`skeleton-${index}`} className="border-b border-gray-200 animate-pulse">
                                <td className="px-6 py-4"><div className="h-4 w-4 bg-gray-200 rounded"></div></td>
                                <td className="px-6 py-4"><div className="h-4 w-28 bg-gray-200 rounded"></div></td>
                                <td className="px-6 py-4"><div className="h-4 w-32 bg-gray-200 rounded"></div></td>
                                <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                                <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                                <td className="px-6 py-4"><div className="h-6 w-16 bg-gray-200 rounded-md"></div></td>
                                <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2">
                                        <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                        <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                                    </div>
                                </td>
                            </tr>
                        ))
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
                    ) : (
                        purchases.map((purchase, index) => (
                            <tr
                                key={purchase.id}
                                className="border-b border-gray-200 transition-colors hover:bg-gray-50 relative"
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
                                    <div className="flex justify-center gap-2 relative">
                                        {/* View Button */}
                                        <button
                                            type="button"
                                            aria-label={`View purchase order ${purchase.purchase_order_no || purchase.id}`}
                                            className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100"
                                        >
                                            <Eye className="text-blue-600" size={18} />
                                        </button>

                                        {/* More Actions Button (Drop-down trigger) */}
                                        <div ref={openMenuId === purchase.id ? menuRef : null}>
                                            <button
                                                type="button"
                                                onClick={() => setOpenMenuId(openMenuId === purchase.id ? null : purchase.id)}
                                                aria-label={`More actions for purchase order ${purchase.purchase_order_no || purchase.id}`}
                                                className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100"
                                            >
                                                <MoreVertical className="text-blue-600" size={18} />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openMenuId === purchase.id && (
                                                <div className="absolute right-12 top-0 z-50 w-36 rounded-lg border border-gray-200 bg-white shadow-lg py-1 text-left">
                                                    <button
                                                       onClick={() => {
                                                            setOpenMenuId(null);
                                                            if (onEdite) onEdite(purchase); // 👈 ត្រូវបញ្ជូន purchase ចូលទីនេះ
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Edit size={16} className="text-blue-600" />
                                                        Edit
                                                    </button>
                                                    <button
                                                     type="button"
                                                        onClick={() => {
                                                            
                                                            setOpenMenuId(null);
                                                            if (onDelete) onDelete(purchase);
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 size={16} className="text-red-600" />
                                                        Delete
                                                    </button>
                                                    {["approved", "draft"].includes(purchase.status) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setOpenMenuId(null);
                                                                if (onReceive) onReceive(purchase);
                                                            }}
                                                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                                                        >
                                                            <PackageCheck size={16} className="text-green-600" />
                                                            Receive stock
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PurchaseOrderTable;