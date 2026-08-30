import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryService from "../service/CategoryService";

export default function useEditCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    // Mutation Function ដែលទទួល id និង data មកកែប្រែ
    mutationFn: async ({ id, data }) => {
      return await CategoryService.update(id, data);
    },

    // ដំណាក់កាលជោគជ័យ
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["categoriesState"],
      });
    },

    // ដំណាក់កាលមាន Error
    onError: (error) => {
      console.error("Category update failed:", error.response?.data || error.message);
    },
  });
}