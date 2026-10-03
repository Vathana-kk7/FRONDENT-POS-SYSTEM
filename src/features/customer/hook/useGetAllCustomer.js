import { useQuery } from "@tanstack/react-query"
import CustomerService from "../service/CustomerService"

export default function useGetAllCustomer() {
    const query = useQuery({
        queryKey: ["customers"],
        queryFn: ()=> CustomerService.getAll(),
    })
    return {
        Customer: query.data?.data?.data ?? [],
        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
    }
};