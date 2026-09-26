import { useQuery } from "@tanstack/react-query";
import ProductService from "../service/ProductService";

export default function useGetAllProduct({page=1,perPage=10,search="",status=""}={}){
    const query=useQuery({
        queryKey:["product", page, perPage,search,status],
        queryFn: ()=>
        ProductService.GetAllProduct({
            params: { page, per_page: perPage,search,status },
        }) ,
        staleTime:0
    });
    return {
        query,
        product: query.data?.data?.data ?? [],
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