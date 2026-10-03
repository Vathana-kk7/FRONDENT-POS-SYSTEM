import { useMutation, useQueryClient } from "@tanstack/react-query";
import SupplierService from "../service/SupplierService";
import { showToast } from "../../../utils/toast";

export default function useEditSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => {
      if (!id) throw new Error("Supplier ID is required.");
      if (!data) throw new Error("Supplier data is required.");
      return SupplierService.update({ id, data });
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["supplier-stats"] });
      showToast(response?.message || "Supplier updated successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error?.response?.data?.message || error?.message || "Supplier update failed.",
        "error"
      );
    },
  });
}
