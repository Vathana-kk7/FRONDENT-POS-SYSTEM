import { Eye, Pencil, Send, Trash2, Check, X } from "lucide-react";

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

function statusClass(status) {
  if (status === "Completed") return "bg-green-100 text-green-700";
  if (status === "Pending") return "bg-yellow-100 text-yellow-700";
  if (status === "Cancelled") return "bg-red-100 text-red-700";
  return "bg-blue-100 text-blue-700";
}

export default function TransferTable({
  rows = [],
  variant = "all",
  onEdit,
  onDelete,
  onChangeStatus,
  onView,
  busyId,
}) {
  const isRequest = variant === "request";
  const isHistory = variant === "history";

  return (
    <div className="mt-5 max-h-[450px] overflow-x-auto overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm scrollbar-none">
      <table className="min-w-full text-sm font-medium">
        <thead className="sticky top-0 z-10 bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="px-6 py-4 font-semibold">Transfer No</th>
            <th className="px-6 py-4 font-semibold">From warehouse</th>
            <th className="px-6 py-4 font-semibold">To warehouse</th>
            <th className="px-6 py-4 font-semibold">{isRequest ? "Requested Date" : "Transfer Date"}</th>
            {!isRequest && <th className="px-6 py-4 font-semibold">Expected Date</th>}
            <th className="px-6 py-4 font-semibold">Total Items</th>
            <th className="px-6 py-4 text-center font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">{isRequest ? "Request By" : "Requested By"}</th>
            {!isHistory && <th className="px-6 py-4 text-center font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((transfer) => {
            const isBusy = busyId === transfer.id;
            return (
              <tr key={transfer.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-blue-700">{transfer.transfer_no}</td>
                <td className="px-6 py-4">{transfer.source_warehouse?.name ?? "—"}</td>
                <td className="px-6 py-4">{transfer.destination_warehouse?.name ?? "—"}</td>
                <td className="px-6 py-4">{formatDate(transfer.created_at)}</td>
                {!isRequest && <td className="px-6 py-4">{formatDate(transfer.expected_date)}</td>}
                <td className="px-6 py-4">{transfer.items?.length ?? 0}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`rounded-md px-3 py-1 text-sm font-medium ${statusClass(transfer.status)}`}>
                    {transfer.status}
                  </span>
                </td>
                <td className="px-6 py-4">{transfer.requester?.name ?? "—"}</td>
                {!isHistory && (
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {isRequest && (
                        <>
                          <button type="button" onClick={() => onEdit?.(transfer)} className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50" aria-label="Edit request">
                            <Pencil size={17} />
                          </button>
                          <button type="button" onClick={() => onDelete?.(transfer)} disabled={isBusy} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50" aria-label="Delete request">
                            <Trash2 size={17} />
                          </button>
                        </>
                      )}
                      {!isRequest && (
                        <>
                          <button type="button" onClick={() => onView?.(transfer)} className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50" aria-label="View transfer">
                            <Eye size={17} />
                          </button>
                          {transfer.status === "Pending" && (
                            <>
                              <button type="button" onClick={() => onEdit?.(transfer)} className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50" aria-label="Edit transfer">
                                <Pencil size={17} />
                              </button>
                              <button type="button" onClick={() => onDelete?.(transfer)} disabled={isBusy} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50" aria-label="Delete transfer">
                                <Trash2 size={17} />
                              </button>
                            </>
                          )}
                          {transfer.status === "Pending" && (
                            <>
                              <button type="button" onClick={() => onChangeStatus?.(transfer, "In Transit")} disabled={isBusy} className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50" aria-label="Dispatch transfer">
                                <Send size={17} />
                              </button>
                              <button type="button" onClick={() => onChangeStatus?.(transfer, "Cancelled")} disabled={isBusy} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50" aria-label="Cancel transfer">
                                <X size={17} />
                              </button>
                            </>
                          )}
                          {transfer.status === "In Transit" && (
                            <>
                              <button type="button" onClick={() => onChangeStatus?.(transfer, "Completed")} disabled={isBusy} className="rounded-lg border border-green-200 p-2 text-green-600 hover:bg-green-50 disabled:opacity-50" aria-label="Complete transfer">
                                <Check size={17} />
                              </button>
                              <button type="button" onClick={() => onChangeStatus?.(transfer, "Cancelled")} disabled={isBusy} className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50" aria-label="Cancel transfer">
                                <X size={17} />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={isRequest ? 8 : isHistory ? 8 : 9} className="px-6 py-10 text-center text-gray-500">
                No stock transfers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
