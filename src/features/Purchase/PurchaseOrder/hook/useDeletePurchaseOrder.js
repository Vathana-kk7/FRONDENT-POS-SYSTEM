import { useMutation, useQueryClient } from '@tanstack/react-query';
import PurchaseService from '../service/PurchaseService';

export default function useDeletePurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => PurchaseService.delete(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['purchase-orders'],
            });
        },
    });
}