import React from 'react';
import {
  Eye,
  SquarePen,
  Trash2,
  Users,
} from 'lucide-react';

import { useCustomer } from '../../../context/CustomerContext';

const DEFAULT_VISIBLE_COLUMNS = {
  email: true,
  phone: true,
  address: true,
  group: true,
  totalSales: true,
  status: true,
};

const formatMoney = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value) || 0);

function ActionButton({
  label,
  onClick,
  icon: Icon,
  iconClass,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <Icon className={iconClass} size={17} />
    </button>
  );
}

function CustomerSkeleton({ count = 6, columnCount = 9 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="animate-pulse border-b border-gray-100"
        >
          {Array.from({ length: columnCount }).map(
            (_, columnIndex) => (
              <td
                key={columnIndex}
                className="px-5 py-4"
              >
                <div
                  className={`h-4 rounded bg-gray-200 ${
                    columnIndex === columnCount - 1
                      ? 'ml-auto w-24'
                      : columnIndex === 0
                        ? 'w-6'
                        : 'w-24 max-w-full'
                  }`}
                />
              </td>
            )
          )}
        </tr>
      ))}
    </>
  );
}

function CustomerTable({
  Customer = [],
  isLoading = false,
  visibleColumns = DEFAULT_VISIBLE_COLUMNS,
  startIndex = 0,
}) {
  const {
    openView,
    openEdit,
    openDelete,
  } = useCustomer();

  // Always normalize column visibility.
  const columns = {
    ...DEFAULT_VISIBLE_COLUMNS,
    ...visibleColumns,
  };

  const isVisible = (key) => columns[key] !== false;

  // Build the visible column list once.
  const optionalColumns = [
    {
      key: 'email',
      label: 'Email',
      render: (customer) => (
        <span
          className="block max-w-[200px] truncate text-gray-500"
          title={customer?.email || ''}
        >
          {customer?.email || 'N/A'}
        </span>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (customer) => (
        <span className="whitespace-nowrap text-gray-600">
          {customer?.phone || 'N/A'}
        </span>
      ),
    },
    {
      key: 'address',
      label: 'Address',
      render: (customer) => (
        <span
          className="block max-w-[200px] truncate text-gray-600"
          title={customer?.address || ''}
        >
          {customer?.address || 'N/A'}
        </span>
      ),
    },
    {
      key: 'group',
      label: 'Group',
      render: (customer) => (
        <span className="inline-flex whitespace-nowrap rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-100">
          {customer?.group || 'Standard'}
        </span>
      ),
    },
    {
      key: 'totalSales',
      label: 'Total sales',
      render: (customer) => (
        <span className="whitespace-nowrap font-semibold tabular-nums text-gray-700">
          {formatMoney(customer?.totalSales)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (customer) => {
        const inactive =
          String(customer?.status || 'Active').toLowerCase() ===
          'inactive';

        return (
          <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
              inactive
                ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-200'
                : 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-200'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                inactive ? 'bg-red-500' : 'bg-green-500'
              }`}
            />

            {customer?.status || 'Active'}
          </span>
        );
      },
    },
  ];

  const visibleOptionalColumns = optionalColumns.filter(
    (column) => isVisible(column.key)
  );

  // No + Customer name + visible optional columns + Actions.
  const columnCount = 3 + visibleOptionalColumns.length;

  return (
    <div className="w-full min-w-0">
      <div className="h-[650px] overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm scrollbar-none">
        <table className="w-full min-w-[750px] border-collapse text-left text-sm">
          {/* Table header */}
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="w-16 whitespace-nowrap px-5 py-4">
                No.
              </th>

              <th className="min-w-[180px] whitespace-nowrap px-5 py-4">
                Customer name
              </th>

              {visibleOptionalColumns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-5 py-4"
                >
                  {column.label}
                </th>
              ))}

              <th className="w-[150px] whitespace-nowrap px-5 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <CustomerSkeleton
                count={6}
                columnCount={columnCount}
              />
            ) : Customer.length === 0 ? (
              <tr>
                <td
                  colSpan={columnCount}
                  className="px-5 py-16 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Users
                        size={22}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="font-semibold text-gray-800">
                      No customers found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Add a customer or adjust your search filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              Customer.map((customer, index) => (
                <tr
                  key={customer?.id ?? startIndex + index}
                  className="transition-colors hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4 font-medium tabular-nums text-gray-500">
                    {startIndex + index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <div
                      className="max-w-[220px] truncate font-semibold text-gray-900"
                      title={customer?.name || ''}
                    >
                      {customer?.name || 'N/A'}
                    </div>
                  </td>

                  {visibleOptionalColumns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-4"
                    >
                      {column.render(customer)}
                    </td>
                  ))}

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <ActionButton
                        label="View customer"
                        onClick={() => openView(customer)}
                        icon={Eye}
                        iconClass="text-blue-600"
                      />

                      <ActionButton
                        label="Edit customer"
                        onClick={() => openEdit(customer)}
                        icon={SquarePen}
                        iconClass="text-amber-600"
                      />

                      <ActionButton
                        label="Delete customer"
                        onClick={() => openDelete(customer)}
                        icon={Trash2}
                        iconClass="text-red-600"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  );
}

export default CustomerTable;