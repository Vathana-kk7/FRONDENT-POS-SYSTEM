import { useMutation, useQueryClient } from "@tanstack/react-query";
import SupplierService from "../service/SupplierService";
import { showToast } from "../../../utils/toast";

export default function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => {
      if (!id) throw new Error("Supplier ID is required.");
      return SupplierService.delete(id);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["supplier-stats"] });
      showToast(response?.message || "Supplier deleted successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error?.response?.data?.message || error?.message || "Supplier deletion failed.",
        "error"
      );
    },
  });
}
