import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./App";
import { AuthProvider } from "../context/AuthContext";
import { ProductLayoutProvider } from "../context/ProductLayoutContext";
import { ProductProvider } from "../context/ProductContext";
import { CategoryProvider } from "../context/CategoryContext";
import { CategoryLayoutProvider } from "../context/CategoryLayoutContext";
import { DashboardLayoutProvider } from "../context/DashboardLayoutContext";
import { CustomerLayoutProvider } from "../context/CustomerLayoutContext";
import { CustomerProvider } from "../context/CustomerContext";
import { SaleOrderLayoutProvider } from "../context/SaleOrderLayoutContext";
import { SaleOrderProvider } from "../context/SaleOrderContext";
import { PurchaseOrderLayoutProvider } from "../context/PurchaseOrderlayoutContext";
import { GoodReceivedLayoutProvider } from "../context/GoodReceivedLayout";
import { PurchaseReturnLayoutProvider } from "../context/PurchaseReturnLayoutContext";
import { StockTransferLayoutProvider } from "../context/StockTransferLayoutContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
    <ProductLayoutProvider>
      <CategoryLayoutProvider>
        <CustomerProvider>
          <DashboardLayoutProvider>
            <CustomerLayoutProvider>
              <SaleOrderLayoutProvider>
                <PurchaseOrderLayoutProvider>
                  <GoodReceivedLayoutProvider>
                    <PurchaseReturnLayoutProvider>
                      <StockTransferLayoutProvider>
                        <ProductProvider>
                          <CategoryProvider>
                            <SaleOrderProvider>
                              <App />
                            </SaleOrderProvider>
                          </CategoryProvider>
                        </ProductProvider>
                      </StockTransferLayoutProvider>
                    </PurchaseReturnLayoutProvider>
                  </GoodReceivedLayoutProvider>
                </PurchaseOrderLayoutProvider>
              </SaleOrderLayoutProvider>
            </CustomerLayoutProvider>
          </DashboardLayoutProvider>
        </CustomerProvider>
      </CategoryLayoutProvider>
     </ProductLayoutProvider>
   </AuthProvider>
  </StrictMode>
);