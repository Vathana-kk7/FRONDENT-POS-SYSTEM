import { useMutation, useQueryClient } from "@tanstack/react-query";
import BrandService from "../service/BrandService";
import { showToast } from "../../../utils/toast";

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

    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      queryClient.invalidateQueries({
        queryKey: ["brand-stats"],
      });

      const successMessage =
        res?.data?.message ||
        res?.message ||
        "បង្កើត Brand ថ្មីបានជោគជ័យ!";

      showToast(successMessage, "success");
    },

    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "មានបញ្ហាក្នុងការបង្កើត Brand!";

      showToast(errorMessage, "error");
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