import { ChevronDown, Download, Ellipsis, Printer } from 'lucide-react'
import React from 'react'
import InvoiceCart from '../components/InvoiceCart'
import InvoiceTable from '../components/InvoiceTable'

function Invoice() {
  return (
    <div className='px-5 '>
      {/* button */}
        <div className='flex justify-between'>
          <div>
              <div className='flex gap-3 justify-center items-center'>
                <h1 className='font-medium text-xl'>Sale Invoice</h1>
                <span className='px-4 bg-green-200 py-1 rounded-sm text-green-800 font-medium'>Paid</span>
              </div>
              <h1>INV-2024-0007</h1>
          </div>
          <div className="flex gap-3">
            {/* Print */}
            <div className="h-10 px-6 border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
              <Printer size={16} />
              <span>Print</span>
            </div>

            {/* Download + Dropdown */}
            <div className="h-10 border border-gray-200 rounded-lg overflow-hidden flex">
              
              {/* Download */}
              <div className="px-4 flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
                <Download size={16} />
                <span>Download</span>
              </div>

              {/* Dropdown */}
              <div className="w-10 border-l border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition cursor-pointer">
                <ChevronDown size={16} />
              </div>
            </div>
            {/* More Action */}
            <div className='bg-blue-800 rounded-lg flex gap-2 justify-center items-center px-4 h-10 text-white cursor-pointer'>
                <Ellipsis size={16}/>
                More Actions
                <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <div className=''>
            <InvoiceCart/>
            <InvoiceTable/>
        </div>
    </div>
  )
}

export default Invoice