import {
  createContext,
  useContext,
  useState,
} from "react";


const CustomerLayoutContext = createContext(null);


export function CustomerLayoutProvider({
  children,
}) {

  const [drages, setDrages] = useState(false);


  return (
    <CustomerLayoutContext.Provider
      value={{
        drages,
        setDrages,
      }}
    >

      {children}

    </CustomerLayoutContext.Provider>
  );
}


export const useCustomerLayout = () =>
  useContext(CustomerLayoutContext);