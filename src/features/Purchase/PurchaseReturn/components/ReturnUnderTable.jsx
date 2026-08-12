import React from "react";

function ReturnUnderTable() {
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
        <table className="w-full min-w-[950px] text-sm border-b border-gray-200 mb-5">

          {/* Header */}
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50 ">
              <th className="px-4 py-3 font-bold">ReturnItems</th>
            </tr>
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
                Qty Orders
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Qty Returned
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Unite Price
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
                

                {/* Amount */}
                <td className="px-4 py-3 text-right font-medium text-gray-800 whitespace-nowrap">
                  ${product.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex pl-200 justify-between px-5 mb-5">
              <h1 className="font-bold text-gray-700">Total Return Amount</h1>
              <h1 className="text-red-500 font-bold">$2555.00</h1>
          </div>
      </div>
    </div>
  );
}

export default ReturnUnderTable;