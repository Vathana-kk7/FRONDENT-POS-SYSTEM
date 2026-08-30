import { useQuery } from "@tanstack/react-query";
import BrandService from "../service/BrandService";

const useBrands = ({
  page = 1,
  per_page = 10,
  search = "",
  status = "",
} = {}) => {

  const queryKey = [
    "brands",
    page,
    per_page,
    search,
    status,
  ];

  const query = useQuery({
    queryKey,
    queryFn: () =>
      BrandService.getAll({
        page,
        per_page,
        search,
        status,
      }),
    // refetchOnMount និង staleTime: 0 ជា Default ស្រាប់ហើយ មិនបាច់ដាក់ក៏បាន
  });

  const pagination = query.data?.data;
  const brands = pagination?.data ?? [];

  return {
    ...query,
    brands,
    currentPage: pagination?.current_page ?? 1,
    lastPage: pagination?.last_page ?? 1,
    total: pagination?.total ?? 0,
    from: pagination?.from ?? 0,
    to: pagination?.to ?? 0,
  };
};

export default useBrands;