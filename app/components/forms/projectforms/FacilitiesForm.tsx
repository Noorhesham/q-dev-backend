"use client";

import { z } from "zod";
import ArrayFields from "./ArrayFields";
import DynamicForm from "../DynamicForm";
import { FacilitiesSection } from "@/app/types";
import { commonFields } from "@/app/utils/validate";

const formConfig = {
  fields: [
    ...commonFields,
    // {
    //   name: "photo",
    //   label: "Main Photo",
    //   component: "photo",
    //   validation: z.string().min(1),
    // },
    {
      name: "background",
      label: "Background Image",
      component: "photo",
      validation: z.string().min(1),
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
    content: "",
    // photo: "",
    background: "",
    facilities: [{ title: "", photo: "" }],
  },
  fieldArrays: ["facilities"],
};

export default function FacilitiesForm({ initialData, onSubmit }: { initialData?: FacilitiesSection; onSubmit: any }) {
  return (
    <DynamicForm
      title="Facilities Section"
      fields={formConfig.fields}
      onSubmit={onSubmit}
      defaultValues={initialData || formConfig.defaultValues}
    >
      {(control: any) => <ArrayFields config={formConfig} control={control} />}
    </DynamicForm>
  );
}
