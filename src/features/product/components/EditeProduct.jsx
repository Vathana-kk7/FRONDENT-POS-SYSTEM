import { X } from "lucide-react";
import React from "react";

function EditeProduct({ product, closeEdit}) {
 return (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-[2px]">
       <div className="bg-white w-[1100px] h-[800px] rounded-xl shadow-xl p-6"> 
         {/* Header */}
         <div className="flex justify-between items-start pb-5 border-b border-gray-200"> 
           <div>
             <h1 className="text-xl font-medium">
               Add New Product
             </h1> 
             <p className="text-gray-600">
               Enter the detail of the new product
             </p>
           </div> 
           <button
             type="button"
            onClick={closeEdit}
             className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 cursor-pointer"
           >
             <X size={20}/>
           </button> 
         </div> 
         {/* Body */}
         <div className="pt-5 flex gap-x-5">
             <div className=" w-130 h-100">
                 <div className="mb-3">
                     <h1 className="font-semibold">Product Photos <span className="text-red-600">*</span></h1>
                     <p className="text-gray-600 font-normal">Upload one or more photos of the product</p>
                 </div>
                 <div className="flex items-center justify-center w-full max-w-lg mx-auto">
                     <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-indigo-300 border-dashed rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-indigo-50/50 transition-colors">
                     <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4"> 
                         <div className="p-3 mb-3 bg-indigo-50 text-indigo-600 rounded-xl">
                             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                             </svg>
                         </div>
                         <p className="mb-1 text-sm font-semibold text-slate-700">
                             Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
                         </p>
                         <p className="text-xs text-slate-400">
                             PNG, JPG, JPEG up to 5MB each
                         </p>
                     </div>
                     <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" />
                     </label>
                 </div>
             </div>
             <div className="w-150">
                 <div>
                     <label className="font-semibold">Product Name <span className="text-red-600">*</span></label>
                     <input className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
                 </div>
                 <div className="flex gap-5 mt-5 w-full">
                     <div>
                         <label className="font-semibold">SKU<span className="text-red-600">*</span></label>
                         <input className="mt-2 w-full py-2 px-7 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
                     </div>
                     <div>
                         <label className="font-semibold">Barcode<span className="text-red-600">*</span></label>
                         <input className="mt-2 w-full py-2 px-7 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
                     </div>
                 </div>
                 <div className="flex gap-5 mt-5 w-full">
                     <div>
                         <label className="font-semibold">Category<span className="text-red-600">*</span></label>
                         <input className="mt-2 w-full py-2 px-7 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
                     </div>
                     <div>
                         <label className="font-semibold">Status<span className="text-red-600">*</span></label>
                         <input className="mt-2 w-full py-2 px-7 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
                     </div>
                 </div>
                 <div className="flex gap-5 mt-5 w-full">
                     <div>
                         <label className="font-semibold">Product Type<span className="text-red-600">*</span></label>
                         <input className="mt-2 w-full py-2 px-7 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
                     </div>
                     <div>
                         <label className="font-semibold">Brand<span className="text-red-600">*</span></label>
                         <input className="mt-2 w-full py-2 px-7 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
                     </div>
                 </div>
             </div>
         </div> 
         <div className="flex gap-5">
             <div>
                 <label className="font-semibold">Product Name <span className="text-red-600">*</span></label>
                 <input className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
             </div>
             <div>
                 <label className="font-semibold">Product Name <span className="text-red-600">*</span></label>
                 <input className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
             </div>
             <div>
                 <label className="font-semibold">Product Name <span className="text-red-600">*</span></label>
                 <input className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
             </div>
             <div>
                 <label className="font-semibold">Product Name <span className="text-red-600">*</span></label>
                 <input className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
             </div>
         </div>
         <div className="mt-5">
             <label className="font-semibold">Product Name <span className="text-red-600">*</span></label>
             <input className="mt-2 w-full py-2 px-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-800 transition-all text-sm text-gray-800 placeholder:text-gray-400" type="text" name="" id="" placeholder="Enter product name" />
         </div>
         <div className="flex justify-between mt-15">
             <div>
                 <button className="bg-blue-800 p-2 px-5 text-white cursor-pointer rounded-lg">Save New</button>
             </div>
             <div className="flex gap-5">
                 <div><button className="bg-while p-2 px-5 text-black border border-gray-300 cursor-pointer rounded-lg">Cancle</button></div>
                 <div><button className="bg-blue-800 p-2 px-5 text-white cursor-pointer rounded-lg">SaveProduct</button></div>
             </div>
         </div>
       </div> 
     </div>
   );
}

export default EditeProduct;