import { Eye, MoreVertical } from 'lucide-react'
import React from 'react'
import  {PurchaseTable} from '../data/Purchasedata'
function PurchaseOrderTable() {
    
  return (
    <div className='mt-5 overflow-auto  rounded-xl border scrollbar-none h-[575px] border-gray-200 bg-white shadow-sm'>
        <table className='min-w-full text-sm font-medium '>
            <thead className="sticky top-0 z-50 bg-gray-100 overflow-y-auto ">
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
                {PurchaseTable.map((sup)=>(
                    <tr key={sup.id} className="border-b border-gray-200 hover:bg-gray-200 hover:scale-101 transition-all scrollbar-none ">
                        <td className="px-6 py-4">{sup.id}</td>
                        <td className="px-6 py-4"><span className=''>{sup.supplierName}</span> </td>
                        <td className="px-6 py-4">{sup.contactPerson}</td>
                        <td className="px-6 py-4">{sup.email}</td>
                        <td className="px-6 py-4">{sup.phone}</td>
                        <td className="px-6 py-4">
                            <span className='bg-green-200 ms-4 px-3 py-1 text-green-800 rounded-md'>
                                {sup.status}
                            </span>
                        </td>
                        <td className="px-6 py-4"><span className=''>{sup.totalPayable}</span></td>
                        <td className="px-6 py-4">
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
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default PurchaseOrderTable