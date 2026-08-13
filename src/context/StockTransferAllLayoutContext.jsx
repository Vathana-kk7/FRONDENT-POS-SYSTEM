import { createContext, useContext, useState } from "react";

const StockTransferAllLayoutContext = createContext();

export function StockTransferAllLayoutProvider({ children }) {

  const [dragIsopened, setDragIsopened] = useState(false);

  return (
    <StockTransferAllLayoutContext.Provider
      value={{
        dragIsopened,
        setDragIsopened,
      }}
    >
      {children}
    </StockTransferAllLayoutContext.Provider>
  );
}


export const useStockTransferAllLayout = () =>
  useContext(StockTransferAllLayoutContext);