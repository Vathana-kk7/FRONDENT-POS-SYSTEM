import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
];

export const importCategorySchema = z.object({
  file: z
    .custom(
      (val) => val instanceof FileList,
      "សូមជ្រើសរើស File ឱ្យបានត្រឹមត្រូវ"
    )
    .refine(
      (files) => files?.length === 1,
      "សូមជ្រើសរើស File មួយ"
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "ទំហំ File មិនអាចលើសពី 5MB ឡើយ"
    )
    .refine(
      (files) =>
        ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "អនុញ្ញាតតែ File (.xlsx, .xls, .csv) ប៉ុណ្ណោះ"
    ),
});