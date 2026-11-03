import { useMutation, useQueryClient } from "@tanstack/react-query";
import PurchaseService from "../service/PurchaseService";

export function useReceivePurchaseOrder() {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: ({ id, items }) => PurchaseService.receiveStock(id, { items }),
    onSuccess: () => {
      // refresh តារាង PO, card stats និងទំព័រ Products (stock ប្តូរ)
      queryClient.invalidateQueries({ queryKey: ["purchase"] });        // ← key ដូចក្នុង hook getAll របស់អ្នក
      queryClient.invalidateQueries({ queryKey: ["purchase-state"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });        // ← key ដូចក្នុង hook Product របស់អ្នក
      // toast.success("Stock received successfully");
    },
    onError: (error) => {
      // toast.error(error.response?.data?.message ?? "Receive failed");
      console.error("Receive error:", error);
    },
  });
}