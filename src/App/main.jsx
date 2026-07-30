import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import App from "./App";
import { AuthProvider } from "../context/AuthContext";
import { ProductLayoutProvider } from "../context/ProductLayoutContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
    <ProductLayoutProvider>
     <App />
     </ProductLayoutProvider>
   </AuthProvider>
  </StrictMode>
);