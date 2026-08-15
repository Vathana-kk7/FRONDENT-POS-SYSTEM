import { Settings, Grip } from "lucide-react";
import { useProductLayout } from "../../../context/ProductLayoutContext";
import { useCategoryLayout } from "../../../context/CategoryLayoutContext";
import { useDashboardLayout } from "../../../context/DashboardLayoutContext";
import { useCustomerLayout } from "../../../context/CustomerLayoutContext";
import { useSaleOrderLayout } from "../../../context/SaleOrderLayoutContext";
import { usePurchaseOrderLayout } from "../../../context/PurchaseOrderlayoutContext";
import { useGoodReceivedLayout } from "../../../context/GoodReceivedLayout";
import { usePurchaseReturnLayout } from "../../../context/PurchaseReturnLayoutContext";
import { useStockTransferLayout } from "../../../context/StockTransferLayoutContext";
import { useStockTransferAllLayout } from "../../../context/StockTransferAllLayoutContext";
import { StockTransferHistoryLayout } from "../../../context/StockTransferHistoryLayoutContext";
import { useUserAllLayout } from "../../../context/UserAllLayoutContext";
import { useUserRolesLayout } from "../../../context/UserRolesLayoutContext";
import { useSupplierLayout } from "../../../context/SupplierLayoutContext";
import { useReportLayout } from "../../../context/ReportLayoutContext";

function Setting() {
  const { dragEnabled, setDragEnabled } = useProductLayout();
  const { dragEnablede, setDragEnablede } = useSaleOrderLayout();
  const { drag, setDrag } = useCategoryLayout();
  const { drage, setDrage } = useDashboardLayout();
  const { drages, setDrages } = useCustomerLayout();
  const { dragEnabledes, setDragEnabledes } = usePurchaseOrderLayout();
  const { dragcart, setDragcart } = useGoodReceivedLayout();
  const { dragIsopen, setDragIsopen } = usePurchaseReturnLayout();
  const { dragIsopenes, setDragIsopenes } = useStockTransferLayout();
  const { dragIsopened, setDragIsopened } = useStockTransferAllLayout();
  const { dragIsopenies, setDragIsopenies } = StockTransferHistoryLayout();
  const { Opendrag, setOpenDrag } = useUserAllLayout();
  const { Opendrages, setOpenDrages } = useUserRolesLayout();
  const { Opendraged, setOpenDraged } = useSupplierLayout();
  const { Showdrag, setShowDrag } = useReportLayout(); 
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-blue-600" size={28} />

          <h1 className="text-2xl font-bold text-gray-800">
            Settings
          </h1>
        </div>


        {/* Dashboard Setting */}
        <div className="flex items-center justify-between border rounded-xl p-5">

          <div className="flex items-center gap-4">

            <div className="bg-blue-100 p-3 rounded-xl">
              <Grip className="text-blue-600" />
            </div>


            <div>
              <h2 className="font-semibold text-gray-800">
                Dashboard Layout
              </h2>

              <p className="text-sm text-gray-500">
                Enable drag & drop to rearrange dashboard cards.
              </p>
            </div>

          </div>


          {/* Toggle Button */}
          <button
            onClick={() => setDragEnabled(!dragEnabled)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragEnabled ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragEnabled ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() => setDrag(!drag)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${drag ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${drag ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() => setDrage(!drage)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${drag ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${drage ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() => setDrages(!drages)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${drag ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${drage ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() => setDragEnablede(!dragEnablede)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${drag ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${drage ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() => setDragEnabledes(!dragEnabledes)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragEnabledes ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragEnabledes ? "translate-x-7" : ""}
              `}
            />

          </button>
          
          <button
            onClick={() => setDragcart(!dragcart)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragcart ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragcart ? "translate-x-7" : ""}
              `}
            />

          </button>
         

          <button
            onClick={() => setDragIsopen(!dragIsopen)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragIsopen ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragIsopen ? "translate-x-7" : ""}
              `}
            />

          </button>

          <button
            onClick={() => setDragIsopenes(!dragIsopenes)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragIsopenes ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragIsopenes ? "translate-x-7" : ""}
              `}
            />

          </button>

          <button
            onClick={() => setDragIsopened(!dragIsopened)} 
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragIsopened ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragIsopened ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() =>setDragIsopenies(!dragIsopenies)} 
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${dragIsopenies ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${dragIsopenies ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() =>setOpenDrag(!Opendrag)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${Opendrag ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${Opendrag ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() =>setOpenDrag(!Opendrag)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${Opendrag ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${Opendrag ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() =>setOpenDrages(!Opendrages)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${Opendrages ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${Opendrages ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() =>setOpenDraged(!Opendraged)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${Opendraged ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${Opendraged ? "translate-x-7" : ""}
              `}
            />

          </button>
          <button
            onClick={() =>setShowDrag(!Showdrag)}
            className={`
              relative cursor-pointer w-14 h-7 rounded-full transition
              ${Showdrag ? "bg-blue-600" : "bg-gray-300"}
            `}
          >

            <span
              className={`
                absolute top-1 left-1
                w-5 h-5 bg-white rounded-full
                transition-transform
                ${Showdrag ? "translate-x-7" : ""}
              `}
            />

          </button>
        </div>


        {/* Status */}
        <div className="mt-6 text-sm text-gray-600">

          Status :

          <span
            className={`
              ml-2 font-semibold
              ${
                dragEnabled
                  ? "text-green-600"
                  : "text-red-600"
              }
            `}
          >
            {dragEnabled ? "Enabled" : "Disabled"}
          </span>

        </div>


      </div>
    </div>
  );
}

export default Setting;