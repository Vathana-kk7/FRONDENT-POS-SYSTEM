import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../utils/toast";
import SaleService from "../service/SaleService";

export default function useCreateSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SaleService.create,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["sales"] }),
        queryClient.invalidateQueries({ queryKey: ["product"] }),
        queryClient.invalidateQueries({ queryKey: ["product-state"] }),
      ]);
      showToast("Sale completed successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error?.response?.data?.message || error?.message || "Sale could not be completed.",
        "error"
      );
    },
  });
}
