"use client";

import { z } from "zod";
import ArrayFields from "./ArrayFields";
import DynamicForm from "../DynamicForm";

export default function VideosForm({ initialData, onSubmit }: { initialData?: string[]; onSubmit: any }) {
  const handleSubmit = (data: any) => {
    return onSubmit(data.videos);
  };
  return (
    <DynamicForm
      title="Videos Section"
      fields={[
        {
          name: "videos",
          label: "Video URLs",
          component: "photo",
          validation: z.array(z.string()),
          mediaType: "video",
        },
      ]}
      onSubmit={handleSubmit}
      defaultValues={{ videos: initialData }}
    ></DynamicForm>
  );
}
