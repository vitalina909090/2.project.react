import * as z from "zod";

export const RegisterSchema = z
    .object({
        name: z.string().min(3, {message: "Мінімальна довжина 3 символи"}).max(20).nonempty(),
        email: z.email().nonempty(),
        password: z.string().min(6).max(20).nonempty(),
        repeatPassword: z.string().min(6).max(20).nonempty()
    })
    .refine(data => data.password === data.repeatPassword, {
        message: "Паролі не співпадають",
        path: ["repeatPassword"]
    });

export type RegisterData = z.infer<typeof RegisterSchema>;
