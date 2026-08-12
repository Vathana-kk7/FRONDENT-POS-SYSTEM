import React from "react";

function StockTransferUnderTable() {
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
    <div className="w-full min-w-xs border border-gray-200 rounded-lg overflow-hidden bg-white mt-5 ">

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto overflow-y-auto hidden-scroll">
        <table className="w-full min-w-xs text-sm border-b border-gray-200 ">

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
                Qty Requested
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
                  hover:scale-y-105
                  scrollbar-none
                  hover:bg-gray-200
                  hover:shadow-sm
                  cursor-pointer
                "
              >
                {/* Number */}
                <td className="px-4 py-3 font-bold text-gray-600">
                  {product.id}
                </td>

                {/* Product */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-12 items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div>
                      <p className="whitespace-nowrap font-medium text-gray-800">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
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
              </tr>
            ))}
            <tr>
            {/* Total Items */}
              <td colSpan="3" className="px-4 py-4 text-right">
                <span className="font-bold text-gray-700">
                  Total Items
                </span>
              </td>

              <td className="px-4 py-4 text-center">
                <span className="font-bold text-blue-600">
                  8
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockTransferUnderTable;