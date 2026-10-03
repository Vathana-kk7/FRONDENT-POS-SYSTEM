import { ChevronDown, Ellipsis, Filter, Plus, Search, X } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import SupplierTable from '../components/SupplierTable'
import SupplierPagination from '../components/SupplierPagination'
import { ProductsCards, supplier } from '../data/Supplierdata'
import { useSupplierLayout } from '../../../context/SupplierLayoutContext'
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { closestCenter, DndContext } from '@dnd-kit/core'
import SortableCard from '../../product/components/SortableCard'

function Supplier() {
  const { Opendraged } = useSupplierLayout();
  const [cards, setCards] = useState(ProductsCards);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const filteredSuppliers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return supplier.filter((item) => {
      const matchesSearch = !normalizedSearch || [
        item.supplierName,
        item.contactPerson,
        item.email,
        item.phone,
      ].some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch));
      const matchesStatus = !status || item.status?.toLowerCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const lastPage = Math.max(1, Math.ceil(filteredSuppliers.length / pageSize));
  const pageStart = (currentPage - 1) * pageSize;
  const pageSuppliers = filteredSuppliers.slice(pageStart, pageStart + pageSize);
  const from = filteredSuppliers.length === 0 ? 0 : pageStart + 1;
  const to = Math.min(pageStart + pageSize, filteredSuppliers.length);

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setCurrentPage(1);
  }

  function handleStatusChange(event) {
    setStatus(event.target.value);
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setSearch('');
    setStatus('');
    setCurrentPage(1);
  }

  function handlePageChange(event, page) {
    setCurrentPage(page);
  }

  function handleDragEnd(event) {

    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {

      const oldIndex = cards.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = cards.findIndex(
        (item) => item.id === over.id
      );

      setCards(arrayMove(cards, oldIndex, newIndex));
    }
  }
  return (
    <div className='px-5'>
       {/* button */}
        <div className='flex justify-between'>
          <div>
              <div className=''>
                <h1 className='font-medium text-xl'>Sale Invoice</h1>
                <p className='text-sm text-gray-600 text-shadow-2xs'>Manage your suppliers and their information</p>
              </div>
          </div>
          <div className="flex gap-3">
            {/* Print */}
            <button
              type="button"
              aria-expanded={isFilterOpen}
              onClick={() => setIsFilterOpen((open) => !open)}
              className="h-10 px-6 border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-50 transition"
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>

            {/* Download + Dropdown */}
            <div className="h-10 border border-gray-200 rounded-lg overflow-hidden flex">
              
              {/* Download */}
              <div className="px-4 flex items-center justify-center gap-3 text-gray-700 cursor-pointer bg-blue-800 text-white transition">
                <Plus color="white" className='text-white' size={16} />
                <span>Add Supplier</span>
              </div>
            </div>
            {/* More Action */}
            <div className='bg-blue-800 rounded-lg flex gap-2 justify-center items-center px-4 h-10 text-white cursor-pointer'>
                <Ellipsis size={16}/>
                More Actions
                <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <div>
          {/* Cart */}
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={cards}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">
    
                {cards.map((card) => (
                  <SortableCard
                    key={card.id}
                    card={card}
                    disabled={!Opendraged}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
            {isFilterOpen && (
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
                <label className="relative min-w-[220px] flex-1 sm:max-w-sm">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search suppliers..."
                    aria-label="Search suppliers"
                    className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <select
                  value={status}
                  onChange={handleStatusChange}
                  aria-label="Filter suppliers by status"
                  className="h-10 min-w-[150px] rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">All statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>

                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                >
                  <X size={16} />
                  Clear filters
                </button>
              </div>
            )}
            <SupplierTable suppliers={pageSuppliers} startIndex={pageStart} />
            <div className="flex flex-wrap items-center justify-between gap-3 border border-gray-200 bg-gray-100 p-3">
              <p className="text-sm text-gray-600">
                Showing {from} to {to} of {filteredSuppliers.length} suppliers
              </p>
              <SupplierPagination
                currentPage={currentPage}
                lastPage={lastPage}
                onChange={handlePageChange}
              />
            </div>
        </div>
    </div>
  )
}

export default Supplier