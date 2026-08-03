import { createContext, useContext, useState } from "react";

const CustomerContext = createContext(null);

export function CustomerProvider({ children }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // ADD
  const openAdd = () => {
    setIsAddOpen(true);
  };

  const closeAdd = () => {
    setIsAddOpen(false);
  };

  // DELETE
  const openDelete = (item) => {
    setSelectedCategory(item);
    setIsDeleteOpen(true);
  };

  const closeDelete = () => {
    setIsDeleteOpen(false);
    setSelectedCategory(null);
  };

  // VIEW
  const openView = (item) => {
    setSelectedCategory(item);
    setIsViewOpen(true);
  };

  const closeView = () => {
    setIsViewOpen(false);
    setSelectedCategory(null);
  };

  // EDIT
  const openEdit = (item) => {
    setSelectedCategory(item);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedCategory(null);
  };

  return (
    <CustomerContext.Provider
      value={{
        isAddOpen,
        isDeleteOpen,
        isViewOpen,
        isEditOpen,
        selectedCategory,

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
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);

  if (!context) {
    throw new Error(
      "useCategory must be used inside CategoryProvider"
    );
  }

  return context;
}