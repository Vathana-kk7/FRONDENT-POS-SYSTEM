
import { useQuery } from "@tanstack/react-query";
import ProductService from "../service/ProductService";

export default function useProductState() {
  const query = useQuery({
    queryKey: ["product-state"],
    queryFn: ProductService.state,
    staleTime: 0,
  });

  const apiResponse = query?.data?.data ?? {};

  /*
   * Extract actual statistics
   */
  const statsData = apiResponse?.data ?? {};

  const result = {
    state: statsData,

    total_products: Number(
      statsData.total_products ?? 0
    ),

    low_stock: Number(
      statsData.low_stock ?? 0
    ),

    out_of_stock: Number(
      statsData.out_of_stock ?? 0
    ),

    total_value: Number(
      statsData.total_value ?? 0
    ),

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };

  return result;
}

