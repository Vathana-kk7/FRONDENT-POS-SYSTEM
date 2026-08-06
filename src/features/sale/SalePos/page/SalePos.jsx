import { ScanLine, Search } from "lucide-react";
import React from "react";
import BageCart from "../components/BageCart";
import ProductGrid from "../components/ProductGrid";

function SalePos() {
  return (
    <div className="px-5">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">

        {/* LEFT */}
        <div className="min-w-0">

          {/* SEARCH */}
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-12 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Search product by name, SKU or scan barcode..."
            />

            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
            >
              <ScanLine size={18} />
            </button>
          </div>

          {/* PRODUCT GRID */}
          <ProductGrid />

        </div>

        {/* CART */}
        <div className="w-full lg:sticky lg:top-2 lg:h-fit lg:w-[360px]">
          <BageCart />
        </div>

      </div>
    </div>
  );
}

export default SalePos;