import { Eye, MoreVertical } from 'lucide-react'
import React from 'react'
import  {GoodReceivedData} from '../data/stockdata'
function StockTransferHistoryTable() {
    
  return (
    <div className='mt-5 max-h-[450px] overflow-x-auto overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm scrollbar-none'>
        <table className='min-w-full text-sm font-medium '>
            <thead className="sticky top-0 z-50 bg-gray-100 overflow-y-auto ">
                <tr className="text-left text-black font-bold">
                    <th className="px-6 py-4 font-semibold">Transfer No</th>
                    <th className="px-6 py-4 font-semibold">From warehouse</th>
                    <th className="px-6 py-4 font-semibold">To warehouse</th>
                    <th className="px-6 py-4 font-semibold">Transfer Date</th>
                    <th className="px-6 py-4 font-semibold">Expected Date</th>
                    <th className="px-6 py-4 font-semibold">Total Items</th>
                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                    <th className="px-6 py-4 font-semibold text-center">Requested By</th>
                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
            </thead>
           <tbody>
              {GoodReceivedData.map((sup) => (
                <tr
                  key={sup.id}
                  className="border-b border-gray-200 hover:bg-gray-50 hover:scale-[1.01] transition-all"
                >
                  {/* Transfer No */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-blue-700">{sup.trNo}</span>
                  </td>

                  {/* From Warehouse */}
                  <td className="px-6 py-4">{sup.fromLocation}</td>

                  {/* To Warehouse */}
                  <td className="px-6 py-4">{sup.toLocation}</td>

                  {/* Transfer Date */}
                  <td className="px-6 py-4">{sup.transferDate}</td>

                  {/* Expected Date */}
                  <td className="px-6 py-4">{sup.expectedDate}</td>

                  {/* Total Items */}
                  <td className="px-6 py-4 text-center">{sup.totalItems}</td>

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

                  {/* Requested By */}
                  <td className="px-6 py-4 text-center">{sup.requestBy}</td>

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

export default StockTransferHistoryTable