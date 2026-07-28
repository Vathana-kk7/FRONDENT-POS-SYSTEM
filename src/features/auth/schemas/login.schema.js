import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "សូមបញ្ចូលអ៊ីមែល")
    .email("ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវទេ"),
  password: z
    .string()
    .min(1, "សូមបញ្ចូលពាក្យសម្ងាត់")
    .min(6, "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ ខ្ទង់"),
});