import { z } from "zod";

export const createSpecialityZodSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required!" })
    .max(100, { message: "Title must be less than 100 characters" })
    .trim(),
});
