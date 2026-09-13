import { z } from "zod";

const requiredNumber = (message, options = {}) =>
  z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      const number = Number(value);

      return Number.isNaN(number) ? value : number;
    },
    z
      .number({
        error: message,
      })
      .finite("Must be a valid number")
      .refine(
        (value) => value >= 0,
        options.minMessage || "Must be greater than or equal to 0"
      )
      .refine(
        (value) => !options.integer || Number.isInteger(value),
        options.integerMessage || "Must be a whole number"
      )
  );

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(255, "Product name must not exceed 255 characters"),

  sku: z
    .string()
    .trim()
    .min(1, "SKU is required")
    .max(100, "SKU must not exceed 100 characters"),

  category_id: z.union([
    z.string().min(1, "Category is required"),
    z.number().positive("Category is required"),
  ]),

  brand_id: z.union([
    z.string().min(1, "Brand is required"),
    z.number().positive("Brand is required"),
  ]),

  status: z.enum(["active", "inactive"], {
    error: "Status is required",
  }),

  product_type: z
    .string()
    .trim()
    .min(1, "Product type is required")
    .max(100, "Product type must not exceed 100 characters"),

  selling_price: requiredNumber("Selling price is required", {
    minMessage: "Selling price must be greater than or equal to 0",
  }),

  cost_price: requiredNumber("Cost price is required", {
    minMessage: "Cost price must be greater than or equal to 0",
  }),

  stock_qty: requiredNumber("Stock quantity is required", {
    minMessage: "Stock quantity must be greater than or equal to 0",
    integer: true,
    integerMessage: "Stock quantity must be a whole number",
  }),

  min_stock_level: requiredNumber("Low stock alert is required", {
    minMessage: "Low stock alert must be greater than or equal to 0",
    integer: true,
    integerMessage: "Low stock alert must be a whole number",
  }),

  description: z
    .string()
    .trim()
    .max(1000, "Description must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  image: z.any().optional(),
});