"use client";

import { useState } from "react";
import { z } from "zod";
import DynamicForm from "./DynamicForm";
import { Button } from "@/components/ui/button";
import FormInput from "../inputs/FormInput";
import { AboutUsSection, FormConfig, FormField, SectionType } from "@/app/types";
import { createEntity, updateEntity } from "@/app/actions/actions";
import { useFieldArray } from "react-hook-form";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SECTION_TYPES: { value: SectionType; label: string }[] = [
  { value: "special_numbers", label: "Special Numbers" },
  { value: "multi_stuff", label: "Mission/Vision" },
  { value: "ceo", label: "CEO" },
  { value: "board_members", label: "Board Members" },
  { value: "companies", label: "Companies" },
  { value: "certificates", label: "Certificates" },
];

interface AboutUsFormProps {
  // When editing, initialData is an object containing the section’s data and type.
  initialData?: AboutUsSection;
  onSuccess?: () => void;
}

export default function AboutUsForm({ initialData, onSuccess }: AboutUsFormProps) {
  // Use initialData type if provided, otherwise default to "special_numbers"
  const [activeTab, setActiveTab] = useState<SectionType>(initialData?.type || "special_numbers");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Returns configuration based on the section type.
  const getFormConfig = (type: SectionType): FormConfig => {
    const commonFields: FormField[] = [
      {
        name: "title",
        label: "Title",
        validation: z.string().min(2, { message: "Title must be at least 2 characters long." }),
      },
      {
        name: "background",
        label: "Background image",
        validation: z.string().min(2),
        component: "photo",
      },
      {
        name: "pageTitle",
        label: "page Title",
        validation: z.string().min(2, { message: "Title must be at least 2 characters long." }),
      },
      {
        name: "content",
        label: "Content",
        validation: z.string().min(10, { message: "Content must be at least 10 characters long." }),
        component: "textarea",
      },
    ];
    console.log(Object.values(commonFields));

    switch (type) {
      case "special_numbers":
        return {
          fields: [
            ...commonFields,
            {
              name: "numbers",
              label: "Numbers",
              component: "array",
              validation: z
                .array(
                  z.object({
                    number: z.union([
                      z.string().min(1, { message: "Number is required." }),
                      z.number().min(0, { message: "Number must be non-negative." }),
                    ]),
                    prefix: z.string().min(1, { message: "Prefix is required." }),
                    description: z.string().min(5, { message: "Description must be at least 5 characters." }),
                  })
                )
                .min(1, { message: "At least one number is required." }),
            },
          ],
          defaultValues: {
            numbers: [{ number: 0, prefix: "", description: "" }],
          },
          fieldArrays: ["numbers"],
        };

      case "multi_stuff":
        return {
          fields: [
            ...commonFields,
            {
              name: "items",
              label: "Items",
              component: "array",
              validation: z
                .array(
                  z.object({
                    photo: z.string(),
                    title: z.string().min(2, { message: "Title is required." }),
                    description: z.string().min(5, { message: "Description must be at least 5 characters." }),
                  })
                )
                .min(1, { message: "At least one item is required." }),
            },
          ],
          defaultValues: {
            items: [{ photo: "", title: "", description: "" }],
          },
          fieldArrays: ["items"],
          arrayFieldComponents: {
            "items.photo": "photo",
            "items.description": "textarea",
          },
        };

      case "ceo":
        return {
          fields: [
            ...commonFields,
            {
              name: "photo",
              label: "Photo",
              component: "photo",
              validation: z.string(),
              single: true,
            },
          ],
          defaultValues: {
            photo: "",
          },
          fieldArrays: [], // No array fields
          arrayFieldComponents: {
            "members.content": "textarea",
          },
        };

      case "board_members":
        return {
          fields: [
            ...Object.values(commonFields)
              .filter((field) => field.name !== "content") // Ensure field has a name property
              .map((field) => field), // No need to access `commonFields[f]`, since `field` is already the value

            {
              name: "members",
              label: "Members",
              component: "array",
              validation: z
                .array(
                  z.object({
                    photo: z.string(),
                    title: z.string().min(2, { message: "Title is required." }),
                    jobTitle: z.string().min(2, { message: "Job Title is required." }),
                    content: z.string().min(10, { message: "Content must be at least 10 characters." }),
                  })
                )
                .min(1, { message: "At least one member is required." }),
            },
          ],
          defaultValues: {
            members: [{ photo: "", title: "", jobTitle: "", content: "" }],
          },
          fieldArrays: ["members"],
          arrayFieldComponents: {
            "members.content": "textarea",
          },
        };

      case "companies":
        return {
          fields: [
            ...commonFields,
            {
              name: "companies",
              label: "Companies",
              component: "array",
              validation: z
                .array(
                  z.object({
                    photo: z.string(),
                    title: z.string().min(2, { message: "Title is required." }),
                    content: z.string().min(10, { message: "Content must be at least 10 characters." }),
                    sideImage: z.string(),
                  })
                )
                .min(1, { message: "At least one company is required." }),
            },
          ],
          defaultValues: {
            companies: [{ photo: "", title: "", content: "", sideImage: "" }],
          },
          fieldArrays: ["companies"],
          arrayFieldComponents: {
            "companies.content": "textarea",
            "companies.sideImage": "photo",
          },
        };

      case "certificates":
        return {
          fields: [
            ...commonFields,
            {
              name: "images",
              label: "Images",
              component: "photo",

              validation: z.array(z.string()).min(1, { message: "At least one certificate image is required." }),
            },
          ],
          defaultValues: {
            images: [""],
          },
        };
      default:
        return { fields: [], defaultValues: {}, fieldArrays: [] };
    }
  };

  // Called when the form is submitted.
  const handleSubmit = async (values: any) => {
    console.log(values);
    try {
      const newErrors: Record<string, string> = {};
      Object.keys(values).forEach((key) => {
        if (Array.isArray(values[key]) && values[key].length === 0) {
          newErrors[key] = "This field cannot be empty";
        }
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      console.log(values);
      const result = initialData
        ? await updateEntity("AboutUs", initialData._id, { ...values, type: activeTab })
        : await createEntity("AboutUs", { ...values, type: activeTab });
      console.log(result);
      return result;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // A separate component to render array fields so hooks are always called in the same order.
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
                      const isPhoto =
                        key === "photo" || key === "image" || key === "url" || key === "images" || key === "sideImage";
                      const componentType = config.arrayFieldComponents?.[`${fieldName}.${key}`] || undefined;
                      return (
                        <FormInput
                          single={key === "photo"|| key === "sideImage"}
                          photo={isPhoto}
                          key={`${fieldName}.${index}.${key}`}
                          name={`${fieldName}.${index}.${key}`}
                          area={componentType === "textarea"}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                      );
                    })
                  ) : (
                    // Render a single input if the field is a primitive (e.g., a string)
                    <FormInput photo={true} name={`${fieldName}.${index}`} label="Image" />
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

  // Returns the default item for array fields based on its name.
  const getDefaultItem = (fieldName: string) => {
    switch (fieldName) {
      case "numbers":
        return { number: 0, prefix: "", description: "" };
      case "items":
        return { photo: "", title: "", description: "" };
      case "members":
        return { photo: "", title: "", jobTitle: "", content: "" };
      case "companies":
        return { photo: "", title: "", content: "", sideImage: "" };

      default:
        return {};
    }
  };

  // Get the configuration for the current section type.
  const config = getFormConfig(activeTab);
  // Merge initialData with defaultValues (if editing)
  const mergedDefaults = initialData ? { ...config.defaultValues, ...initialData } : config.defaultValues;

  return (
    <MaxWidthWrapper className="space-y-6">
      <div className="mb-4">
        <label htmlFor="section-type" className="block mb-2">
          Select Section Type:
        </label>
        <Select value={activeTab} onValueChange={(value) => setActiveTab(value)} disabled={!!initialData}>
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
      {/* Use activeTab as key to force remount when type changes */}
      <DynamicForm
        key={activeTab}
        className="space-y-4 mt-20"
        fields={config.fields}
        onSubmit={handleSubmit}
        defaultValues={mergedDefaults}
        submitButtonText={
          activeTab === "ceo"
            ? "Save CEO Info"
            : `${initialData ? "Update" : "Add"} ${SECTION_TYPES.find((t) => t.value === activeTab)?.label}`
        }
      >
        {(control, getValues) => <ArrayFields config={config} control={control} />}
      </DynamicForm>
      {errors.someField && <span className="text-red-500">{errors.someField}</span>}
    </MaxWidthWrapper>
  );
}
