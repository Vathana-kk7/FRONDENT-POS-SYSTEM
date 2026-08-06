import { Settings, Grip } from "lucide-react";
import { useProductLayout } from "../../../context/ProductLayoutContext";
import { useCategoryLayout } from "../../../context/CategoryLayoutContext";
import { useDashboardLayout } from "../../../context/DashboardLayoutContext";
import { useCustomerLayout } from "../../../context/CustomerLayoutContext";
import { useSaleOrderLayout } from "../../../context/SaleOrderLayoutContext";
import { usePurchaseOrderLayout } from "../../../context/PurchaseOrderlayoutContext";
import { useGoodReceivedLayout } from "../../../context/GoodReceivedLayout";

function Setting() {
  const { dragEnabled, setDragEnabled } = useProductLayout();
  const { dragEnablede, setDragEnablede } = useSaleOrderLayout();
  const { drag, setDrag } = useCategoryLayout();
  const { drage, setDrage } = useDashboardLayout();
  const { drages, setDrages } = useCustomerLayout();
  const { dragEnabledes, setDragEnabledes } = usePurchaseOrderLayout();
  const { dragcart, setDragcart } = useGoodReceivedLayout();

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