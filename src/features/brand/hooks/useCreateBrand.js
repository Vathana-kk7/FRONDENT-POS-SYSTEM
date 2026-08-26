import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import BrandService from "../service/BrandService";
import { showToast } from "../../../utils/toast"; // ✅ 1. Uncomment line នេះ

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

    // ✅ 2. ចាប់យក data ពី response របស់ API
    onSuccess: async (data) => {
      // Update Brand Table
      await queryClient.invalidateQueries({
        queryKey: ["brands"],
      });

      // Update Brand Cards
      await queryClient.invalidateQueries({
        queryKey: ["brand-stats"],
      });

      // ✅ 3. បង្ហាញ Toast Slide ពីស្តាំទៅឆ្វេង ពេលបង្កើត Brand ជោគជ័យ
      showToast(data?.message || 'បង្កើត Brand ថ្មីបានជោគជ័យ!', 'success');
    },

    // ✅ 4. បន្ថែម onError ដើម្បីបង្ហាញ Toast ពេលមានបញ្ហា/Error
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'មានបញ្ហាក្នុងការបង្កើត Brand!';
      showToast(errorMessage, 'error');
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