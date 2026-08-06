import React from 'react'
import PieChartWithCenterLabel from './PieChartWithCenterLabel'
import usePrurchaseOrder from '../hook/usePrurchaseOrder';

function PurchaseCartReport() {
    const { data } = usePrurchaseOrder();

  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
   <div className='flex  justify-between'>
        <div className='mt-5 w-[490px] border border-gray-200 rounded-lg p-5 hover:scale-x-104 transition-all hover:shadow-xl'>
            <h1 className='font-medium border-gray-200 mb-3'>Recent Purchase Summary</h1>
            <div className='flex justify-between border-b border-gray-200 mb-5 font-semibold text-sm text-gray-700'>
                <div>Last 7 Days</div>
                <div className='mb-3'>$6900.00</div>
            </div>
            <div className='flex justify-between border-b border-gray-200 mb-5 font-semibold text-sm text-gray-700 '>
                <div>Last 7 Days</div>
                <div className='mb-3'>$6900.00</div>
            </div>
            <div className='flex justify-between  border-gray-200 mb-5 font-semibold text-sm text-gray-700'>
                <div>Last 7 Days</div>
                <div className='mb-3 text-green-600'>$6900.00</div>
            </div>
        </div>
        <div className='mt-5 w-[490px] border border-gray-200 rounded-lg p-5 hover:scale-x-104 transition-all hover:shadow-xl'>
            <h1 className='font-medium border-gray-200 mb-3'>Top Suppliers by Purchase Value</h1>
            <div className='flex justify-between border-b border-gray-200 mb-5 font-semibold text-sm text-gray-700'>
                <div>1.NextGen Computers</div>
                <div className='mb-3'>$6900.00</div>
            </div>
            <div className='flex justify-between border-b border-gray-200 mb-5 font-semibold text-sm text-gray-700 '>
                <div>2.TechSource Computer</div>
                <div className='mb-3'>$6900.00</div>
            </div>
            <div className='flex justify-between border-b border-gray-200 mb-5 font-semibold text-sm text-gray-700 '>
                <div>2.TechSource Computer</div>
                <div className='mb-3'>$6900.00</div>
            </div>
            <div className='flex justify-between  border-gray-200 mb-5 font-semibold text-sm text-gray-700'>
                <div>3.HakKok Computer</div>
                <div className='mb-3 text-green-600'>$6900.00</div>
            </div>
        </div>
        <div className='mt-5 w-[490px] border border-gray-200 rounded-lg p-5 hover:scale-x-104 transition-all hover:shadow-xl'>
            <h1 className='font-medium border-gray-200 mb-3'>Order Status Distribution</h1>
            <div className='flex gap-5'>
                <div className='flex w-full justify-between  border-gray-200 mb-5 font-semibold text-sm text-gray-700'>
                    <PieChartWithCenterLabel
                    data={data}
                    centerLabel={total}
                    />
                </div>
                <div className='flex w-full justify-between mt-10 border-gray-200 mb-5 font-semibold text-sm text-gray-700'>
                    {/* Legend */}
                    <div className="flex-1 space-y-3">
                        {data.map((item) => {
                        const percent = ((item.value / total) * 100).toFixed(1);

                        return (
                            <div
                            key={item.label}
                            className="flex items-center justify-between"
                            >
                            <div className="flex items-center gap-2">
                                <span
                                className="w-3 h-3 rounded-sm"
                                style={{ backgroundColor: item.color }}
                                />

                                <span className="text-sm text-gray-700">
                                {item.label} ({item.value})
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-gray-600">
                                {percent}%
                            </span>
                            </div>
                        );
                        })}
                    </div>
                </div>
            </div>
        </div>
   </div>
  )
}

export default PurchaseCartReport