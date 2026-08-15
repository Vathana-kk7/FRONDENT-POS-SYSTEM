import React, { useState } from 'react'
import { RecentTransfers} from '../data/ReportData'

function RecntTransfer() {
    const [cart,setCart]=useState(RecentTransfers)
  return (
    <div className='px-5 p-5 rounded-lg shadow-lg border border-gray-200'>
        <h1 className='font-bold text-md text-blue-900 mb-5'>Transfer by Location</h1>
        <div className='max-h-[300px]  overflow-x-auto scrollbar-none'>
            <table className="w-full  text-gray-800">
                <thead className="sticky top-0 z-40 text-sm">
                    <tr className="border-b border-gray-200 bg-gray-100 text-left text-blue-700">
                        <th className="px-5 py-3 font-semibold">Location</th>
                        <th className="py-3 font-semibold pr-5">Total Transfers</th>
                        <th className=" py-3 font-semibold">Items Transferred</th>
                        <th className="py-3 font-semibold">Percentage</th>
                    </tr>
                </thead>

                <tbody className="font-semibold w-full ">
                    {cart.map((item)=>(
                        <tr key={item.id} className="border-b border-gray-100 text-blue-900 hover:bg-gray-100 hover:scale-x-105 transition-all">
                            <td className="px-5 py-2">{item.location}</td>
                            <td className="px-5 py-2">{item.totalTransfers}</td>
                            <td className="px-5 py-2">{item.itemsTransferred}</td>
                            <td className="px-5 py-2">{item.percentage}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
        <div className="w-full overflow-hidden">
            <table className="w-full text-gray-800">
                <tfoot className="font-semibold">
                        <tr className="border-t border-gray-200" >
                            <td className="px-5 py-2">Total</td>
                            <td className="px-5 pl-26 py-2">21</td>
                            <td className="px-5 py-2">124</td>
                            <td className="px-5 py-2">100%</td>
                        </tr>
                    </tfoot>
            </table>
        </div>
    </div>
  )
}

export default RecntTransfer