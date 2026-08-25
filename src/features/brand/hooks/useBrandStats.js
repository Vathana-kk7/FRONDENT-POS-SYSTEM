import { useQuery } from "@tanstack/react-query";
import BrandService from "../service/BrandService";

export default function useBrandStats() {
  const query = useQuery({
    queryKey: ["brand-stats"],
    queryFn: BrandService.getStats,
    staleTime: 0,
  });

  return {
    stats: query.data?.data ?? {
      total: 0,
      active: 0,
      inactive: 0,
      with_products: 0,
      growth: null,
    },

    isLoading: query.isLoading,
    isFetching: query.isFetching,
  };
}