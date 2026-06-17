import z from "zod";

export const ArticleSchema = z
    .object({
        title: z.string().min(2, 'Мінімальна довжина 2 символи').max(30, 'Максимальна довжина 30 символів').nonempty(),
        content: z.string().min(2, 'Мінімальна довжина 2 символи').max(500, 'Максимальна довжина 500 символів').nonempty(),
    });

export type ArticleData = z.infer<typeof ArticleSchema>;