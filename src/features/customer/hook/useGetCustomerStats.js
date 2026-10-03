import { useQuery } from "@tanstack/react-query";
import CustomerService from "../service/CustomerService";

export default function useGetCustomerStats() {
  return useQuery({
    queryKey: ["customer-stats"],
    queryFn: CustomerService.getStats,
  });
}
