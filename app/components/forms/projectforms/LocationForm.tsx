"use client";

import { z } from "zod";
import ArrayFields from "./ArrayFields";
import DynamicForm from "../DynamicForm";
import { LocationSection } from "@/app/types";
import { commonFields } from "@/app/utils/validate";

const formConfig = {
  fields: [
    ...commonFields,
    {
      name: "background",
      label: "Background",
      component: "photo",
      validation: z.string().min(1),
    },
    {
      name: "numbers",
      label: "Special Numbers",
      component: "array",
      validation: z.array(
        z.object({
          number: z.union([z.string().min(1), z.number().min(0)]),
          title: z.string().min(2),
          prefix: z.string().min(1),
          video: z.string().min(1),
        })
      ),
    },
  ],
  defaultValues: {
    order: 0,
    content: "",
    photo: "",
    background: "",
    numbers: [{ number: 0, title: "", prefix: "", video: "" }],
  },
  fieldArrays: ["numbers"],
};

export default function LocationForm({ initialData, onSubmit }: { initialData?: LocationSection; onSubmit: any }) {
  console.log(initialData);
  return (
    <DynamicForm
      title="Location Section"
      fields={formConfig.fields}
      onSubmit={onSubmit}
      defaultValues={initialData || formConfig.defaultValues}
    >
      {(control: any) => <ArrayFields config={formConfig} control={control} />}
    </DynamicForm>
  );
}
