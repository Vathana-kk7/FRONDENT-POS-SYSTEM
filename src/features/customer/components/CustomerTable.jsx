import React from 'react';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import { useCustomer } from '../../../context/CustomerContext';

const GRID = 'grid grid-cols-[48px_1.4fr_1.6fr_1fr_1fr_1fr_1fr_140px] items-center gap-4 px-6';

const formatMoney = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value) || 0);

function ActionButton({ label, onClick, icon: Icon, iconClass }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <Icon className={iconClass} size={18} />
    </button>
  );
}

function CustomerTable({ customers = [] }) {
  const { openView, openEdit, openDelete } = useCustomer();

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]" role="table" aria-label="Customers">
        {/* Header */}
        <div
          role="row"
          className={`${GRID} h-[50px] border border-gray-200 bg-gray-100 font-medium text-gray-900`}
        >
          <div role="columnheader">No</div>
          <div role="columnheader">Customer name</div>
          <div role="columnheader">Email</div>
          <div role="columnheader">Phone</div>
          <div role="columnheader">Group</div>
          <div role="columnheader">Total sales</div>
          <div role="columnheader">Status</div>
          <div role="columnheader" className="text-right pr-10">Actions</div>
        </div>

        {/* Body */}
        <div className="h-[450px] overflow-y-auto scrollbar-none">
          {customers.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              No customers yet. Add a customer to see them here.
            </div>
          ) : (
            customers.map((customer, index) => {
              const isInactive = customer.status === 'Inactive';
              return (
                <div
                  role="row"
                  key={customer.id ?? index}
                  className={`${GRID} min-h-[80px] border-b border-gray-200 bg-gray-50 transition-colors hover:bg-gray-200`}
                >
                  <div role="cell" className="font-semibold text-gray-900">{index + 1}</div>

                  <div role="cell" className="truncate font-semibold text-gray-900" title={customer.name}>
                    {customer.name}
                  </div>

                  <div role="cell" className="truncate text-sm text-gray-500" title={customer.email}>
                    {customer.email || 'N/A'}
                  </div>

                  <div role="cell" className="truncate font-semibold text-gray-600">
                    {customer.phone || 'N/A'}
                  </div>

                  <div role="cell">
                    <span className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                      {customer.group || 'Standard'}
                    </span>
                  </div>

                  <div role="cell" className="font-semibold tabular-nums text-gray-600">
                    {formatMoney(customer.totalSales)}
                  </div>

                  <div role="cell">
                    <span
                      className={`inline-flex items-center rounded-md px-3 py-1 text-sm font-semibold ${
                        isInactive ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {customer.status || 'Active'}
                    </span>
                  </div>

                  <div role="cell" className="flex items-center justify-end gap-3">
                    <ActionButton label="View customer" onClick={() => openView(customer)} icon={Eye} iconClass="text-blue-500" />
                    <ActionButton label="Edit customer" onClick={() => openEdit(customer)} icon={SquarePen} iconClass="text-yellow-500" />
                    <ActionButton label="Delete customer" onClick={() => openDelete(customer)} icon={Trash2} iconClass="text-red-500" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerTable;