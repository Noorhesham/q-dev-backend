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
  {
    name: "photo",
    label: "Main Photo",
    component: "photo",
    validation: z.string().min(1),
  },
];

const formConfig = {
  fields: [
    ...commonFields,
    {
      name: "background",
      label: "Background Image",
      component: "photo",
    },
    {
      name: "facilities",
      label: "Facilities List",
      component: "array",
      validation: z.array(
        z.object({
          title: z.string().min(2),
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
    facilities: [{ title: "", photo: "" }],
  },
  fieldArrays: ["facilities"],
};

export default function FacilitiesForm({ initialData, onSubmit }) {
  return (
    <DynamicForm
      title="Facilities Section"
      fields={formConfig.fields}
      onSubmit={onSubmit}
      defaultValues={initialData || formConfig.defaultValues}
    >
      {(control) => <ArrayFields config={formConfig} control={control} />}
    </DynamicForm>
  );
}
