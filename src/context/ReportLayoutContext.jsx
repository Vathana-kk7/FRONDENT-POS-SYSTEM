import { createContext, useContext, useState } from "react";

const ReportLayoutContext = createContext();

export function ReportLayoutProvider({ children }) {

  const [Showdrag, setShowDrag] = useState(false);

  return (
    <ReportLayoutContext.Provider
      value={{
        Showdrag,
        setShowDrag,
      }}
    >
      {children}
    </ReportLayoutContext.Provider>
  );
}


export const useReportLayout = () =>
  useContext(ReportLayoutContext);