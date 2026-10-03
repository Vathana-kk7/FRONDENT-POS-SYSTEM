import { Eye, MoreVertical } from 'lucide-react'
import React from 'react'
function SupplierTable({ suppliers = [], startIndex = 0 }) {
    
  return (
    <div className='mt-5 overflow-auto  rounded-xl border scrollbar-none h-[575px] border-gray-200 bg-white shadow-sm'>
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
                {suppliers.length > 0 ? suppliers.map((sup, index)=>(
                    <tr key={`${sup.id}-${startIndex + index}`} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                        <td className="px-6 py-5">{startIndex + index + 1}</td>
                        <td className="px-6 py-5"><span className=''>{sup.supplierName}</span> </td>
                        <td className="px-6 py-5">{sup.contactPerson}</td>
                        <td className="px-6 py-5">{sup.email}</td>
                        <td className="px-6 py-5">{sup.phone}</td>
                        <td className="px-6 py-5">
                            <span className='bg-green-200 ms-4 px-3 py-1 text-green-800 rounded-md'>
                                {sup.status}
                            </span>
                        </td>
                        <td className="px-6 py-5"><span className=''>{sup.totalPayable}</span></td>
                        <td className="px-6 py-5">
                            <div className="flex justify-center gap-2">
                                <button className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100">
                                    <Eye className='text-blue-600' size={18} />
                                </button>

                                <button className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100">
                                    <MoreVertical className='text-blue-600' size={18} />
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