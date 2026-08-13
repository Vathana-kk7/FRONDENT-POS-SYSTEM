import { createContext, useContext, useState } from "react";

const UserAllLayoutContext = createContext();

export function UserAllLayoutProvider({ children }) {

  const [Opendrag, setOpenDrag] = useState(false);

  return (
    <UserAllLayoutContext.Provider
      value={{
        Opendrag,
        setOpenDrag,
      }}
    >
      {children}
    </UserAllLayoutContext.Provider>
  );
}


export const useUserAllLayout = () =>
  useContext(UserAllLayoutContext);