import { Download, FileSpreadsheet, FileText, Plus } from 'lucide-react'
import React, { useRef, useState } from 'react'
import SortableCard from '../components/SortableCard';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Customerdata } from '../data/Customerdata';
import { useCustomerLayout } from '../../../context/CustomerLayoutContext';
import CustomerFilter from '../components/CustomerFilter';
import CustomerTable from '../components/CustomerTable';
import CustomerPagination from '../components/CustomerPagination';
import { useCustomer } from '../../../context/CustomerContext';
import DeleteModal from '../../../components/common/Delete';
import ModelCustomer from '../components/ModelCustomer';
import EditeCustomer from '../components/EditeCustomer';
import useGetAllCustomer from '../hook/useGetAllCustomer';
import useGetCustomerStats from '../hook/useGetCustomerStats';
import useCustomerImport from '../hook/useCustomerImport';
import useCreateCustomer from '../hook/useCreateCustomer';
import useEditeCustomers from '../hook/useEditeCustomers';
import useDeleteCustomer from '../hook/useDeleteCustomer';
import { showToast } from '../../../utils/toast';
import CustomerService from '../service/CustomerService';

function Customer() {
    const [page, setPage] = useState(1);
    const perPage = 10;
    const [filters, setFilters] = useState({
      search: '',
      status: '',
    });

    // ==============================
    // Category Layout
    // ==============================
    const { drages, setDrages } = useCustomerLayout();
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
  
        setCards(
          arrayMove(
            cards,
            oldIndex,
            newIndex
          )
        );
      }
    }
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const fileInputRef = useRef(null);
    const [cards, setCards] = useState(Customerdata);
    const { mutate: importCustomers, isPending: isImporting } = useCustomerImport();
    const {
        isAddOpen,
        isDeleteOpen,
        isViewOpen,
        isEditOpen,
        selectedCategory,
        openAdd,
        openView,
        openEdit,
        openDelete,
        closeAdd,
        closeView,
        closeEdit,
        closeDelete,
      } = useCustomer();

  const {
    Customer=[],
    currentPage,
    lastPage,
    total,
    from,
    to,
    isLoading,
    isFetching,
    isError,
  }=useGetAllCustomer({
    page,
    perPage,
    search: filters.search,
    status: filters.status,
  });
  const {
    data: customerStats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useGetCustomerStats();

  const handleFilter = (nextFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleImportFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      showToast('Choose an Excel workbook (.xlsx or .xls).', 'error');
      return;
    }

    importCustomers(file, {
      onSuccess: () => setIsImportOpen(false),
    });
  };

  const handleExport = async (type) => {
    setIsExportOpen(false);
    setIsExporting(true);

    try {
      const response = await CustomerService.exportCustomers(type, filters);
      const blobUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      const date = new Date().toISOString().slice(0, 10);

      link.href = blobUrl;
      link.download = `customers_${date}.${type === 'excel' ? 'xlsx' : 'pdf'}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
      showToast(`Customer ${type.toUpperCase()} exported successfully.`, 'success');
    } catch (error) {
      console.error(`Customer ${type} export failed:`, error);
      showToast(
        error?.response?.data?.message || `Customer ${type} export failed.`,
        'error'
      );
    } finally {
      setIsExporting(false);
    }
  };

  const statsByCardId = {
    1: customerStats?.total_customers,
    2: customerStats?.active_customers,
    3: customerStats?.inactive_customers,
    4: customerStats?.total_sales,
  };
  const formatTotalSales = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const {
    createCustomerAsync,
    isPending,
    isSuccess,
  }=useCreateCustomer();

  const {
    mutateAsync: editCustomer,
    isPending: isEditing,
  } = useEditeCustomers();

  const {
    mutate: deleteCustomer,
    isPending: isDeleting,
  } = useDeleteCustomer();
  // ==============================
// Customer Table Column Visibility
// ==============================
const [visibleColumns, setVisibleColumns] = useState({
  email: true,
  phone: true,
  address: true,
  group: true,
  totalSales: true,
  status: true,
});

// Toggle individual column
const toggleColumn = (columnKey) => {
  setVisibleColumns((previous) => ({
    ...previous,
    [columnKey]: previous[columnKey] === false,
  }));
};
  return (
    <div className="px-5">
       <div className="flex justify-between">
        <h1 className="text-xl font-medium">
          Customers
        </h1>
      {/* Header */}
        <div className="flex gap-3">
          {/* Add Category */}
          <button
            type="button"
            onClick={openAdd}
            className="
              flex
              h-11
              w-40
              items-center
              justify-center
              rounded-xl
              bg-blue-800
              text-white
              shadow-lg
              transition
              hover:bg-blue-900
              cursor-pointer
            "
          >
            <Plus size={20} />
            <span className="ms-2">
              Add Customer
            </span>
          </button>
          {/* Import */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setIsImportOpen(!isImportOpen)
              }
              disabled={isImporting}
              aria-expanded={isImportOpen}
              aria-haspopup="true"
              className="
                bg-white
                flex
                justify-center
                items-center
                text-black
                w-40
                h-11
                rounded-xl
                shadow-lg
                border
                border-gray-200
                cursor-pointer
                hover:bg-gray-50
                transition
              "
            >

              <Download size={20} />

              <span className="ms-2">
                {isImporting ? 'Importing...' : 'Import'}
              </span>

            </button>


            {/* Import Dropdown */}

            {isImportOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-48
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  shadow-xl
                  p-2
                "
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  onChange={handleImportFile}
                  className="hidden"
                  aria-label="Choose customer Excel file"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FileSpreadsheet
                    size={20}
                    className="text-green-600"
                  />
                  <span className="font-medium text-gray-700">
                    Excel file
                  </span>
                </button>
                <p className="px-3 pb-2 text-xs text-gray-500">
                  Excel only (.xlsx, .xls). Columns: name, phone, email, address, group, status.
                </p>
              </div>

            )}

          </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsExportOpen((open) => !open)}
            disabled={isExporting}
            aria-expanded={isExportOpen}
            aria-haspopup="true"
            className="flex h-11 w-40 items-center justify-center rounded-xl border border-gray-200 bg-white text-black shadow-lg transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download size={20} />
            <span className="ms-2">{isExporting ? 'Exporting...' : 'Export'}</span>
          </button>
          {isExportOpen && (
            <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
              <button
                type="button"
                onClick={() => handleExport('excel')}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-green-50"
              >
                <FileSpreadsheet size={20} className="text-green-600" />
                <span className="font-medium text-gray-700">Excel file</span>
              </button>
              <button
                type="button"
                onClick={() => handleExport('pdf')}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition hover:bg-red-50"
              >
                <FileText size={20} className="text-red-500" />
                <span className="font-medium text-gray-700">PDF file</span>
              </button>
              <p className="px-3 pb-2 text-xs text-gray-500">
                Exports all customers matching the applied filters.
              </p>
            </div>
          )}
        </div>
        </div>
      </div>
      {/* ================================= */}
      {/* Category Cards */}
      {/* ================================= */}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <SortableContext
          items={cards}
          strategy={rectSortingStrategy}
        >

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-5
              mt-5
            "
          >

            {cards.map((card) => {
              const value = statsByCardId[card.id];
              const displayCard = {
                ...card,
                value: isStatsError
                  ? 'Unavailable'
                  : isStatsLoading
                    ? 'Loading...'
                    : card.id === 4
                      ? formatTotalSales.format(Number(value) || 0)
                      : Number(value) || 0,
              };

              return (
                <SortableCard
                  key={card.id}
                  card={displayCard}
                  disabled={!drages}
                />
              );
            })}

          </div>

        </SortableContext>

      </DndContext>
      {isStatsError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {statsError?.response?.data?.message ||
            statsError?.message ||
            'Unable to load customer statistics.'}
        </p>
      )}
      <div className="w-full h-full mt-5">

        <CustomerFilter
            onFilter={handleFilter}
            visibleColumns={visibleColumns}
            toggleColumn={toggleColumn}
          />

        <CustomerTable
            isLoading={isLoading}
            Customer={Customer}
            startIndex={from > 0 ? from - 1 : (page - 1) * perPage}
            visibleColumns={visibleColumns}
            onView={openView}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        <div className="flex justify-between border border-gray-200 bg-gray-100 p-3 ">
          <h1 className="font-simbold text-gray-600">
            Showing {from} to {to} of {total} customers
          </h1>
          <CustomerPagination
            currentPage={currentPage}
            lastPage={lastPage}
            onChange={handlePageChange}
          />
        </div>
      </div>

      {/* ================================= */}
      {/* Add Category */}
      {/* ================================= */}

      {isEditOpen && selectedCategory && (
        <EditeCustomer
          selectedCustomer={selectedCategory}
          onClose={closeEdit}
          editCustomer={editCustomer}
          isPending={isEditing}
        />
      )}

      {isAddOpen && (

        <ModelCustomer
          onClose={closeAdd}
          createCustomer={createCustomerAsync}
          isPending={isPending}
          selectedCategory={selectedCategory}
        />

      )}


      {/* ================================= */}
      {/* Delete Category */}
      {/* ================================= */}

      {isDeleteOpen && (

        <DeleteModal
          isDeleting={isDeleting}
          item={selectedCategory}
          title="Delete Customer?"
          message="Are you sure you want to delete this customer? This action cannot be undone."
          onClose={closeDelete}
          onConfirm={() =>
            deleteCustomer(selectedCategory.id, {
              onSuccess: closeDelete,
            })
          }
        />

      )}

    </div>
  )
}

export default Customer