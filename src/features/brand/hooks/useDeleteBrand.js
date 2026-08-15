import { useMutation, useQueryClient } from "@tanstack/react-query";
import BrandService from "../service/BrandService";

const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => BrandService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
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