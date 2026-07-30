import { createContext, useContext, useState } from "react";

const ProductLayoutContext = createContext();

export function ProductLayoutProvider({ children }) {

  const [dragEnabled, setDragEnabled] = useState(false);

  return (
    <ProductLayoutContext.Provider
      value={{
        dragEnabled,
        setDragEnabled,
      }}
    >
      {children}
    </ProductLayoutContext.Provider>
  );
}


export const useProductLayout = () =>
  useContext(ProductLayoutContext);