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
};
