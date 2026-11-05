import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../../utils/toast";
import PurchaseService from "../service/PurchaseService";

export default function useCreatePurchasePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ purchaseId, data }) => PurchaseService.createPayment(purchaseId, data),
    onSuccess: async (_, { purchaseId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["purchase-orders"] }),
        queryClient.invalidateQueries({ queryKey: ["purchase-order", purchaseId] }),
        queryClient.invalidateQueries({ queryKey: ["purchase-state"] }),
      ]);
      showToast("Payment recorded successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error?.response?.data?.message || error?.message || "Failed to record payment.",
        "error"
      );
    },
  });
}
