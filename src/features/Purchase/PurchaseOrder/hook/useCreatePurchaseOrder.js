import { useMutation, useQueryClient } from '@tanstack/react-query';
import PurchaseService from '../service/PurchaseService';

export default function useCreatePurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => PurchaseService.create(data),

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['purchase-orders'],
            });
        },
    });
}