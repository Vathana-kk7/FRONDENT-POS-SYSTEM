import { CircleSlash2, Pin, ShoppingBag, User, UsersRound } from 'lucide-react'
import React from 'react'

function SupplierCart() {
  return (
    <div className='mt-5'>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <div className='border border-gray-200 w-[376px] rounded-lg p-5 shadow-lg'>
                <div className='flex gap-3 mb-3'>
                    <div className='flex justify-center items-center bg-blue-200 rounded-lg w-13 py-3'><UsersRound color="blue"/></div>
                    <div>
                        <h1 className='font-medium'>Total Suppliers</h1>
                        <h1 className='font-bold'>12</h1>
                    </div>
                </div>
                <p className='text-md text-shadow-2xs text-gray-600'>All registered suppliers</p>
            </div>
            <div className='border border-gray-200 w-[376px] rounded-lg p-5 shadow-lg'>
                <div className='flex gap-3 mb-3'>
                    <div className='flex justify-center items-center bg-blue-200 rounded-lg w-13 py-3 '><Pin className='rotate-45' color="blue"/></div>
                    <div>
                        <h1 className='font-medium'>Total Suppliers</h1>
                        <h1 className='font-bold'>12</h1>
                    </div>
                </div>
                <p className='text-md text-shadow-2xs text-gray-600'>All registered suppliers</p>
            </div>
            <div className='border border-gray-200 w-[376px] rounded-lg p-5 shadow-lg'>
                <div className='flex gap-3 mb-3'>
                    <div className='flex justify-center items-center bg-red-200 rounded-lg w-13 py-3'><CircleSlash2 className='text-red-500'/></div>
                    <div>
                        <h1 className='font-medium'>Total Suppliers</h1>
                        <h1 className='font-bold'>12</h1>
                    </div>
                </div>
                <p className='text-md text-shadow-2xs text-gray-600'>All registered suppliers</p>
            </div>
            <div className='border border-gray-200 w-[376px] rounded-lg p-5 shadow-lg'>
                <div className='flex gap-3 mb-3'>
                    <div className='flex justify-center items-center bg-green-200 rounded-lg w-13 py-3'><ShoppingBag className='text-green-700'/></div>
                    <div>
                        <h1 className='font-medium'>Total Suppliers</h1>
                        <h1 className='font-bold'>12</h1>
                    </div>
                </div>
                <p className='text-md text-shadow-2xs text-gray-600'>All registered suppliers</p>
            </div>
        </div>
    </div>
  )
}

export default SupplierCart