import { createContext, useContext, useState } from "react";

const GoodReceivedLayoutContext = createContext();

export function GoodReceivedLayoutProvider({ children }) {

  const [dragcart, setDragcart] = useState(false);

  return (
    <GoodReceivedLayoutContext.Provider
      value={{
        dragcart,
        setDragcart,
      }}
    >
      {children}
    </GoodReceivedLayoutContext.Provider>
  );
}


export const useGoodReceivedLayout = () =>
  useContext(GoodReceivedLayoutContext);