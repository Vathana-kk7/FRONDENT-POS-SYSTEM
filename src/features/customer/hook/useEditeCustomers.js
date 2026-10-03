import { useMutation, useQueryClient } from "@tanstack/react-query";
import CustomerService from "../service/CustomerService";
import { showToast } from "../../../utils/toast";

export default function useEditeCustomers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      if (!id) {
        throw new Error("Customer ID is required");
      }

      if (!data) {
        throw new Error("Customer data is required");
      }

      return await CustomerService.update(id, data);
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["customer-stats"],
      });

      showToast(
        response?.message || "កែប្រែ Customer បានជោគជ័យ!",
        "success"
      );
    },

    onError: (error) => {
      console.error("Update Customer Error:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "ការកែប្រែ Customer បរាជ័យ!";

      showToast(message, "error");
    },
  });
}
