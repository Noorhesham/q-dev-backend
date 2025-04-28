"use client";

import { z } from "zod";
import DynamicForm from "../DynamicForm";
import { createEntity, updateEntity } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

export default function ProjectTitleForm({ id, initialData }: any) {
  const formConfig = {
    fields: [
      {
        name: "title",
        label: "Project Title",
        type: "text",
        validation: z.string().min(3),
      },
    ],
    defaultValues: {
      title: initialData?.title || "",
    },
  };
  const router = useRouter();
  console.log(initialData);
  const onSubmit = async (values) => {
    const project = initialData
      ? await updateEntity("Project", initialData._id, { title: values.title, place: id })
      : await createEntity("Project", { title: values.title, place: id });
    router.refresh();
    return project;
  };
  return (
    <DynamicForm
      title="Project Title"
      fields={formConfig.fields}
      onSubmit={onSubmit}
      defaultValues={formConfig.defaultValues}
      submitButtonText={"Create Project"}
    />
  );
}
