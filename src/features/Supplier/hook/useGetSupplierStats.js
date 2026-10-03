import { useQuery } from "@tanstack/react-query";
import SupplierService from "../service/SupplierService";

export default function useGetSupplierStats() {
  return useQuery({
    queryKey: ["supplier-stats"],
    queryFn: SupplierService.getStats,
  });
}
