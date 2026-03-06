import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().trim().min(1, "Email address is required.").email("Invalid email address"),
    password: z.string().min(4, "Password must be atleast 4 charchters").regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password and password does not match",
    path: ["confirmPassword"]
})

export type RegisterSchema = z.infer<typeof registerSchema>;