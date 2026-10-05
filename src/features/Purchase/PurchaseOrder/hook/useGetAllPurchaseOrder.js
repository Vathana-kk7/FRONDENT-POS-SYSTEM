import { useQuery } from '@tanstack/react-query';
import PurchaseService from '../service/PurchaseService';

export default function useGetAllPurchaseOrder() {
    return useQuery({
        queryKey: ['purchase-orders'],
        queryFn: PurchaseService.getAll,
    });
}