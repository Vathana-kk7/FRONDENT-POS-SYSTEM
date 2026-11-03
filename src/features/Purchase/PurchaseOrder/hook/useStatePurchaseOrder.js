import { useQuery } from "@tanstack/react-query";
import PurchaseService from "../service/PurchaseService";

export default function useStatePurchaseOrder() {
    return useQuery({
        queryKey:["purchase-state"],
        queryFn:PurchaseService.getstate,
        staleTime: 0,
        select: (res) => res.data,
    })
}