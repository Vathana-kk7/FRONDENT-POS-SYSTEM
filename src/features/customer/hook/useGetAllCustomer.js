import { useQuery } from "@tanstack/react-query"
import CustomerService from "../service/CustomerService"

export default function useGetAllCustomer({
    page = 1,
    perPage = 10,
    search = "",
    status = "",
} = {}) {
    const query = useQuery({
        queryKey: ["customers", page, perPage, search, status],
        queryFn: () => CustomerService.getAll({
            page,
            per_page: perPage,
            search,
            status,
        }),
    })
    const pagination = query.data?.data?.data
    const customers = Array.isArray(pagination?.data)
        ? pagination.data
        : Array.isArray(pagination)
            ? pagination
            : []

    return {
        Customer: customers,
        currentPage: pagination?.current_page ?? page,
        lastPage: pagination?.last_page ?? 1,
        total: pagination?.total ?? customers.length,
        from: pagination?.from ?? (customers.length > 0 ? (page - 1) * perPage + 1 : 0),
        to: pagination?.to ?? (page - 1) * perPage + customers.length,
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
    }
};