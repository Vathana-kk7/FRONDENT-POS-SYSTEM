import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    // កែត្រង់នេះ៖ ទទួល id ដោយផ្ទាល់
    mutationFn: async (id) => {
      return await CategoryService.delete(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },

    onError: (error) => {
      console.error("Category delete failed:", error.response?.data || error.message);
    },
  });
}