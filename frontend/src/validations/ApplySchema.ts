import z from "zod";

export const ApplySchema = z.object({
    firstName: z.string().min(2, 'Мінімальна довжина 2 символи').max(30, 'Максимальна довжина 30 символів').regex(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/, 'Використовуйте тільки літери'),
    lastName: z.string().min(2, 'Мінімальна довжина 2 символи').max(30, 'Максимальна довжина 30 символів').regex(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/, 'Використовуйте тільки літери'),
    email: z.email(),
    phone: z.string().regex(/^\+380\d{9}$/, "Формат має бути +380XXXXXXXXX"),
    birthDate: z.coerce.date().refine((date) => {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 60, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
        return date >= minDate && date <= maxDate;
    }, "Вам має бути від 16 до 60 років"),
    position: z.enum(["frontend", "backend", "fullstack", "design"]),
    experience: z.enum(["none", "less1", "1to3", "3plus"]),
    skills: z.array(z.string()).min(1, 'Оберіть хоча б одну технологію').max(4, 'Максимум 4 технології'),
    salaryExpected: z.coerce.number().min(5000, 'Мінімум 5 000 грн').max(200000, 'Максимум 200 000 грн').optional(),
    startDate: z.coerce.date().min(new Date(), "Дата початку роботи не може бути в минулому").optional(),
    portfolioUrl: z.url().optional().or(z.literal('')),
    coverLetter: z.string().max(1000, "Максимум 1000 символів").refine(
        (val) => val === "" || val.length >= 50,
        "Якщо заповнюєте - мінімум 50 символів"
    ).optional(),
    agreeToTerms: z.literal(true, {
        message: "Необхідно погодитись з умовами"
    }),
});

export type ApplyData = z.infer<typeof ApplySchema>