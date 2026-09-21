import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService from "../service/ProductService";
import { showToast } from "../../../utils/toast";

export default function useCreateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ProductService.create,

    onSuccess: (res) => {
      // Refresh list products ឡើងវិញ
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
      queryClient.invalidateQueries({
        queryKey: ["brand-stats"],
      });
      queryClient.refetchQueries({
        queryKey: ["product-state"],
      });
      queryClient.invalidateQueries({
        queryKey: ["categoriesState"],
      });
      
      // បង្ហាញ Toast ពេល Success
      showToast("បង្កើត Product បានជោគជ័យ!", "success");
    },
    onError: (err) => {
      // បង្ហាញ Toast ពេល Error
      const errorMessage = err?.response?.data?.message || "មានបញ្ហាក្នុងការបង្កើត Products!";
      showToast(errorMessage, "error");
    },
  });

  return {
    CreateProduct: mutation.mutate,
    CreateProductAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
}