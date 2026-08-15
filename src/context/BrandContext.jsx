import { createContext, useContext, useState } from "react";

const BrandContext=createContext(null);

export function BrandProvider({children}){
    const [isAddOpen,setIsOpen]=useState(false);

    // openAdd
    const openAdd=()=>{
        setIsOpen(true);
    }
    //CloseAdd
    const closeAdd=()=>{
        setIsOpen(false);
    }
    return(
        <BrandContext.Provider
            value={{
                isAddOpen,
                openAdd,

                closeAdd
            }}
        >
        {children}
        </BrandContext.Provider>
    )

}

export function useBrandContext(){
    const context=useContext(BrandContext);
    if(!context){
        throw new Error (
            "useBrands must be used inside CategoryProvider"
        );
    }
    return context;
}