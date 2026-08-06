import { ChevronDown, Download, Ellipsis, Filter, Plus, Printer } from 'lucide-react'
import React from 'react'
import SupplierCart from '../components/SupplierCart'
import SupplierTable from '../components/SupplierTable'
import SupplierPagination from '../components/SupplierPagination'

function Supplier() {
  return (
    <div className='px-5'>
       {/* button */}
        <div className='flex justify-between'>
          <div>
              <div className=''>
                <h1 className='font-medium text-xl'>Sale Invoice</h1>
                <p className='text-sm text-gray-600 text-shadow-2xs'>Manage your suppliers and their information</p>
              </div>
          </div>
          <div className="flex gap-3">
            {/* Print */}
            <div className="h-10 px-6 border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition">
              <Filter size={16} />
              <span>Filter</span>
            </div>

            {/* Download + Dropdown */}
            <div className="h-10 border border-gray-200 rounded-lg overflow-hidden flex">
              
              {/* Download */}
              <div className="px-4 flex items-center justify-center gap-3 text-gray-700 cursor-pointer bg-blue-800 text-white transition">
                <Plus color="white" className='text-white' size={16} />
                <span>Add Supplier</span>
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
        <div>
            <SupplierCart/>
            <SupplierTable/>
            <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
              <h1 className="font-simbold text-gray-600">Showing 1 to 7 of 1,250 products</h1>
              <SupplierPagination />
            </div>
        </div>
    </div>
  )
}

export default Supplier