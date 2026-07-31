import { Delete, Edit, Eye, NotebookPen, Trash2 } from 'lucide-react'
import React from 'react'
function ProductTable() {
  return (
    <div className=''>
      {/* Header */}
      <div className='flex gap-10 border border-gray-200 bg-gray-100 p-3'> 
        <h1 className='pr-80 font-medium'>Prouduct</h1>
        <div className='flex gap-20 font-medium'>
          <h1 className=''>Category</h1>
          <h1 className='ms-10'>SKU</h1>
          <h1 className='ms-10'>Price</h1>
          <h1 className='ms-10'>Stock</h1>
          <h1 className='ms-10'>Status</h1>
        </div>
        <h1 className='pl-40 font-medium'>Action</h1>
      </div>
      {/* scroll */}
      <div className='max-h-[450px] overflow-y-auto scrollbar-none'>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
        <div className='flex  items-center bg-gray-50  border-b-1 border-gray-400 hover:bg-gray-200 hover:scale-x-101 transition-all'>
        <div className='ms-3'>
          <img src="/src/assets/Images/com.png" className='object-cover w-19 h-19'  alt="" />
        </div>
        <div className='ms-5'>
            <h1>HP Pavilion 15</h1>
            <p>Today I love you Nisa I miss you</p>
        </div>
        <div className='ms-25 bg-blue-100 px-3 py-1 rounded-sm text-sm font-semibold text-blue-800'>Labtop</div>
        <div className='ms-29 text-gray-600 font-semibold'>LAP-HP-001</div>
        <div className='ms-19 text-gray-600 font-semibold'>$650.00</div>
        <div className='ms-29 text-green-600 font-semibold'>25</div>
        <div className='ms-31 bg-green-100 px-3 py-1 rounded-sm text-sm font-semibold text-green-800'>In Stock</div>
        <div className='flex gap-3 ms-45'>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Eye color="blue" size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Edit className='text-yellow-500' size={18}/></div>
          <div className='border border-gray-300 rounded-lg px-2 py-1.5 cursor-pointer'><Trash2 color="red " size={18}/></div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProductTable