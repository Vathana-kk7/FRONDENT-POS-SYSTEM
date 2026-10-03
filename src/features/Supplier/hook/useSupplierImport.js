import { useMutation, useQueryClient } from "@tanstack/react-query";
import SupplierService from "../service/SupplierService";
import { showToast } from "../../../utils/toast";

export default function useSupplierImport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SupplierService.import,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      await queryClient.invalidateQueries({ queryKey: ["supplier-stats"] });
      const firstError = response?.errors
        ? Object.entries(response.errors).flatMap(([row, messages]) =>
            (Array.isArray(messages) ? messages : [messages]).map(
              (message) => `${row}: ${message}`
            )
          )[0]
        : null;
      const message = [
        response?.message || "Suppliers imported successfully.",
        firstError,
      ]
        .filter(Boolean)
        .join(" ");

      showToast(message, response?.skipped > 0 ? "warning" : "success");
    },
    onError: (error) => {
      const firstError = error?.response?.data?.errors
        ? Object.entries(error.response.data.errors).flatMap(([row, messages]) =>
            (Array.isArray(messages) ? messages : [messages]).map(
              (message) => `${row}: ${message}`
            )
          )[0]
        : null;
      const message =
        error?.response?.data?.message || error?.message || "Supplier import failed.";

      showToast(firstError ? `${message} ${firstError}` : message, "error");
    },
  });
}
