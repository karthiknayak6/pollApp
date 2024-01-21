import { z } from "zod";

export const registerSchema = z
  .object({
    f_name: z.string().min(2, "First name must be at least 2 characters"),
    l_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 10 characters"),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
