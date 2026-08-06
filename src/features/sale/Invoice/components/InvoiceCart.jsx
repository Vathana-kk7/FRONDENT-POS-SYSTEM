import React from 'react'

function InvoiceCart() {
  return (
    <div className='mt-5 w-full flex gap-5 '>
        {/* Bill To */}
        <div className='p-5 border border-gray-200 rounded-lg pr-20 w-[400px] hover:shadow-lg transition-all'>
          <h1 className='font-medium mb-2'>Bill To</h1>
          <h1 className='font-medium mb-2'>ABC Corporation</h1>
          <div className='text-gray-600 text-sm font-nornal  text-shadow-2xs'>
              <h1 className='mb-2'>123 Business Avenue</h1>
              <h1 className='mb-2'>Logos Nigiri</h1>
              <h1 className='mb-2'>abc@corp.com</h1>
              <h1 className='mb-2'>+855 932 61416</h1>
          </div>
        </div>
        {/* Ship To */}
        <div className='p-5 border border-gray-200 rounded-lg pr-20 w-[400px] hover:shadow-lg transition-all'>
          <h1 className='font-medium mb-2'>Ship To</h1>
          <h1 className='font-medium'>ABC Corporation</h1>
          <div className='text-gray-600 text-sm font-nornal text-shadow-2xs'>
              <h1 className='mb-2'>123 Business Avenue</h1>
              <h1 className='mb-2'>Logos Nigiri</h1>
              <h1 className='mb-2'>abc@corp.com</h1>
              <h1 className='mb-2'>+855 932 61416</h1>
          </div>
        </div>
        <div className='p-5 border border-gray-200 rounded-lg w-[400px] hover:shadow-lg transition-all'>
          <div className='flex gap-10 justify-between'>
              <div className='text-gray-600 text-sm font-nornal mb-2 text-shadow-2xs'>
                  <h1 className='mb-3'>Invoice Date</h1>
                  <h1 className='mb-3'>Due Date</h1>
                  <h1 className='mb-3'>Sale Order</h1>
                  <h1 className='mb-3'>Payment Terms</h1>
                  <h1 className='mb-3'>Salesperson</h1>
              </div>
              <div className='text-gray-600 text-sm font-mono mb-2 text-right text-shadow-2xs hover:shadow-lg transition-all'>
                  <h1 className='mb-3'>May 13, 2008</h1>
                  <h1 className='mb-3'>May 31, 2024</h1>
                  <h1 className='mb-3'>June 14, 2024</h1>
                  <h1 className='mb-3 text-blue-800'>So-2024-0007</h1>
                  <h1 className='mb-3'>John Michael</h1>
              </div>
          </div>
        </div>
        <div className='p-5 border border-gray-200 bg-yellow-50/50 rounded-lg w-[400px] hover:shadow-lg transition-all'>
            <div className='flex justify-center items-center border-b border-gray-300'>
              <div>
                <h1>Total Amount</h1>
                <h1 className='text-blue-800 text-2xl font-bold mb-5'>$5,250.00</h1>
              </div>
            </div>
            <div className='mt-5 text-gray-600 text-sm font-medium mb-2 flex gap-40' >
              <div className='text-left'>
                <h1 className='mb-3'>Amount Paid</h1>
                <h1>Balance Due</h1>
              </div>
              <div className='text-right'>
                <h1 className='text-green-500 mb-3 font-bold'>$5,250.00</h1>
                <h1>Balance Due</h1>
              </div>
            </div>
        </div>
    </div>
  )
}

export default InvoiceCart