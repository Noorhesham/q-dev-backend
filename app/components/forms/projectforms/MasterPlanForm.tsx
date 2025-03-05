"use client";

import { z } from "zod";
import DynamicForm from "../DynamicForm";

const commonFields = [
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
  {
    name: "photo",
    label: "Master Plan Image",
    component: "photo",
    validation: z.string().min(1),
  },
];

export default function MasterPlanForm({ initialData, onSubmit }) {
  return (
    <DynamicForm
      title="Master Plan Section"
      fields={commonFields}
      onSubmit={onSubmit}
      defaultValues={
        initialData || {
          order: 0,
          content: "",
          photo: "",
        }
      }
    />
  );
}
