import React from 'react'

function PosCart() {
  return (
    <div className='mt-5 w-full flex gap-5 '>
        {/* Bill To */}
        <div className='p-5 border border-gray-200 rounded-lg pr-20 w-[400px] hover:shadow-lg transition-all'>
          <h1 className='font-medium mb-2'>Payment No.</h1>
          <h1 className='font-bold mb-2 text-blue-800'>Pay-2024-0012</h1>
          <div className='flex justify-between'>
              <div className='text-gray-600 text-sm font-nornal  text-shadow-2xs'>
                  <h1 className='mb-3'>Payment Date</h1>
                  <h1 className='mb-3'>Payment Method</h1>
                  <h1 className='mb-3'>Reference</h1>
                  <h1 className='mb-3'>Status</h1>
              </div>
              <div className='text-right text-gray-600 text-sm font-nornal  text-shadow-2xs'>
                  <h1 className='mb-2'>May 31 ,2024</h1>
                   <h1 className=' bg-green-100 text-right px-1 ms-2 mb-3 flex justify-center items-center py-1 rounded-sm text-green-800 font-medium'>Bank Transfer</h1>
                  <h1 className='mb-2'>GTB-123456789</h1>
                  <h1 className=' bg-green-100 w-25 text-right ms-3 px-1 flex justify-center items-center py-1 rounded-sm text-green-800 font-medium'>Completed</h1>
              </div>
          </div>
        </div>
        {/* Ship To */}
        <div className='p-5 border border-gray-200 rounded-lg pr-20 w-[400px] hover:shadow-lg transition-all'>
          <h1 className='font-medium mb-2'>Customer Detail</h1>
          <h1 className='font-medium text-blue-800'>ABC Corporation</h1>
          <div className='text-gray-600 text-sm font-nornal text-shadow-2xs'>
              <h1 className='mb-2'>123 Business Avenue</h1>
              <h1 className='mb-2'>Logos Nigiri</h1>
              <h1 className='mb-2'>abc@corp.com</h1>
              <h1 className='mb-2'>+855 932 61416</h1>
          </div>
        </div>
        <div className='p-5 border border-gray-200 rounded-lg w-[400px] hover:shadow-lg transition-all'>
          <div className='flex gap-10 justify-between'>
              <div className='font-nornal mb-2 '>
                  <h1 className='mb-3 font-medium'>Invoice Detail</h1>
                  <h1 className='mb-3 text-sm text-shadow-2xs text-gray-600'>Invoice No.</h1>
                  <h1 className='mb-3 text-sm text-shadow-2xs text-gray-600'>Invoice Date</h1>
                  <h1 className='mb-3 text-sm text-shadow-2xs text-gray-600'>Due Date</h1>
                  <h1 className='mb-3 text-sm text-shadow-2xs text-gray-600'>Total Amount</h1>
                  <h1 className='mb-3 text-sm text-shadow-2xs text-gray-600'>Balance Due</h1>
              </div>
              <div className='text-gray-600 text-sm font-nornal mb-2 text-right text-shadow-2xs  transition-all'>
                  {/* <h1 className='mb-3'>May 13, 2008</h1> */}
                  <h1 className='mb-3 mt-8.5 text-blue-800'>INV-2024-0007</h1>
                  <h1 className='mb-3'>May 31, 2024</h1>
                  <h1 className='mb-3 text-blue-800'>June 14, 2024</h1>
                  <h1 className='mb-3'>$5,250.00</h1>
                  <h1 className='mb-3'>$0.00</h1>
              </div>
          </div>
        </div>
        <div className='p-5 border  border-gray-200 rounded-lg w-[400px] hover:shadow-lg transition-all bg-green-50' >
          <h1 className='font-medium mb-3'>Payment Summary</h1>
          <div className='flex justify-between border-b border-b-gray-300'>
              <div className='text-gray-600 text-sm font-nornal mb-2 text-left text-shadow-2xs  transition-all'>
                <h1 className='mb-3'>Total Amount</h1>
                <h1 className='mb-3'>Amount Paid</h1>
                <h1 className='mb-3'>Discount</h1>
                <h1 className='mb-3'>Bank Charges</h1>
              </div>
              <div className='text-gray-600 text-sm font-nornal mb-2 text-right text-shadow-2xs  transition-all'>
                <h1 className='mb-3'>Total Amount</h1>
                <h1 className='mb-3'>Amount Paid</h1>
                <h1 className='mb-3'>Discount</h1>
                <h1 className='mb-3'>Bank Charges</h1>
              </div>
          </div>
          <div className='flex justify-between font-bold mt-3'>
              <h1 className='text-right'>Net Paid</h1>
              <h1 className='text-left text-blue-800'>$5,250.00</h1>
          </div>
        </div>

    </div>
  )
}

export default PosCart