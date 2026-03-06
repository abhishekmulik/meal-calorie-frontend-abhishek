import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().min(1, "Email address is required.").email("Invalid email address"),
    password: z.string().min(1,"Password is required.")

})
export type LoginSchema = z.infer<typeof loginSchema>;