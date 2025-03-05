"use client";

import { z } from "zod";
import DynamicForm from "../DynamicForm";
import { createEntity } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

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
    title: "",
  },
};

export default function ProjectTitleForm({ id }: any) {
  const router = useRouter();
  const onSubmit = async (values) => {
    const project = await createEntity("Project", { title: values.title, place: id });
    router.refresh();
  };
  return (
    <DynamicForm
      title="Project Title"
      fields={formConfig.fields}
      onSubmit={onSubmit}
      submitButtonText={"Create Project"}
    />
  );
}
