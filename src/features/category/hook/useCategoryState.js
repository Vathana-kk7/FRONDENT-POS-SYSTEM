import { useQuery } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";

export default function useCategoryState(){
    const query=useQuery({
        queryKey:["categoriesState"],
        queryFn:CategoryService.state,
        staleTime:0
    });
    return {
        stats:query.data?.data??{
            total:0,
            active:0,
            inactive:0,
            with_product:0,
            growth:null
        },
        isLoading: query.isLoading,
        isFetching: query.isFetching,
    };
}