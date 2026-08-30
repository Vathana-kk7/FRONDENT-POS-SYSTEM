import { useMutation, useQueryClient } from "@tanstack/react-query";
import BrandService from "../service/BrandService";

const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => BrandService.delete(id),

    onSuccess: async () => {
      // ប្រើ await ដើម្បីប្រាកដថា Refetch ចប់សព្វគ្រប់
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["brands"] }),
        queryClient.invalidateQueries({ queryKey: ["brand-stats"] }),
      ]);
    },

    onError: (error) => {
      console.error(
        "Delete brand failed:",
        error.response?.data || error
      );
    },
  });
};

export default useDeleteBrand;