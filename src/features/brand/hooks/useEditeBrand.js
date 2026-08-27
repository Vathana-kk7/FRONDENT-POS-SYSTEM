import { useMutation, useQueryClient } from "@tanstack/react-query";
import BrandService from "../service/BrandService";

const useEditBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => BrandService.update(id, data),

    onSuccess: () => {
      //Update Brand Table
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      //Update Brand-State 
      queryClient.invalidateQueries({
        queryKey: ["brand-stats"],
      });
    },

    onError: (error) => {
      console.error(
        "Update brand failed",
        error.response?.data || error
      );
    },
  });
};

export default useEditBrand;