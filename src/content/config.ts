import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    tech: z.array(z.string()),
    featured: z.boolean().default(false),
    bentoSize: z.enum(["large", "medium", "small"]),
    image: z.string().optional(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    year: z.number(),
    order: z.number().default(0),
  }),
});

export const collections = { projects };
