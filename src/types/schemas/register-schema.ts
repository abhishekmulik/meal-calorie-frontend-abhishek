import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: z.string().trim().min(1, "Email address is required.").email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 charchters"),
    confirmPassword: z.string()}).refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password and password does not match",
    path: ["confirmPassword"]
})

export type RegisterSchema = z.infer<typeof registerSchema>;