import { useMutation, useQueryClient } from '@tanstack/react-query';
import PurchaseService from '../service/PurchaseService';

export default function useEditPurchaseOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) =>
            PurchaseService.update(id, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ['purchase-state'],});
            queryClient.invalidateQueries({queryKey: ['purchase-orders'],});

            queryClient.invalidateQueries({
                queryKey: ['purchase-order', variables.id],
            });
        },
    });
}