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
createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
    <ProductLayoutProvider>
      <CategoryLayoutProvider>
        <CustomerProvider>
          <DashboardLayoutProvider>
            <CustomerLayoutProvider>
              <ProductProvider>
                <CategoryProvider>
                  <App />
                </CategoryProvider>
              </ProductProvider>
            </CustomerLayoutProvider>
          </DashboardLayoutProvider>
        </CustomerProvider>
      </CategoryLayoutProvider>
     </ProductLayoutProvider>
   </AuthProvider>
  </StrictMode>
);