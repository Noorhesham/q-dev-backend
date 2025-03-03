"use client";

import { useState } from "react";
import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { Button } from "@/components/ui/button";
import FormInput from "../inputs/FormInput";
import { FormConfig, FormField, ProjectSectionType } from "@/app/types";
import { createEntity, updateEntity } from "@/app/actions/actions";
import { useFieldArray } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SECTION_TYPES: { value: ProjectSectionType; label: string }[] = [
  { value: "about", label: "About Section" },
  { value: "location", label: "Location Section" },
  { value: "facilities", label: "Facilities Section" },
  { value: "master_plan", label: "Master Plan" },
  { value: "videos", label: "Videos Section" },
  { value: "gallery", label: "Gallery Section" },
];

interface ProjectFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export default function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState<ProjectSectionType>(initialData?.type || "about");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFormConfig = (type: ProjectSectionType): FormConfig => {
    const commonFields: FormField[] = [
      {
        name: "order",
        label: "Order",
        type: "number",
        validation: z.union([
          z.string().min(1, { message: "Order is required." }),
          z.number().min(0, { message: "Order must be a positive number." }),
        ]),
      },
      {
        name: "content",
        label: "Content",
        validation: z.string().min(10, { message: "Content must be at least 10 characters long." }),
        component: "textarea",
      },
      {
        name: "photo",
        label: "Photo URL",
        validation: z.string().min(1, { message: "Photo URL is required" }),
      },
    ];

    switch (type) {
      case "about":
        return {
          fields: [...commonFields],
          defaultValues: {
            order: 0,
            content: "",
            photo: "",
          },
          fieldArrays: [],
        };

      case "location":
        return {
          fields: [
            ...commonFields,
            {
              name: "numbers",
              label: "Special Numbers",
              component: "array",
              validation: z
                .array(
                  z.object({
                    number: z.union([
                      z.string().min(1, { message: "Number is required." }),
                      z.number().min(0, { message: "Number must be non-negative." }),
                    ]),
                    title: z.string().min(2, { message: "Title is required" }),
                    prefix: z.string().min(1, { message: "Prefix is required" }),
                    photo: z.string().min(1, { message: "Photo is required" }),
                  })
                )
                .min(1, { message: "At least one number is required" }),
            },
          ],
          defaultValues: {
            numbers: [{ number: 0, title: "", prefix: "", photo: "" }],
          },
          fieldArrays: ["numbers"],
        };

      case "facilities":
        return {
          fields: [
            ...commonFields,
            {
              name: "facilities",
              label: "Facilities",
              component: "array",
              validation: z
                .array(
                  z.object({
                    title: z.string().min(2, { message: "Title is required" }),
                    photo: z.string().min(1, { message: "Photo is required" }),
                  })
                )
                .min(1, { message: "At least one facility is required" }),
            },
          ],
          defaultValues: {
            facilities: [{ title: "", photo: "" }],
          },
          fieldArrays: ["facilities"],
        };

      case "videos":
        return {
          fields: [
            ...commonFields,
            {
              name: "videos",
              label: "Video URLs",
              component: "array",
              validation: z.array(z.string().url({ message: "Invalid URL format" })).min(1),
            },
          ],
          defaultValues: {
            videos: [""],
          },
          fieldArrays: ["videos"],
        };

      case "gallery":
        return {
          fields: [
            ...commonFields,
            {
              name: "images",
              label: "Gallery Images",
              component: "array",
              validation: z.array(z.string().url({ message: "Invalid URL format" })).min(1),
            },
          ],
          defaultValues: {
            images: [""],
          },
          fieldArrays: ["images"],
        };

      case "master_plan":
        return {
          fields: [...commonFields],
          defaultValues: {
            order: 0,
            content: "",
            photo: "",
          },
          fieldArrays: [],
        };

      default:
        return { fields: [], defaultValues: {}, fieldArrays: [] };
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const sectionData = {
        [activeTab]: values,
      };

      const result = initialData?._id
        ? await updateEntity("Project", initialData._id, { sections: sectionData })
        : await createEntity("Project", {
            title: "New Project", // Add title input field if needed
            sections: sectionData,
            place: "", // Add place selector if needed
          });

      onSuccess?.();
      return result;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const ArrayFields = ({ config, control }: { config: FormConfig; control: any }) => {
    const fieldArrays = config.fieldArrays || [];
    return (
      <>
        {fieldArrays.map((fieldName) => {
          const { fields, append, remove } = useFieldArray({
            control,
            name: fieldName,
          });

          return (
            <div key={fieldName} className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-lg space-y-2">
                  {typeof field === "object" && field !== null ? (
                    Object.keys(field).map((key) => {
                      if (key === "id") return null;
                      return (
                        <FormInput
                          key={`${fieldName}.${index}.${key}`}
                          name={`${fieldName}.${index}.${key}`}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          photo={key === "photo"}
                        />
                      );
                    })
                  ) : (
                    <FormInput name={`${fieldName}.${index}`} label="URL" />
                  )}
                  <Button type="button" variant="destructive" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => append(getDefaultItem(fieldName))}>
                Add {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
              </Button>
            </div>
          );
        })}
      </>
    );
  };

  const getDefaultItem = (fieldName: string) => {
    switch (fieldName) {
      case "numbers":
        return { number: 0, title: "", prefix: "", photo: "" };
      case "facilities":
        return { title: "", photo: "" };
      case "videos":
        return "";
      case "images":
        return "";
      default:
        return {};
    }
  };

  const config = getFormConfig(activeTab);
  const mergedDefaults = initialData?.sections?.[activeTab]
    ? { ...config.defaultValues, ...initialData.sections[activeTab] }
    : config.defaultValues;

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <label htmlFor="section-type" className="block mb-2">
          Select Project Section:
        </label>
        <Select value={activeTab} onValueChange={(value: ProjectSectionType) => setActiveTab(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a section type" />
          </SelectTrigger>
          <SelectContent>
            {SECTION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DynamicForm
        key={activeTab}
        className="space-y-4 mt-20"
        fields={config.fields}
        onSubmit={handleSubmit}
        defaultValues={mergedDefaults}
        submitButtonText={initialData ? "Update Section" : "Create Section"}
      >
        {(control, getValues) => <ArrayFields config={config} control={control} />}
      </DynamicForm>
    </div>
  );
}
