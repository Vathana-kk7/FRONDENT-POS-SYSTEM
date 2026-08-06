import { ChevronDown, Download, Ellipsis, Printer } from 'lucide-react'
import React from 'react'
import PaymentCart from '../components/PaymentCart'
import PaymentInformationCart from '../components/PaymentInformationCart'
import PaymentPagination from '../components/PaymentPagination'
import PaymentHistoryCart from '../components/PaymentHistoryCart'

function Payment() {
  return (
    <div className='px-5'>
        <div className='flex justify-between'>
          <div>
              <div className='flex gap-3 justify-center items-center'>
                <h1 className='font-medium text-xl'>Sale Payment</h1>
                
              </div>
          </div>
          <div className="flex gap-3">
            {/* Print */}
            <div className="h-10 px-6 border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
              <Printer size={16} />
              <span>Print</span>
            </div>
            {/* More Action */}
            <div className='bg-blue-800 rounded-lg flex gap-2 justify-center items-center px-4 h-10 text-white cursor-pointer'>
                <Ellipsis size={16}/>
                More Actions
                <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <div>
          <PaymentCart/>
          <PaymentInformationCart/>
          <PaymentHistoryCart/>
           <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
              <h1 className="font-simbold text-gray-600">Showing 1 to 7 of 1,250 products</h1>
              <PaymentPagination />
            </div>
        </div>
    </div>
  )
}

export default Payment