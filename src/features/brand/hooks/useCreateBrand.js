import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import BrandService from "../service/BrandService";

const useCreateBrand = () => {
  const queryClient = useQueryClient();

  const {
    mutate,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: (data) => BrandService.create(data),

    onSuccess: async () => {

      // Update Brand Table
      await queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      // Update Brand Cards
      await queryClient.invalidateQueries({
        queryKey: ["brand-stats"],
      });
    },
  });

  return {
    createBrand: mutate,
    createBrandAsync: mutateAsync,

    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useCreateBrand;