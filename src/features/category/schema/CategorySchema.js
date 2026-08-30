import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Brand name is required")
    .min(2, "Brand name must be at least 2 characters"),
  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
});