import React, { useState } from "react";

function ProductGrid() {
  const categories = [
    "All Categories",
    "Laptops",
    "Phones",
    "Accessories",
    "Monitors",
    "Printers",
    "Storage",
    "Others",
  ];

  const products = [
    {
      id: 1,
      name: "MacBook Pro 14",
      price: 1299,
      stock: 8,
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=400",
    },
    {
      id: 2,
      name: "Dell XPS 13",
      price: 1099,
      stock: 10,
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400",
    },
    {
      id: 3,
      name: "iPhone 14 Pro",
      price: 999,
      stock: 15,
      category: "Phones",
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400",
    },
    {
      id: 4,
      name: "HP Laptop 15",
      price: 650,
      stock: 12,
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    },
    {
      id: 5,
      name: "Lenovo ThinkPad E14",
      price: 750,
      stock: 9,
      category: "Laptops",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    },
    {
      id: 6,
      name: "Logitech MX Master 3",
      price: 99,
      stock: 25,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    },
    {
      id: 7,
      name: "Logitech K380",
      price: 45,
      stock: 30,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    },
    {
      id: 8,
      name: "Sony WH-CH520",
      price: 55,
      stock: 18,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    },
    {
      id: 9,
      name: "USB-C Cable",
      price: 20,
      stock: 50,
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400",
    },
    {
      id: 10,
      name: "SanDisk 32GB USB",
      price: 10,
      stock: 60,
      category: "Storage",
      image:
        "https://images.unsplash.com/photo-1624823183493-ed5832f48f8c?w=400",
    },
    {
      id: 11,
      name: 'Samsung 24" Monitor',
      price: 120,
      stock: 7,
      category: "Monitors",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    },
    {
      id: 12,
      name: "Canon G3010 Printer",
      price: 130,
      stock: 6,
      category: "Printers",
      image:
        "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400",
    },
    {
      id: 13,
      name: "WD 1TB External HDD",
      price: 75,
      stock: 14,
      category: "Storage",
      image:
        "https://images.unsplash.com/photo-1531492746076-161ca9b9a38b?w=400",
    },
    {
      id: 14,
      name: "HP Ink GT52 (Black)",
      price: 12,
      stock: 40,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
    {
      id: 15,
      name: "A4 Paper Ream",
      price: 5,
      stock: 100,
      category: "Others",
      image:
        "https://images.unsplash.com/photo-1564412651407-5d7d0e5b6e13?w=400",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All Categories");

  const filteredProducts =
    activeCategory === "All Categories"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <div className="mt-5 w-full">

      {/* Categories */}
      <div className="mb-5 flex gap-3 overflow-x-auto pb-1">
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "border-indigo-700 bg-indigo-700 text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

        {filteredProducts.map((product) => (
          <button
            key={product.id}
            type="button"
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white p-3 text-left transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
          >

            {/* Image */}
            <div className="flex h-32 w-full items-center justify-center overflow-hidden rounded-md bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div className="mt-3 text-center">

              <h3 className="truncate text-xs font-semibold text-gray-800">
                {product.name}
              </h3>

              <p className="mt-2 text-sm font-bold text-gray-900">
                ${product.price.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </p>

              <p className="mt-2 text-xs font-medium text-green-600">
                Stock: {product.stock}
              </p>

            </div>
          </button>
        ))}

      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="flex h-60 items-center justify-center text-sm text-gray-400">
          No products found.
        </div>
      )}

    </div>
  );
}

export default ProductGrid;