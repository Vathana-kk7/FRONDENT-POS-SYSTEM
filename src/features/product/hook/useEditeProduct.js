
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService from "../service/ProductService";
import { showToast } from "../../../utils/toast";

export default function useEditeProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }) => {
            if (!id) {
                throw new Error("Product ID is required");
            }
            if (!data) {
                throw new Error("Product data is required");
            }
            return await ProductService.update(id, data);
        },

        onSuccess: (response) => {
            console.log("Update Product Response:", response);

            // Refresh Product List
            queryClient.invalidateQueries({
                queryKey: ["product"],
            });
            // Refresh Category if product count/stat depends on it
            queryClient.invalidateQueries({
                queryKey: ["category"],
            });
            queryClient.invalidateQueries({
                queryKey: ["product-state"],
            });
            showToast(
                response?.message || "កែប្រែ Product បានជោគជ័យ!",
                "success"
            );
        },
        onError: (error) => {
            console.error("Update Product Error:", error);
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "ការកែប្រែ Product បរាជ័យ!";
            showToast(message, "error");
        },
    });
}

