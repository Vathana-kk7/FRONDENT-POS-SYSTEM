import React from 'react';
import { ArrowRight } from 'lucide-react';

function RecentOrder() {
  const orders = [
    {
      id: 'INV-0001',
      customer: 'John Cena',
      total: '$1,290.00',
      status: 'Delivered',
      date: '30 May, 2024',
    },
    {
      id: 'INV-0002',
      customer: 'Lola Akindele',
      total: '$590.00',
      status: 'Processing',
      date: '30 May, 2024',
    },
    {
      id: 'INV-0003',
      customer: 'Lilian Owagbie',
      total: '$2,310.00',
      status: 'Pending',
      date: '30 May, 2024',
    },
    {
      id: 'INV-0004',
      customer: 'Jack Sparrow',
      total: '$750.00',
      status: 'Delivered',
      date: '29 May, 2024',
    },
    {
      id: 'INV-0005',
      customer: 'Tony Stark',
      total: '$1,120.00',
      status: 'Cancelled',
      date: '29 May, 2024',
    },
    {
      id: 'INV-0004',
      customer: 'Jack Sparrow',
      total: '$750.00',
      status: 'Delivered',
      date: '29 May, 2024',
    },
    {
      id: 'INV-0005',
      customer: 'Tony Stark',
      total: '$1,120.00',
      status: 'Cancelled',
      date: '29 May, 2024',
    },
    {
      id: 'INV-0004',
      customer: 'Jack Sparrow',
      total: '$750.00',
      status: 'Delivered',
      date: '29 May, 2024',
    },
    {
      id: 'INV-0005',
      customer: 'Tony Stark',
      total: '$1,120.00',
      status: 'Cancelled',
      date: '29 May, 2024',
    },
  ];

  const statusStyle = {
    Delivered: 'bg-green-100 text-green-600',
    Processing: 'bg-blue-100 text-blue-600',
    Pending: 'bg-orange-100 text-orange-600',
    Cancelled: 'bg-red-100 text-red-600',
  };

  return (
    <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-200 flex justify-between">
        <h2 className="text-base font-bold text-blue-900 ">
          Recent Transfers
        </h2>
        <div className="px-5 border-t border-gray-200">
            <button
            className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-blue-800 cursor-pointer
                transition
            "
            >
            View all
            <ArrowRight size={16} />
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[360px] overflow-x-auto scrollbar-none">
        <table className="w-full">

          {/* Table Header */}
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-medium text-gray-700">
                TR No.
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-gray-700 flex gap-1 justify-center items-center">
                From <span><ArrowRight size={15}/></span> To
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-gray-700">
                Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition"
              >

                {/* Order ID */}
                <td className="px-5 py-3.5 text-sm font-medium text-indigo-700">
                  {order.id}
                </td>

                {/* Customer */}
                <td className="px-5 py-3.5 text-sm text-gray-700">
                  {order.customer}
                </td>

                {/* Date */}
                <td className="px-5 py-3.5 text-sm text-gray-600">
                  {order.date}
                </td>

                {/* Status */}
                <td className="px-5 py-3.5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      px-2.5
                      py-1
                      rounded-md
                      text-xs
                      font-medium
                      ${statusStyle[order.status]}
                    `}
                  >
                    {order.status}
                  </span>
                </td>

                

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      

    </div>
  );
}

export default RecentOrder;