import { useMutation } from "@tanstack/react-query";
import ProductService from "../service/ProductService";

export function useExportProduct(){
    const mutation=useMutation({
        mutationFn:({type,filter})=>
            ProductService.exportProduct(
                type,
                filter,
            ),
    })
    return {
        exportProduct:mutation.mutateAsync,
        isExporting:mutation.isPending,
    }

}