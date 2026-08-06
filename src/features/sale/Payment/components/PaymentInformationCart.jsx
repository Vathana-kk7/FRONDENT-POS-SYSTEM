import React from "react";

function PaymentInformationCart() {
  return (
    <div className="mt-5">
      <h1 className="text-md font-semibold text-gray-900 mb-5">
        Payment Information
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Left Form */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Customer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer <span className="text-red-500">*</span>
              </label>
              <select className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500">
                <option>ABC Corporation</option>
              </select>
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                defaultValue="2024-05-31"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Invoice */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invoice <span className="text-red-500">*</span>
              </label>
              <select className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500">
                <option>INV-2024-0007</option>
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <select className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500">
                <option>Bank Transfer</option>
              </select>
            </div>

            {/* Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account
              </label>
              <select className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500">
                <option>GTBank Nigeria - 0123456789</option>
              </select>
            </div>

            {/* Payment Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                defaultValue="5250.00"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Reference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference / Transaction No.{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue="GTB-123456789"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Bank Charges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Charges
              </label>
              <input
                type="number"
                defaultValue="0.00"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount
              </label>
              <input
                type="number"
                defaultValue="0.00"
                className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                rows="3"
                defaultValue="Payment for Invoice INV-2024-0007"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none resize-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Amount Breakdown */}
        <div className="border border-gray-200 rounded-lg p-5 h-fit">
          <h2 className="font-semibold text-gray-900 mb-5">
            Amount Breakdown
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Invoice Amount</span>
              <span className="font-medium">$5,250.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Discount</span>
              <span className="font-medium">$0.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-700">Bank Charges</span>
              <span className="font-medium">$0.00</span>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="font-semibold text-gray-900">Net Paid</span>
              <span className="font-bold text-lg text-indigo-700">
                $5,250.00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-5">
        <button
          type="button"
          className="px-5 py-2 border cursor-pointer border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>

        <button
          type="button"
          className="px-5 py-2 bg-indigo-700 cursor-pointer text-white rounded-md text-sm font-medium hover:bg-indigo-800"
        >
          Save Payment
        </button>
      </div>
    </div>
  );
}

export default PaymentInformationCart;