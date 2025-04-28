import React from "react";
import DynamicForm from "../DynamicForm";
import { z } from "zod";

const formConfig = {
  fields: [
    {
      name: "photo",
      label: "photo",
      component: "photo",
      validation: z.string().min(1),
    },
    {
      name: "content",
      label: "Content",
      component: "textarea",
      validation: z.string().min(1),
    }
  ],
  defaultValues: {
    content: "",
    photo: "",
  },
};

const AboutProject = ({
  initialData,
  onSubmit,
}: {
  initialData?: { order: number; content: string; photo: string; background: string };
  onSubmit: any;
}) => {
  console.log(initialData);
  return (
    <DynamicForm
      title="About Section"
      fields={formConfig.fields}
      onSubmit={onSubmit}
      defaultValues={initialData || formConfig.defaultValues}
    />
  );
};

export default AboutProject;
