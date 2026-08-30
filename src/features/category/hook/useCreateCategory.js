import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";

export default function useCreateCategory(){
    const queryClient=useQueryClient();

    const mutation = useMutation({
        mutationFn:CategoryService.create,

        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:["category"],
                queryKey:["categoriesState"],
            });
        }
    })
    return{
        createCategory:mutation.mutate,
        createCategoryAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
        error: mutation.error,
    }
}