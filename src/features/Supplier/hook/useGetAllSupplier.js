import { useQuery } from "@tanstack/react-query";
import SupplierService from "../service/SupplierService";

export default function useGetAllSupplier({
  page = 1,
  perPage = 10,
  search = "",
  status = "",
} = {}) {
  const query = useQuery({
    queryKey: ["suppliers", page, perPage, search, status],
    queryFn: () =>
      SupplierService.getAll({
        page,
        per_page: perPage,
        search,
        status,
      }),
  });
  const pagination = query.data?.data?.data;
  const suppliers = Array.isArray(pagination?.data) ? pagination.data : [];

  return {
    suppliers,
    currentPage: pagination?.current_page ?? page,
    lastPage: pagination?.last_page ?? 1,
    total: pagination?.total ?? suppliers.length,
    from: pagination?.from ?? (suppliers.length > 0 ? (page - 1) * perPage + 1 : 0),
    to: pagination?.to ?? (page - 1) * perPage + suppliers.length,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}
