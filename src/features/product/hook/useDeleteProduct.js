import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../../../utils/toast";
import ProductService from "../service/ProductService";

export default function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            return await ProductService.delete(id);
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
            queryClient.invalidateQueries({ queryKey: ["product-state"] });
            showToast(response?.message || "លុប Product បានជោគជ័យ!", "success");
        },
        onError: (error) => {
            const message = error?.response?.data?.message || "ការលុប Product បរាជ័យ!";
            showToast(message, "error");
        },
    });
}