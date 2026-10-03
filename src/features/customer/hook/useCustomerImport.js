import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../utils/toast";
import CustomerService from "../service/CustomerService";

export default function useCustomerImport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CustomerService.importCustomers,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["customer-stats"],
      });
      const firstError = response?.errors
        ? Object.entries(response.errors).flatMap(([field, messages]) =>
            (Array.isArray(messages) ? messages : [messages]).map(
              (detail) => `${field}: ${detail}`
            )
          )[0]
        : null;
      const message = [response?.message || "Customers imported successfully.", firstError]
        .filter(Boolean)
        .join(" ");

      showToast(message, response?.skipped > 0 ? "warning" : "success");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Customer import failed.";
      const validationErrors = error?.response?.data?.errors;
      const firstError = validationErrors
        ? Object.entries(validationErrors).flatMap(([field, messages]) =>
            (Array.isArray(messages) ? messages : [messages]).map(
              (detail) => `${field}: ${detail}`
            )
          )[0]
        : null;

      showToast(firstError ? `${message} ${firstError}` : message, "error");
    },
  });
}
