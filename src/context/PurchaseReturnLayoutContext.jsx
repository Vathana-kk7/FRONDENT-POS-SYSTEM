import { createContext, useContext, useState } from "react";

const PurchaseReturnLayoutContext = createContext();

export function PurchaseReturnLayoutProvider({ children }) {

  const [dragIsopen, setDragIsopen] = useState(false);

  return (
    <PurchaseReturnLayoutContext.Provider
      value={{
        dragIsopen,
        setDragIsopen,
      }}
    >
      {children}
    </PurchaseReturnLayoutContext.Provider>
  );
}


export const usePurchaseReturnLayout = () =>
  useContext(PurchaseReturnLayoutContext);