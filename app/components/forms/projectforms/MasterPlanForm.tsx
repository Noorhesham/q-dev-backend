"use client";

import { z } from "zod";
import DynamicForm from "../DynamicForm";
import { commonFields } from "@/app/utils/validate";

export default function MasterPlanForm({ initialData, onSubmit }: { initialData?: any; onSubmit: any }) {
  return (
    <DynamicForm
      title="Master Plan Section"
      fields={[
        ...commonFields,
        {
          name: "photo",
          label: "Master Plan Image",
          component: "photo",
          validation: z.string().min(1),
        },
        {
          name: "background",
          label: "Background Image",
          component: "photo",
          validation: z.string().min(1),
        },
        {
          name: "plans",
          label: "Master Plan List",
          validation: z.array(z.string()),
          component: "photo",
        },
      ]}
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
