import { z } from "zod";

export const commonFields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    validation: z.string().optional(),
  },
  {
    name: "order",
    label: "Order",
    type: "number",
    validation: z.union([z.string().min(1), z.number().min(0)]),
  },
  {
    name: "content",
    label: "Content",
    validation: z.string().min(10),
    component: "textarea",
  },
];
