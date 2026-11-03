import { useMutation, useQueryClient } from '@tanstack/react-query';
import PurchaseService from '../service/PurchaseService';
import { showToast } from '../../../../utils/toast';

export default function useCreatePurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => PurchaseService.create(data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['purchase-orders'],
            });
            queryClient.invalidateQueries({
                queryKey: ['purchase-state'],
            });
            showToast("Purchase order created successfully.", "success");
        },
        onError: (error) => {
      const validationErrors = error?.response?.data?.errors;
      let message = error?.response?.data?.message || error?.message || "Failed to create purchase order.";

      if (validationErrors) {
        const firstError = Object.values(validationErrors)[0];
        if (Array.isArray(firstError)) {
          message = firstError[0];
        }
      }

      showToast(message, "error");
    },
    });
}