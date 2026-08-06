import { createContext, useContext, useState } from "react";

const SaleOrderLayoutContext = createContext();

export function SaleOrderLayoutProvider({ children }) {

  const [dragEnablede, setDragEnablede] = useState(false);

  return (
    <SaleOrderLayoutContext.Provider
      value={{
        dragEnablede,
        setDragEnablede,
      }}
    >
      {children}
    </SaleOrderLayoutContext.Provider>
  );
}


export const useSaleOrderLayout = () =>
  useContext(SaleOrderLayoutContext);