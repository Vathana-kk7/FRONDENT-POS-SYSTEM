import React from 'react'
import CustomLabelChart from './CustomLabelChart'

function SaleCart() {
  return (
    <div className='border border-gray-200 rounded-lg p-5 shadow-lg '>
        <h1 className='font-medium'>Sale Overview</h1>
         <CustomLabelChart />
    </div>
  )
}

export default SaleCart