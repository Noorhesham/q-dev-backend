"use client";

import { z } from "zod";
import ArrayFields from "./ArrayFields";
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
];

const formConfig = {
  fields: [
    ...commonFields,
    {
      name: "background",
      label: "Background",
      component: "photo",
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
          photo: z.string().min(1),
        })
      ),
    },
  ],
  defaultValues: {
    order: 0,
    content: "",
    photo: "",
    background: "",
    numbers: [{ number: 0, title: "", prefix: "", photo: "" }],
  },
  fieldArrays: ["numbers"],
};

export default function LocationForm({ initialData, onSubmit }) {
  console.log(initialData);
  return (
    <DynamicForm
      title="Location Section"
      fields={formConfig.fields}
      onSubmit={onSubmit}
      defaultValues={initialData || formConfig.defaultValues}
    >
      {(control) => <ArrayFields config={formConfig} control={control} />}
    </DynamicForm>
  );
}
