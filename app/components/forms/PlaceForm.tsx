"use client";

import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { Button } from "@/components/ui/button";
import FormInput from "../inputs/FormInput";
import { createEntity, updateEntity } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

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
        label: "map photo",
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
        label: "Background photo",
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
  const router = useRouter();
  const handleSubmit = async (values: any) => {
    try {
      const result = initialData
        ? await updateEntity("Place", initialData._id, values)
        : await createEntity("Place", values);
      console.log(result);
      router.refresh();
      return result;
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
