import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";
import { showToast } from "../../../utils/toast";

export const useCategoryImport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => CategoryService.importCategory(file),

    onSuccess: async (data) => {
      // 1. Invalidate គ្រប់ Query ទាំងអស់ដែលផ្ដើមដោយឈ្មោះ "category" ឬ "categories"
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "category" || query.queryKey[0] === "categories",
      });

      // 2. Refresh Category Stats
      await queryClient.invalidateQueries({
        queryKey: ["categoriesState"],
      });0

      showToast(
        data?.message || "ការបញ្ចូលទិន្នន័យ Category បានជោគជ័យ!",
        "success"
      );
    },

    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "មានបញ្ហាក្នុងការ Import File!";

      console.error("Category import error:", error);
      showToast(errorMessage, "error");
    },
  });
};