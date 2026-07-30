import React from "react";

function ModelProduct({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 ">
      {/* Modal Box */}
      <div
        className=" bg-white w-[500px] h-[500px] rounded-xl shadow-xl p-6">
        <h1 className="text-xl font-bold">
          ModelProduct
        </h1>
        <button onClick={onClose} className=" mt-5 bg-red-600 text-white px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
}

export default ModelProduct;