import {
  createContext,
  useContext,
  useState,
} from "react";


const CategoryLayoutContext =
  createContext(null);


export function CategoryLayoutProvider({
  children,
}) {

  const [drag, setDrag] = useState(false);


  return (
    <CategoryLayoutContext.Provider
      value={{
        drag,
        setDrag,
      }}
    >

      {children}

    </CategoryLayoutContext.Provider>
  );
}


export const useCategoryLayout = () =>
  useContext(CategoryLayoutContext);