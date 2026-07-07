import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
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
  loader: glob({ pattern: "**/*.md", base: "./src/content/documents" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  })
});

export const collections = {
  'projects': projectsCollection,
  'documents': documentsCollection,
};
