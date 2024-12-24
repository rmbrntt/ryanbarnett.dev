import { defineCollection, z } from "astro:content";

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  tags: z.array(z.string()).default([]),
  systemReveal: z.boolean().default(false),
  readingTime: z.string().optional(),
  minutesRead: z.number().optional(),
  wordCount: z.number().optional(),
  authors: z.array(z.string()).default(["Ryan Barnett"]),
  layout: z.string().optional(),
});

const thoughts = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    type: z.enum(["essay", "note", "exploration"]).default("note"),
    status: z.enum(["seed", "growing", "evergreen"]).default("seed"),
    connections: z.array(z.string()).default([]),
  }),
});

const papers = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    type: z.enum(["research", "whitepaper", "case-study"]).default("research"),
    status: z.enum(["draft", "review", "published"]).default("draft"),
    citations: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          authors: z.array(z.string()),
          year: z.number(),
        })
      )
      .default([]),
  }),
});

const notes = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    type: z.enum(["quick", "detailed", "reference"]).default("quick"),
    category: z
      .enum(["technical", "concept", "observation"])
      .default("observation"),
    links: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    status: z
      .enum(["concept", "in-progress", "completed", "archived"])
      .default("concept"),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
  }),
});

const lab = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    type: z
      .enum(["experiment", "prototype", "visualization"])
      .default("experiment"),
    interactive: z.boolean().default(true),
    technologies: z.array(z.string()).default([]),
  }),
});

export const collections = {
  thoughts,
  papers,
  notes,
  projects,
  lab,
};
