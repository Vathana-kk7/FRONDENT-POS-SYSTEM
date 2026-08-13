import { createContext, useContext, useState } from "react";

const StockTransferHistoryLayoutContext = createContext();

export function StockTransferHistoryLayoutProvider({ children }) {

  const [dragIsopenies, setDragIsopenies] = useState(false);

  return (
    <StockTransferHistoryLayoutContext.Provider
      value={{
        dragIsopenies,
        setDragIsopenies,
      }}
    >
      {children}
    </StockTransferHistoryLayoutContext.Provider>
  );
}


export const StockTransferHistoryLayout = () =>
  useContext(StockTransferHistoryLayoutContext);