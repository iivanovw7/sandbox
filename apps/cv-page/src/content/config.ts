import { defineCollection, z } from 'astro:content';

export const collections = {
    'blog': defineCollection({
        schema: z.object({
            author: z.string().default('Anonymous'),
            body: z.custom(),
            cover: z.string().optional(),
            date: z.date(),
            description: z.string(),
            draft: z.boolean(),
            tags: z.array(z.string()),
            title: z.string(),
        }),
    }),
    'jobs': defineCollection({
        schema: z.object({
            company: z.string(),
            date: z.date(),
            endDate: z.nullable(z.date()),
            icon: z.string(),
            lang: z.string(),
            location: z.string(),
            role: z.string(),
            startDate: z.nullable(z.date()),
            title: z.string(),
        }),
    })
};
