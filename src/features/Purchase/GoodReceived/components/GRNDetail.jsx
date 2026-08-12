import React from 'react'

function GRNDetail() {
  return (
    <div className='p-5 border border-gray-200 rounded-lg mt-5 w-[380px] hover:scale-x-104 hover:shadow-lg transition-all'>
            <h1 className='font-medium mb-5'>GRN Details</h1>
        <div className='flex justify-between'>
            <div className='font-semibold text-gray-600 text-sm text-shadow-2xs'>
                <h1 className='mb-2'>GRN No.</h1>
                <h1 className='mb-2'>PO No.</h1>
                <h1 className='mb-2'>Suppliers</h1>
                <h1 className='mb-2'>Received Date</h1>
                <h1 className='mb-2'>Received By</h1>
            </div>
            <div className='font-semibold text-gray-600 text-sm text-shadow-2xs'>
                <h1 className='mb-2'>GRN-2024-0016</h1>
                <h1 className='mb-2'>PO-2024-0018</h1>
                <h1 className='mb-2'>Cambodia LTD</h1>
                <h1 className='mb-2'>May 28, 24</h1>
                <h1 className='mb-2'>Singpur Aloto</h1>
            </div>
        </div>
    </div>
  )
}

export default GRNDetail