import React from "react";

function InvoiceTable() {
  const products = [
    {
      id: 1,
      image: "/src/assets/Images/com.png",
      name: "HP Pavilion 15",
      sku: "LAP-HP-001",
      description: "15.6\" FHD, i5, 8GB RAM, 512GB SSD",
      qty: 2,
      price: 650,
      discount: 0,
      tax: 65,
      amount: 1365,
    },
    {
      id: 2,
      image: "/src/assets/Images/com.png",
      name: "Logitech Wireless Mouse",
      sku: "ACC-LOG-002",
      description: "2.4GHz, 1000 DPI, Black",
      qty: 5,
      price: 25,
      discount: 0,
      tax: 12.5,
      amount: 137.5,
    },
    {
      id: 3,
      image: "/src/assets/Images/com.png",
      name: "Dell Keyboard KB216",
      sku: "ACC-DEL-003",
      description: "USB, Black",
      qty: 3,
      price: 18,
      discount: 0,
      tax: 5.4,
      amount: 59.4,
    },
    {
      id: 4,
      image: "/src/assets/Images/com.png",
      name: 'Samsung 24" Monitor',
      sku: "MON-SAM-004",
      description: "24\", IPS, FHD, 75Hz",
      qty: 1,
      price: 120,
      discount: 0,
      tax: 12,
      amount: 132,
    },
  ];

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white mt-5 ">

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto hidden-scroll">
        <table className="w-full min-w-[950px] text-sm">

          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-700">
              <th className="px-4 py-3 text-left font-semibold w-[45px]">
                #
              </th>

              <th className="px-4 py-3 text-left font-semibold">
                Product
              </th>

              <th className="px-4 py-3 text-left font-semibold">
                Description
              </th>

              <th className="px-4 py-3 text-center font-semibold">
                Qty
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Unit Price
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Discount
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Tax
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Amount
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.map((product) => (
             <tr
                key={product.id}
                className="
                    border-b border-gray-200
                    last:border-b-0
                    transition-all duration-300 ease-in-out
                    hover:bg-gray-50
                    hover:shadow-sm
                    cursor-pointer
                "
                >
                {/* Number */}
                <td className="px-4 py-3 text-gray-600 font-bold">
                  {product.id}
                </td>

                {/* Product */}
                <td className="px-4 py-3 ">
                  <div className="flex items-center gap-3">

                    <div className="w-12 h-10 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800 whitespace-nowrap">
                        {product.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {product.sku}
                      </p>
                    </div>

                  </div>
                </td>

                {/* Description */}
                <td className="px-4 py-3 text-gray-600">
                  <p className="max-w-[220px] leading-5">
                    {product.description}
                  </p>
                </td>

                {/* Quantity */}
                <td className="px-4 py-3 text-center text-gray-700">
                  {product.qty}
                </td>

                {/* Unit Price */}
                <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap">
                  ${product.price.toFixed(2)}
                </td>

                {/* Discount */}
                <td className="px-4 py-3 text-right text-gray-700 whitespace-nowrap">
                  ${product.discount.toFixed(2)}
                </td>

                {/* Tax */}
                <td className="px-4 py-3 text-right text-gray-700">
                  <div>
                    <p>${product.tax.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      (10%)
                    </p>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-3 text-right font-medium text-gray-800 whitespace-nowrap">
                  ${product.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>


      {/* ================= BOTTOM ================= */}
      <div className="flex border-t border-gray-200 justify-between">

        {/* ================= NOTES ================= */}
        <div className="p-5">

          <h3 className="font-semibold text-gray-800 ">
            Notes
          </h3>

          <p className="text-sm text-gray-500 ">
            Thank you for your business!
          </p>

          <p className="text-sm text-gray-500">
            Payment can be made to the company bank account below.
          </p>
          {/* Bank Details */}
          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 text-sm ">
              Bank Details
            </h4>
            <div className="grid grid-cols-[95px_1fr] gap-y-1 text-sm">
              <span className="text-gray-500">
                Bank Name:
              </span>
              <span className="text-gray-600">
                GTBank Nigeria
              </span>
              <span className="text-gray-500">
                Account Name:
              </span>
              <span className="text-gray-600">
                Top Most Systems Ltd
              </span>
              <span className="text-gray-500">
                Account Number:
              </span>
              <span className="text-gray-600">
                0123456789
              </span>
              <span className="text-gray-500">
                Sort Code:
              </span>
              <span className="text-gray-600">
                058-152-052
              </span>
            </div>
          </div>
        </div>
        {/* ================= TOTALS ================= */}
        <div className="p-5 w-100">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Subtotal */}
            <div className="px-4 py-3 flex justify-between items-center text-sm font-bold">
              <span className="text-gray-600">
                Subtotal
              </span>
              <span className="text-gray-700">
                $1,694.00
              </span>
            </div>
            {/* Discount */}
            <div className="px-4 py-3 flex justify-between items-center text-sm font-bold">
              <span className="text-gray-600">
                Discount
              </span>
              <span className="text-gray-700">
                $0.00
              </span>
            </div>
            {/* Tax */}
            <div className="px-4 py-3 flex justify-between items-center text-sm font-bold ">
              <span className="text-gray-600">
                Tax (10%)
              </span>

              <span className="text-gray-700">
                $169.40
              </span>
            </div>
            {/* Total */}
            <div className="px-4 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
              <span className="text-blue-800 font-bold text-base">
                Total Amount
              </span>
              <span className="text-blue-800 font-bold text-lg">
                $5,250.00
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* =====================================================
        PAYMENT HISTORY + INVOICE TIMELINE
        ===================================================== */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 border-t border-gray-200">

        {/* ================= PAYMENT HISTORY ================= */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">

            <div className="px-4 py-3">
            <h3 className="font-semibold text-gray-800">
                Payment History
            </h3>
            </div>

            {/* Payment Table */}
            <div className="overflow-x-auto hidden-scroll">
            <table className="w-full text-xs">

                <thead>
                <tr className="border-y border-gray-200 bg-gray-50/50">
                    <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Date
                    </th>

                    <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Payment Method
                    </th>

                    <th className="px-4 py-2 text-left font-semibold text-gray-600">
                    Reference
                    </th>

                    <th className="px-4 py-2 text-right font-semibold text-gray-600">
                    Amount
                    </th>
                </tr>
                </thead>

                <tbody>
                <tr className="border-b border-gray-200">

                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    May 31, 2024
                    </td>

                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    Bank Transfer
                    </td>

                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    GTB-123456789
                    </td>

                    <td className="px-4 py-3 text-right text-gray-600 font-medium whitespace-nowrap">
                    $5,250.00
                    </td>

                </tr>
                </tbody>

            </table>
            </div>

            {/* Total Paid */}
            <div className="px-4 py-3 flex justify-end items-center gap-3">

            <span className="text-sm font-semibold text-gray-700">
                Total Paid:
            </span>

            <span className="text-sm font-bold text-green-600">
                $5,250.00
            </span>

            </div>

        </div>


        {/* ================= INVOICE TIMELINE ================= */}
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">

            <div className="px-4 py-3">
            <h3 className="font-semibold text-gray-800">
                Invoice Timeline
            </h3>
            </div>

            <div className="px-4">

            {/* Timeline Item 1 */}
            <div className="flex items-center gap-3 py-3 border-t border-gray-200">

                {/* Check */}
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="w-3 h-3"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    />
                </svg>
                </div>

                {/* Date */}
                <span className="text-xs text-gray-600 whitespace-nowrap">
                May 31, 2024 10:15 AM
                </span>

                {/* Event */}
                <span className="text-xs text-gray-700 flex-1">
                Invoice created
                </span>

                {/* User */}
                <span className="text-xs text-gray-600 whitespace-nowrap">
                John Michael
                </span>

            </div>


            {/* Timeline Item 2 */}
            <div className="flex items-center gap-3 py-3 border-t border-gray-200">

                {/* Check */}
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    className="w-3 h-3"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                    />
                </svg>
                </div>

                {/* Date */}
                <span className="text-xs text-gray-600 whitespace-nowrap">
                May 31, 2024 02:30 PM
                </span>

                {/* Event */}
                <span className="text-xs text-gray-700 flex-1">
                Payment received
                </span>

                {/* User */}
                <span className="text-xs text-gray-600 whitespace-nowrap">
                GTBank Transfer
                </span>

            </div> 
            </div> 
        </div> 
      </div>
    </div>
  );
}

export default InvoiceTable;