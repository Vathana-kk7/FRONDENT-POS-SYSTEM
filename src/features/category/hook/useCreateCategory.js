import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";
import { showToast } from "../../../utils/toast";

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: CategoryService.create,

    onSuccess: async () => {
      // Refresh Category Table
      await queryClient.invalidateQueries({
        queryKey: ["category"],
        exact: false,
      });

      // Refresh Category State / Stats
      await queryClient.invalidateQueries({
        queryKey: ["categoriesState"],
        exact: false,
      });
      
        showToast("បង្កើត Category ថ្មីបានជោគជ័យ!", "success");
    },
  });

  return {
    createCategory: mutation.mutate,
    createCategoryAsync: mutation.mutateAsync,

    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,

    error: mutation.error,
  };
}