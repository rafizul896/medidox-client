/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(6, {
        error: "Password is required and must be at least 6 characters long",
      })
      .max(100, {
        error: "Password must be at most 100 characters long",
      }),
    confirmPassword: z.string().min(6, {
      error:
        "Confirm Password is required and must be at least 6 characters long",
    }),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    error: "Password does not match",
    path: ["confirmPassword"],
  });

export const loginValidationZodSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
