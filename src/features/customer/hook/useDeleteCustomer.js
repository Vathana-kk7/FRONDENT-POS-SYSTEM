import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../utils/toast";
import CustomerService from "../service/CustomerService";

export default function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      if (!id) {
        throw new Error("Customer ID is required");
      }

      return await CustomerService.delete(id);
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["customers"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["customer-stats"],
      });

      showToast(response?.message || "លុប Customer បានជោគជ័យ!", "success");
    },
    onError: (error) => {
      console.error("Customer delete failed:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "ការលុប Customer បរាជ័យ!";

      showToast(message, "error");
    },
  });
}
