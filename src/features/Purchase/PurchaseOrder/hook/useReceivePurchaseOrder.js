import { useMutation, useQueryClient } from "@tanstack/react-query";
import PurchaseService from "../service/PurchaseService";
import { showToast } from "../../../../utils/toast";

export function useReceivePurchaseOrder() {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: ({ id, items }) => PurchaseService.receiveStock(id, { items }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["purchase-orders"] }),
        queryClient.invalidateQueries({ queryKey: ["purchase-state"] }),
        queryClient.invalidateQueries({ queryKey: ["goods-received"] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
      ]);
      showToast("Goods received and stock updated successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error?.response?.data?.message || error?.message || "Receive failed.",
        "error"
      );
    },
  });
}