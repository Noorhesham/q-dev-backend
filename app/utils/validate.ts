import { z } from "zod";

export const commonFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    validation: z.string().optional(),
  },

  {
    name: "content",
    label: "Content",
    validation: z.string().min(10),
    component: "textarea",
  },
];
