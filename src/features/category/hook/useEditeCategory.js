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
      // Refresh រាល់ Query ទាំងឡាយណាដែលមាន Key "category" (ធ្វើឲ្យ Table ទាញយកទិន្នន័យថ្មី)
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },

    // ដំណាក់កាលមាន Error
    onError: (error) => {
      console.error("Category update failed:", error.response?.data || error.message);
    },
  });
}