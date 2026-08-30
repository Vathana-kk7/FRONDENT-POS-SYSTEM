import { useQuery } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";

export default function useGetAllCategory({page=1,perPage=10,search="",status=""}={}){
    const query = useQuery({
        queryKey: ["category", page, perPage,search,status],
        queryFn: () =>
            CategoryService.getAll({
            page,
            per_page: perPage,
            search,
            status
        }),
        staleTime:0,
    })
    return {
        query,

        //Category array 
        category:query.data?.data?.data ?? [],

        //Pagination
        currentPage:query.data?.data?.current_page??1,
        lastPage: query.data?.data?.last_page ?? 1,
        total: query.data?.data?.total ?? 0,
        from: query.data?.data?.from ?? 0,
        to: query.data?.data?.to ?? 0,

        isLoading: query.isLoading,
        isFetching: query.isFetching,
        isError: query.isError,
    }
}