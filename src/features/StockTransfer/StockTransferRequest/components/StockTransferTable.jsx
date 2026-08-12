import { Eye, MoreVertical } from 'lucide-react'
import React from 'react'
import  {GoodReceivedData} from '../data/stockdata'
function StockTransferTable() {
    
  return (
    <div className='mt-5 overflow-auto  rounded-xl border scrollbar-none h-[575px] border-gray-200 bg-white shadow-sm'>
        <table className='min-w-full text-sm font-medium '>
            <thead className="sticky top-0 z-50 bg-gray-100 overflow-y-auto ">
                <tr className="text-left text-gray-700">
                    <th className="px-6 py-4 font-semibold">TR No</th>
                    <th className="px-6 py-4 font-semibold">From Location</th>
                    <th className="px-6 py-4 font-semibold">To Location</th>
                    <th className="px-6 py-4 font-semibold">Received Date</th>
                    <th className="px-6 py-4 font-semibold">Request By.</th>
                    <th className="px-6 py-4 font-semibold">Total Items</th>
                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                    <th className="px-6 py-4 font-semibold text-center">Priority</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
            </thead>
            <tbody className=''>
                {GoodReceivedData.map((sup)=>(
                    <tr key={sup.id} className="border-b border-gray-200 hover:bg-gray-200 hover:scale-101 transition-all scrollbar-none ">
                         {/* TR No */}
      <td className="px-6 py-4">
        <span className="font-medium text-blue-800">
          {sup.trNo}
        </span>
      </td>

      {/* From Location */}
      <td className="px-6 py-4">
        {sup.fromLocation}
      </td>

      {/* To Location */}
      <td className="px-6 py-4">
        {sup.toLocation}
      </td>

      {/* Received Date */}
      <td className="px-6 py-4">
        {sup.receivedDate}
      </td>

      {/* Request By */}
      <td className="px-6 py-4">
        {sup.requestBy}
      </td>

      {/* Total Items */}
      <td className="px-6 py-4">
        {sup.totalItems}
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            sup.status === "Completed"
              ? "bg-green-100 text-green-700"
              : sup.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {sup.status}
        </span>
      </td>

      {/* Priority */}
      <td className="px-6 py-4 text-center">
        <span
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            sup.priority === "High"
              ? "bg-red-100 text-red-700"
              : sup.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {sup.priority}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">
          <button className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100">
            <Eye className="text-blue-600" size={18} />
          </button>

          <button className="rounded-lg border border-blue-200 p-2 hover:bg-gray-100">
            <MoreVertical className="text-blue-600" size={18} />
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

export default StockTransferTable