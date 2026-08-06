import React from "react";

function PaymentHistoryCart() {
  const payments = [
    {
      paymentNo: "PAY-2024-0012",
      date: "May 31, 2024",
      invoice: "INV-2024-0007",
      method: "Bank Transfer",
      reference: "GTB-123456789",
      amount: "$5,250.00",
      charges: "$0.00",
      discount: "$0.00",
      netPaid: "$5,250.00",
    },
    {
      paymentNo: "PAY-2024-0011",
      date: "May 20, 2024",
      invoice: "INV-2024-0005",
      method: "Cash",
      reference: "—",
      amount: "$2,180.00",
      charges: "$0.00",
      discount: "$0.00",
      netPaid: "$2,180.00",
    },
    {
      paymentNo: "PAY-2024-0010",
      date: "May 15, 2024",
      invoice: "INV-2024-0003",
      method: "Bank Transfer",
      reference: "GTB-987654321",
      amount: "$3,420.00",
      charges: "$10.00",
      discount: "$0.00",
      netPaid: "$3,410.00",
    },
    {
      paymentNo: "PAY-2024-0009",
      date: "May 05, 2024",
      invoice: "INV-2024-0001",
      method: "Card Payment",
      reference: "VISA •••• 4242",
      amount: "$4,560.00",
      charges: "$15.00",
      discount: "$0.00",
      netPaid: "$4,545.00",
    },
  ];

  return (
    <div className="mt-5 border border-gray-200 rounded-lg bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <h1 className="text-sm font-semibold text-gray-900">
          Payment History
        </h1>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search payments..."
              className="w-40 h-9 px-3 pr-8 border border-gray-200 rounded-md text-xs outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
             ⌄
            </span>
          </div>

          {/* Filter */}
          <button
            type="button"
            className="h-9 px-4 border border-gray-200 cursor-pointer rounded-md text-xs font-medium text-gray-700 flex items-center gap-2 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
              />
            </svg>

            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-xs">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-200">
              <th className="text-left px-5 py-3 font-semibold text-gray-700">
                Payment No.
              </th>

              <th className="text-left px-3 py-3 font-semibold text-gray-700">
                Payment Date
              </th>

              <th className="text-left px-3 py-3 font-semibold text-gray-700">
                Invoice No.
              </th>

              <th className="text-left px-3 py-3 font-semibold text-gray-700">
                Payment Method
              </th>

              <th className="text-left px-3 py-3 font-semibold text-gray-700">
                Reference
              </th>

              <th className="text-right px-3 py-3 font-semibold text-gray-700">
                Amount
              </th>

              <th className="text-right px-3 py-3 font-semibold text-gray-700">
                Bank Charges
              </th>

              <th className="text-right px-3 py-3 font-semibold text-gray-700">
                Discount
              </th>

              <th className="text-right px-3 py-3 font-semibold text-gray-700">
                Net Paid
              </th>

              <th className="text-center px-3 py-3 font-semibold text-gray-700">
                Status
              </th>

              <th className="text-center px-5 py-3 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.paymentNo}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {/* Payment No */}
                <td className="px-5 py-3">
                  <span className="font-semibold text-indigo-700">
                    {payment.paymentNo}
                  </span>
                </td>

                {/* Date */}
                <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                  {payment.date}
                </td>

                {/* Invoice */}
                <td className="px-3 py-3">
                  <span className="font-semibold text-indigo-700">
                    {payment.invoice}
                  </span>
                </td>

                {/* Method */}
                <td className="px-3 py-3 text-gray-700 whitespace-nowrap">
                  {payment.method}
                </td>

                {/* Reference */}
                <td className="px-3 py-3 text-gray-600 whitespace-nowrap">
                  {payment.reference}
                </td>

                {/* Amount */}
                <td className="px-3 py-3 text-right text-gray-700 whitespace-nowrap">
                  {payment.amount}
                </td>

                {/* Bank Charges */}
                <td className="px-3 py-3 text-right text-gray-700 whitespace-nowrap">
                  {payment.charges}
                </td>

                {/* Discount */}
                <td className="px-3 py-3 text-right text-gray-700 whitespace-nowrap">
                  {payment.discount}
                </td>

                {/* Net Paid */}
                <td className="px-3 py-3 text-right text-gray-700 whitespace-nowrap">
                  {payment.netPaid}
                </td>

                {/* Status */}
                <td className="px-3 py-3 text-center">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-green-50 text-green-600 font-medium">
                    Completed
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-3">
                  <div className="flex justify-center items-center gap-2">
                    {/* View */}
                    <button
                      type="button"
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-md text-indigo-600 hover:bg-indigo-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6-9.75-6-9.75-6z"
                        />
                        <circle cx="12" cy="12" r="2.5" />
                      </svg>
                    </button>

                    {/* More */}
                    <button
                      type="button"
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-md text-indigo-600 hover:bg-indigo-50"
                    >
                      <span className="text-base leading-none">⋮</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistoryCart;