import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    media: z.object({
      type: z.enum(['image', 'video']),
      url: z.string(),
      thumbnail: z.string().optional(),
    }),
    date: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    link: z.string().optional(),
  })
});

const documentsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    image: z.string().optional(), // Nuevo campo de imagen
  })
});

export const collections = {
  'projects': projectsCollection,
  'documents': documentsCollection,
};