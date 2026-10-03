import { Eye, SquarePen, Trash2 } from 'lucide-react'

function SupplierSkeleton({ count = 8 }) {
  return Array.from({ length: count }, (_, rowIndex) => (
    <tr key={rowIndex} className="animate-pulse border-b border-gray-100">
      {Array.from({ length: 8 }, (_, columnIndex) => (
        <td key={columnIndex} className="px-6 py-5">
          <div
            className={`h-4 rounded bg-gray-200 ${
              columnIndex === 0
                ? "w-6"
                : columnIndex === 7
                  ? "mx-auto w-24"
                  : columnIndex === 5
                    ? "w-16 rounded-full"
                    : "w-24 max-w-full"
            }`}
          />
        </td>
      ))}
    </tr>
  ));
}

function SupplierTable({ suppliers = [], startIndex = 0, isLoading = false, isBusy = false, onView, onEdit, onDelete }) {
    
  return (
    <div className='mt-5 h-144 overflow-auto rounded-xl border scrollbar-none border-gray-200 bg-white shadow-sm'>
        <table className='min-w-full text-sm font-medium '>
            <thead className="sticky top-0 z-10 bg-gray-100">
                <tr className="text-left text-gray-700">
                    <th className="px-6 py-4 font-semibold">#</th>
                    <th className="px-6 py-4 font-semibold">Supplier Name</th>
                    <th className="px-6 py-4 font-semibold">Contact Person</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Phone</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Total Payable</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
            </thead>
            <tbody className=''>
                {isLoading ? (
                    <SupplierSkeleton />
                ) : suppliers.length > 0 ? suppliers.map((sup, index)=>(
                    <tr key={`${sup.id}-${startIndex + index}`} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                        <td className="px-6 py-5">{startIndex + index + 1}</td>
                        <td className="px-6 py-5">{sup.name}</td>
                        <td className="px-6 py-5">{sup.contact_person || 'N/A'}</td>
                        <td className="px-6 py-5">{sup.email || 'N/A'}</td>
                        <td className="px-6 py-5">{sup.phone}</td>
                        <td className="px-6 py-5">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sup.status?.toLowerCase() === 'inactive' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                {sup.status}
                            </span>
                        </td>
                        <td className="px-6 py-5">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(sup.total_payable) || 0)}</td>
                        <td className="px-6 py-5">
                            <div className="flex justify-center gap-2">
                                <button type="button" aria-label="View supplier" disabled={isBusy} onClick={() => onView?.(sup)} className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">
                                    <Eye className='text-blue-600' size={18} />
                                </button>
                                <button type="button" aria-label="Edit supplier" disabled={isBusy} onClick={() => onEdit?.(sup)} className="rounded-lg border border-amber-200 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">
                                    <SquarePen className='text-amber-600' size={18} />
                                </button>
                                <button type="button" aria-label="Delete supplier" disabled={isBusy} onClick={() => onDelete?.(sup)} className="rounded-lg border border-red-200 p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50">
                                    <Trash2 className='text-red-600' size={18} />
                                </button>
                            </div>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                            No suppliers match your filters.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default SupplierTable