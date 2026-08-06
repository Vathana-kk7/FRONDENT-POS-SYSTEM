import { createContext, useContext, useState } from "react";

const SaleOrderContext = createContext(null);

export function SaleOrderProvider({ children }) {

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // ADD
  const openAdd = () => {
    setIsAddOpen(true);
  };

  const closeAdd = () => {
    setIsAddOpen(false);
  };

  // DELETE
  const openDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setSelectedProduct(null);
  };

  // VIEW
  const openView = (product) => {
    setSelectedProduct(product);
    setIsViewOpen(true);
  };

  const closeView = () => {
    setIsViewOpen(false);
    setSelectedProduct(null);
  };

  // EDIT
  const openEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedProduct(null);
  };

  return (
    <SaleOrderContext.Provider
      value={{
        isAddOpen,
        isDeleteOpen,
        isViewOpen,
        isEditOpen,

        selectedProduct,

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
    </SaleOrderContext.Provider>
  );
}

export const useSaleOrder = () => {
  const context = useContext(SaleOrderContext);

  if (!context) {
    throw new Error(
      "useProduct must be used inside ProductProvider"
    );
  }

  return context;
};