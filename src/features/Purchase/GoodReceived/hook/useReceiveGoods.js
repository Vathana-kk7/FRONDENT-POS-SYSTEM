import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../../utils/toast";
import GoodReceivedService from "../service/GoodReceivedService";

export default function useReceiveGoods() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GoodReceivedService.receive,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["goods-received"] }),
        queryClient.invalidateQueries({ queryKey: ["purchase-orders"] }),
        queryClient.invalidateQueries({ queryKey: ["purchase-state"] }),
        queryClient.invalidateQueries({ queryKey: ["products"] }),
      ]);
      showToast("Goods received and stock updated successfully.", "success");
    },
    onError: (error) => {
      showToast(
        error?.response?.data?.message || error?.message || "Goods receipt failed.",
        "error"
      );
    },
  });
}
