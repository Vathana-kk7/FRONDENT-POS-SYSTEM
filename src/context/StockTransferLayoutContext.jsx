import { createContext, useContext, useState } from "react";

const StockTransferLayoutContext = createContext();

export function StockTransferLayoutProvider({ children }) {

  const [dragIsopenes, setDragIsopenes] = useState(false);

  return (
    <StockTransferLayoutContext.Provider
      value={{
        dragIsopenes,
        setDragIsopenes,
      }}
    >
      {children}
    </StockTransferLayoutContext.Provider>
  );
}


export const useStockTransferLayout = () =>
  useContext(StockTransferLayoutContext);