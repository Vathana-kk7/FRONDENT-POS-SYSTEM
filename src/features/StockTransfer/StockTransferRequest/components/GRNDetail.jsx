import React from 'react'

function GRNDetail() {
  return (
    <div className='p-5 border border-gray-200 rounded-lg mt-5 w-[640px] h-auto hover:scale-x-104 hover:shadow-lg transition-all'>
            <h1 className='font-bold mb-5'>Return Details</h1>
        <div className='flex justify-between'>
            <div className='font-semibold text-gray-600 text-sm text-shadow-2xs'>
                <h1 className='mb-2'>PR No.</h1>
                <h1 className='mb-2'>PO No.</h1>
                <h1 className='mb-2'>Suppliers</h1>
                <h1 className='mb-2'>Received Date</h1>
                <h1 className='mb-2'>Received By</h1>
                <h1 className='mb-2'>Status</h1>
                <h1 className='mb-2'>Reason</h1>
                <h1 className='mb-2'>Note</h1>
                <h1 className='mb-2 text-xs '>Items we received with physical damage.</h1>
            </div>
            <div className='font-semibold text-gray-600 text-sm text-shadow-2xs'>
                <h1 className='mb-2 text-blue-800'>GRN-2024-0016</h1>
                <h1 className='mb-2 text-blue-800'>PO-2024-0018</h1>
                <h1 className='mb-2'>Cambodia LTD</h1>
                <h1 className='mb-2'>May 28, 24</h1>
                <h1 className='mb-2'>Singpur Aloto</h1>
                <span className='mb-2 bg-green-100 rounded-lg text-green-600 px-3 py-0 text-sm'>Approved</span>
                <h1 className='mb-2'>Damaged goods</h1>
            </div>
        </div>
    </div>
  )
}

export default GRNDetail