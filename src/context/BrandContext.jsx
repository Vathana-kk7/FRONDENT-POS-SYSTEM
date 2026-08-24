import { createContext, useContext, useState } from "react";

const BrandContext = createContext(null);

export function BrandProvider({ children }) {
  // =========================
  // ADD MODAL
  // =========================
  const [isAddOpen, setIsAddOpen] = useState(false);

  // =========================
  // EDIT MODAL
  // =========================
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // =========================
  // ADD
  // =========================
  const openAdd = () => {
    setIsAddOpen(true);
  };

  const closeAdd = () => {
    setIsAddOpen(false);
  };

  // =========================
  // EDIT
  // =========================
  const openEdit = (brand) => {
    setSelectedBrand(brand);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedBrand(null);
  };

  return (
    <BrandContext.Provider
      value={{
        // Add
        isAddOpen,
        openAdd,
        closeAdd,

        // Edit
        isEditOpen,
        openEdit,
        closeEdit,
        selectedBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrandContext() {
  const context = useContext(BrandContext);

  if (!context) {
    throw new Error(
      "useBrandContext must be used inside BrandProvider"
    );
  }

  return context;
}