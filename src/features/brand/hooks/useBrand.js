import { useQuery } from "@tanstack/react-query";
import BrandService from "../service/BrandService";

const useBrands = (params = {}) => {
  const query = useQuery({
    queryKey: ["brands", params],
    queryFn: () => BrandService.getAll(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });

  const pagination = query.data?.data;

  return {
    ...query,

    // ⭐ Actual brands array
    // brands: pagination?.data ?? [],
    brands: query.data?.data?.data ?? [],
    // ⭐ Pagination information
    currentPage: pagination?.current_page ?? 1,
    lastPage: pagination?.last_page ?? 1,
    total: pagination?.total ?? 0,
    from: pagination?.from ?? 0,
    to: pagination?.to ?? 0,
  };
};

export default useBrands;