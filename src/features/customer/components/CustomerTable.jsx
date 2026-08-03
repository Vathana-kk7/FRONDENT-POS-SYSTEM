import { Delete, Edit, Eye, NotebookPen, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { category } from '../../category/data/Categorydata'; 
import { useCustomer } from '../../../context/CustomerContext';
function CustomerTable({ onView, onEdit, onDelete }) {
  const {
   openView,
   openEdit,
   openDelete,
 } = useCustomer();
   return (
     <div className=''>
        {/* ================= HEADER ================= */}
       <div
         className="
           grid
           grid-cols-[minmax(380px,1fr)_140px_150px_120px_100px_130px_170px]
           items-center
           gap-4
           h-[50px]
           px-4
           bg-gray-100
           border
           border-gray-200
           text-gray-900
           font-medium
         "
       >
         <div>Product</div>
         <div>Category</div>
         <div>SKU</div>
         <div>Price</div>
         <div>Stock</div>
         <div>Status</div>
         <div>Action</div>
       </div>
       {/* scroll */}
      <div className="max-h-[450px] overflow-y-auto scrollbar-none">
   {category.map((product) => (
     <div
       key={product.id}
       className="
         grid
         grid-cols-[minmax(380px,1fr)_140px_150px_120px_100px_130px_170px]
         items-center
         gap-4
         min-h-[80px]
         px-6
         
         bg-gray-50
         border-b
         border-gray-200
         hover:bg-gray-200
         hover:scale-101
         transition-all
       "
     >
       {/* Product */}
       <div className="flex items-center gap-5 min-w-0">
         <img
           src={product.image}
           alt={product.name}
           className="
             w-[65px]
             h-[55px]
             object-cover
             rounded-md
             shrink-0
           "
         />
 
         <div className="min-w-0">
           <h1 className="font-semibold text-gray-900 truncate">
             {product.name}
           </h1>
 
           <p className="text-sm text-gray-500 truncate">
             {product.description}
           </p>
         </div>
       </div>
 
       {/* Category */}
       <div>
         <span
           className="
             inline-flex
             items-center
             bg-blue-100
             px-3
             py-1
             rounded-md
             text-sm
             font-semibold
             text-blue-800
           "
         >
           Laptop
         </span>
       </div>
 
       {/* SKU */}
       <div className="text-gray-600 font-semibold">
         LAP-HP-001
       </div>
 
       {/* Price */}
       <div className="text-gray-600 font-semibold">
         $650.00
       </div>
 
       {/* Stock */}
       <div className="text-green-600 font-semibold">
         25
       </div>
 
       {/* Status */}
       <div>
         <span
           className="
             inline-flex
             items-center
             bg-green-100
             px-3
             py-1
             rounded-md
             text-sm
             font-semibold
             text-green-800
           "
         >
           In Stock
         </span>
       </div>
 
       {/* Actions */}
       <div className="flex items-center gap-3">
 
         {/* Edit */}
         <button
           type="button"
           onClick={() => openEdit(product)}
           className="
             w-9
             h-9
             flex
             items-center
             justify-center
             border
             border-gray-300
             rounded-lg
             cursor-pointer
             hover:bg-white
             transition
           "
         >
           <Edit
             className="text-yellow-500"
             size={18}
           />
         </button>
 
         {/* Delete */}
         <button
           type="button"
           onClick={() => openDelete(product)}
           className="
             w-9
             h-9
             flex
             items-center
             justify-center
             border
             border-gray-300
             rounded-lg
             cursor-pointer
             hover:bg-white
             transition
           "
         >
           <Trash2
             className="text-red-500"
             size={18}
           />
         </button>
       </div>
     </div>
   ))}
 </div>
     </div>
   )
}

export default CustomerTable