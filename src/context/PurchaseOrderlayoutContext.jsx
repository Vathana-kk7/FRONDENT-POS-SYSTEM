import { createContext, useContext, useState } from "react";

const PurchaseOrderLayoutContext = createContext();

export function PurchaseOrderLayoutProvider({ children }) {

  const [dragEnabledes, setDragEnabledes] = useState(false);

  return (
    <PurchaseOrderLayoutContext.Provider
      value={{
        dragEnabledes,
        setDragEnabledes,
      }}
    >
      {children}
    </PurchaseOrderLayoutContext.Provider>
  );
}


export const usePurchaseOrderLayout = () =>
  useContext(PurchaseOrderLayoutContext);