import { useMutation, useQueryClient } from "@tanstack/react-query"
import ProductService from "../service/ProductService";
import { showToast } from "../../../utils/toast";

export const useProductImport=()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(file)=>ProductService.importProduct(file),

        onSuccess:(data)=>{
            showToast(
                data?.message || "ការបញ្ចូលទន្ន័យ Product បានជោគជ័យ!",
                "success"
            );
        },
        onError:(error)=>{
            const errorMessage=error?.response?.data?.message || "មានបញ្ហាក្នុងការ Import File!";
            console.error("Category import error:", error);
            showToast(errorMessage, "error");
        }
    })
}