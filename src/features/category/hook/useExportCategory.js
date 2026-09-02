import { useMutation } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";

export function useExportCategory(){
    const mutation=useMutation({
        mutationFn:({type,filters})=>
            CategoryService.exportCategory(
                type,
                filters,
            ),
    })
    return {
        exportCategory:mutation.mutateAsync,
        isExporting:mutation.isPending,
    }
}