import { createContext, useContext, useState } from "react";

const PurchaseContext=createContext(null);
export function PurchaseProvider({children}){
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
      const [isViewOpen, setIsViewOpen] = useState(false);
      const [isEditOpen, setIsEditOpen] = useState(false);
      const [isAddOpen, setIsAddOpen] = useState(false);
    
      const [selectedPurchase, setSelectedPurchase] = useState(null);
    
      // ADD
      const openAdd = () => {
        setIsAddOpen(true);
      };
    
      const closeAdd = () => {
        setIsAddOpen(false);
      };
    
      // DELETE
      const openDelete = (product) => {
        setSelectedPurchase(product);
        setIsDeleteOpen(true);
      };
    
      const closeDelete = () => {
        setIsDeleteOpen(false);
        setSelectedPurchase(null);
      };
    
      // VIEW
      const openView = (product) => {
        setSelectedPurchase(product);
        setIsViewOpen(true);
      };
    
      const closeView = () => {
        setIsViewOpen(false);
        setSelectedPurchase(null);
      };
    
      // EDIT
      const openEdit = (product) => {
        setSelectedPurchase(product);
        setIsEditOpen(true);
      };
    
      const closeEdit = () => {
        setIsEditOpen(false);
        setSelectedPurchase(null);
      };
    
      return (
        <PurchaseContext.Provider
          value={{
            isAddOpen,
            isDeleteOpen,
            isViewOpen,
            isEditOpen,
    
            selectedPurchase,
    
            openAdd,
            closeAdd,
    
            openDelete,
            closeDelete,
    
            openView,
            closeView,
    
            openEdit,
            closeEdit,
          }}
        >
          {children}
        </PurchaseContext.Provider>
      );
}
export const usePurchase = () => {
  const context = useContext(PurchaseContext);

  if (!context) {
    throw new Error(
      "usePurchase must be used inside PurchaseProvider"
    );
  }

  return context;
};