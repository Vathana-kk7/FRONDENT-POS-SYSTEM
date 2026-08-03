import { ArrowRight } from 'lucide-react'
import React from 'react'

function LowStock() {
  return (
    <div className='border border-gray-200 rounded-lg p-5 shadow-lg'>
        <div className='flex gap-2 justify-between '>
            <div>
                <h1 className='font-medium'>Low Stock Product</h1>
            </div>
            <div className='flex gap-2 text-blue-800 justify-center items-center cursor-pointer font-medium'>
                <h1>View all </h1>
                <ArrowRight size={15} className='text-blue-800'/>
            </div>
        </div>
        <div className='flex justify-between mt-2 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><img src="/src/assets/Images/com.png" className='w-10 h-10' alt="" /></div>
                <div>
                    <h1 className='font-medium'>MackBook Pro 14</h1>
                    <p className='text-sm text-gray-600'>SKU: ACC-003</p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-2 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><img src="/src/assets/Images/com.png" className='w-10 h-10' alt="" /></div>
                <div>
                    <h1 className='font-medium'>MackBook Pro 14</h1>
                    <p className='text-sm text-gray-600'>SKU: ACC-003</p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-2 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><img src="/src/assets/Images/com.png" className='w-10 h-10' alt="" /></div>
                <div>
                    <h1 className='font-medium'>MackBook Pro 14</h1>
                     <p className='text-sm text-gray-600'>SKU: ACC-003</p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-2 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><img src="/src/assets/Images/com.png" className='w-10 h-10' alt="" /></div>
                <div>
                    <h1 className='font-medium'>MackBook Pro 14</h1>
                     <p className='text-sm text-gray-600'>SKU: ACC-003</p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-2 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><img src="/src/assets/Images/com.png" className='w-10 h-10' alt="" /></div>
                <div>
                    <h1 className='font-medium'>MackBook Pro 14</h1>
                     <p className='text-sm text-gray-600'>SKU: ACC-003</p>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
    </div>
  )
}

export default LowStock