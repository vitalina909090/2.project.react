import * as z from "zod";

export const LoginSchema = z
    .object({
        email: z.email().nonempty(),
        password: z.string().min(6).max(20).nonempty(),
    })

export type LoginData = z.infer<typeof LoginSchema>;
