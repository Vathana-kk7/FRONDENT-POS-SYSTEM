import {
  createContext,
  useContext,
  useState,
} from "react";


const DashboardLayoutContext =
  createContext(null);


    export function DashboardLayoutProvider({
    children,
    }) {

  const [drage, setDrage] = useState(false);


  return (
    <DashboardLayoutContext.Provider
      value={{
        drage,
        setDrage,
      }}
    >

      {children}

    </DashboardLayoutContext.Provider>
  );
}


export const useDashboardLayout = () =>
  useContext(DashboardLayoutContext);