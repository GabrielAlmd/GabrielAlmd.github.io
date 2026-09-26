import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    status: z.enum(['planned', 'in-progress', 'complete', 'maintained', 'archived']),
    featured: z.boolean().default(false),
    technologies: z.array(z.string()).default([]),
    category: z.string().min(1),
    repositoryUrl: z.url().optional(),
    externalUrl: z.url().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const challenges = defineCollection({
  loader: glob({
    base: './src/content/challenges',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    technologies: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    confidentiality: z.enum(['public', 'anonymized-professional']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, challenges };
