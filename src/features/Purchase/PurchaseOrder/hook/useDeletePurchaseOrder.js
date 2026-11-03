import { useMutation, useQueryClient } from "@tanstack/react-query";
import PurchaseService from "../service/PurchaseService"; // កែ path ឱ្យត្រូវនឹងទីតាំង file PurchaseService
import { showToast } from "../../../../utils/toast";

export default function useDeletePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => PurchaseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['purchase-state'],});
      queryClient.invalidateQueries({ queryKey: ["purchase-orders"] }); // ត្រូវដូច useGetAllPurchaseOrder
      showToast("Purchase order deleted successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Failed to delete purchase order.",
        "error"
      );
    },
  });
}