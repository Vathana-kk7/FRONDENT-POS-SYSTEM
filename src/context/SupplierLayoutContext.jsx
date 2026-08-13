import { createContext, useContext, useState } from "react";

const SupplierLayoutContext = createContext();

export function SupplierLayoutProvider({ children }) {

  const [Opendraged, setOpenDraged] = useState(false);

  return (
    <SupplierLayoutContext.Provider
      value={{
        Opendraged,
        setOpenDraged,
      }}
    >
      {children}
    </SupplierLayoutContext.Provider>
  );
}


export const useSupplierLayout = () =>
  useContext(SupplierLayoutContext);