"use client";

import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { Button } from "@/components/ui/button";
import FormInput from "../inputs/FormInput";
import { createEntity, updateEntity } from "@/app/actions/actions";

interface PlaceFormProps {
  initialData?: any; // Replace with your Place type if available
  onSuccess?: () => void;
}

export default function PlaceForm({ initialData, onSuccess }: PlaceFormProps) {
  const placeFormConfig = {
    fields: [
      {
        name: "name",
        label: "Name",
        validation: z.string().min(2, { message: "Name must be at least 2 characters." }),
      },
      {
        name: "photo",
        label: "Photo",
        component: "photo",
        validation: z.string(),
        single: true,
      },
      {
        name: "description",
        label: "Description",
        component: "textarea",
        validation: z.string().min(10, { message: "Description must be at least 10 characters." }),
      },
      {
        name: "background",
        label: "Background",
        component: "photo",
        validation: z.string(),
        single: true,
      },
    ],
    defaultValues: {
      name: "",
      photo: "",
      description: "",
      background: "",
    },
    fieldArrays: [] as string[],
  };

  const handleSubmit = async (values: any) => {
    try {
      const result = values._id ? await updateEntity("Place", values._id, values) : await createEntity("Place", values);
      console.log(result);
      onSuccess?.();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <DynamicForm
      fields={placeFormConfig.fields}
      onSubmit={handleSubmit}
      defaultValues={initialData ? { ...placeFormConfig.defaultValues, ...initialData } : placeFormConfig.defaultValues}
      submitButtonText={initialData ? "Update Place" : "Add Place"}
    >
      {() => null}
    </DynamicForm>
  );
}
