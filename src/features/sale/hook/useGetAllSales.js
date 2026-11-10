import { useQuery } from "@tanstack/react-query";
import SaleService from "../service/SaleService";

export default function useGetAllSales({
  page = 1,
  perPage = 20,
  search = "",
  dateFrom = "",
  dateTo = "",
  paymentStatus = "",
} = {}) {
  return useQuery({
    queryKey: ["sales", page, perPage, search, dateFrom, dateTo, paymentStatus],
    queryFn: () => SaleService.getAll({
      page,
      per_page: perPage,
      search,
      date_from: dateFrom,
      date_to: dateTo,
      payment_status: paymentStatus,
    }),
    placeholderData: (previousData) => previousData,
  });
}
