import { useMutation, useQueryClient } from "@tanstack/react-query";
import SupplierService from "../service/SupplierService";
import { showToast } from "../../../utils/toast";

export default function useCreateSupplier() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: SupplierService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["supplier-stats"] });
      showToast("Supplier created successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error?.response?.data?.message || error?.message || "Supplier creation failed.",
        "error"
      );
    },
  });

  return {
    createSupplier: mutation.mutate,
    createSupplierAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}
