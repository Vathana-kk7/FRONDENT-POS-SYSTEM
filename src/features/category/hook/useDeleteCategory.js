import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return await CategoryService.delete(id);
    },

    onSuccess: async () => {
      // 1. Invalidate Category Table Queries (រួមទាំង pagination/search)
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "category" || query.queryKey[0] === "categories",
      });

      // 2. Invalidate Category Stats
      await queryClient.invalidateQueries({
        queryKey: ["categoriesState"],
      });
    },

    onError: (error) => {
      console.error(
        "Category delete failed:",
        error.response?.data || error.message
      );
    },
  });
}