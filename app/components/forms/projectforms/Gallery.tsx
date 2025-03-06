"use client";

import { z } from "zod";
import DynamicForm from "../DynamicForm";

const createGalleryForm = (name: string, label: string) => {
  return {
    fields: [
      {
        name,
        label,
        component: "photo",
        validation: z.array(z.string()).nonempty(),
      },
    ],
  };
};

export const DarkImagesForm = ({ initialData, onSubmit }) => {
  const handleSubmit = (data) => {
    return onSubmit(data.darkImages); // Extract only the array before submitting
  };

  return (
    <DynamicForm
      title="Dark Theme Gallery"
      {...createGalleryForm("darkImages", "Dark Mode Images")}
      onSubmit={handleSubmit}
      defaultValues={{ darkImages: initialData }}
    />
  );
};

export const LightImagesForm = ({ initialData, onSubmit }) => {
  const handleSubmit = (data) => {
    return onSubmit(data.lightImages); // Extract only the array before submitting
  };
  console.log(initialData);
  return (
    <DynamicForm
      title="Light Theme Gallery"
      {...createGalleryForm("lightImages", "Light Mode Images")}
      onSubmit={handleSubmit}
      defaultValues={{ lightImages: initialData }}
    />
  );
};
