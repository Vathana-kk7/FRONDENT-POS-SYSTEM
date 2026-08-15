import { createContext, useContext, useState } from "react";

const BrandLayoutContext = createContext();

export function BrandLayoutProvider({ children }) {

  const [dragShow, setDragShow] = useState(false);

  return (
    <BrandLayoutContext.Provider
      value={{
        dragShow,
        setDragShow,
      }}
    >
      {children}
    </BrandLayoutContext.Provider>
  );
}


export const useBrandLayout = () =>
  useContext(BrandLayoutContext);