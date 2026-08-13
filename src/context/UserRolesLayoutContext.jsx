import { createContext, useContext, useState } from "react";

const UserRolesLayoutContext = createContext();

export function UserRolesLayoutProvider({ children }) {

  const [Opendrages, setOpenDrages] = useState(false);

  return (
    <UserRolesLayoutContext.Provider
      value={{
        Opendrages,
        setOpenDrages,
      }}
    >
      {children}
    </UserRolesLayoutContext.Provider>
  );
}


export const useUserRolesLayout = () =>
  useContext(UserRolesLayoutContext);