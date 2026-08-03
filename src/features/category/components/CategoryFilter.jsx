import { Filter } from 'lucide-react'
import React from 'react'

function CategoryFilter() {
   return (
    <div className='p-5 mt-5'>
      <div className='flex gap-5'>
          <div>
            {/* Search */}
            {/* <div className='absolute ms-7.5 '>
              <Search color='gray' size={20}/>
            </div> */}
            <div>
              <input type="search" className='border border-gray-200 outline-none rounded-lg ms-5 px-5 py-1 relative pl-10 focus:ring-1 focus:ring-blue-500' placeholder="Search Product..." />
            </div>
          </div>
          <div>
            <select name="All Categories" id="All Categories" className='border border-gray-200 outline-none focus:ring-1 focus:ring-blue-800 rounded-lg px-5 py-1 pr-20 text-gray-600'>
              <option value="Computer" className='hover:scale-120 '>All Categories</option>
              <option value="Computer" className='hover:scale-120 '>Computer</option>
              <option value="Computer" className='hover:scale-120 '>Computer</option>
            </select>
          </div>
          <div>
            <select name="All Categories" id="All Categories" className='border border-gray-200 outline-none focus:ring-1 focus:ring-blue-800 rounded-lg px-5 py-1 pr-20 text-gray-600'>
              <option value="Computer" className='hover:scale-120 '>All Status</option>
              <option value="Computer" className='hover:scale-120 '>Computer</option>
              <option value="Computer" className='hover:scale-120 '>Computer</option>
            </select>
          </div>
          <div className='border border-gray-200 flex gap-3 px-5 py-1 rounded-lg'>
            <Filter color='gray' className='mt-1.5' size={17}/>
            <h1 className=''>Filter</h1>
          </div>
      </div>
    </div>
  )
}

export default CategoryFilter