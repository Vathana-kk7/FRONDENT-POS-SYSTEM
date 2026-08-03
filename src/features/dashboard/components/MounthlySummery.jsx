import { BadgeDollarSign, CirclePercent, Radical, ShoppingBag, User, UsersRound } from 'lucide-react'
import React from 'react'

function MounthlySummery() {
  return (
    <div className='border border-gray-200 rounded-lg p-5 shadow-lg'>
        <h1 className='font-medium mb-5'>TopSellingCart</h1>
        <div className='flex justify-between mt-6 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><BadgeDollarSign  color="blue"/></div>
                <div>
                    <h1 className='font-medium'>Total Sales</h1>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-6 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><ShoppingBag color="blue"/></div>
                <div>
                    <h1 className='font-medium'>Total Orders</h1>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-6 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><UsersRound color="blue"/></div>
                <div>
                    <h1 className='font-medium'>Total Customers</h1>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-6 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><CirclePercent color="blue"/></div>
                <div>
                    <h1 className='font-medium'>Total Profit</h1>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
        <div className='flex justify-between mt-6 border-b-gray-200 border-b pb-3'>
            <div className='flex gap-3 justify-center items-center'>
                <div><Radical color="blue"/></div>
                <div>
                    <h1 className='font-medium'>Average Order Value</h1>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-medium'>$2400.00</p>
            </div>
        </div>
    </div>
  )
}

export default MounthlySummery