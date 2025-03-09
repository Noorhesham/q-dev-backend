"use client";

import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "../../inputs/FormInput";

export default function ArrayFields({ config, control }) {
  return (
    <>
      {config.fieldArrays?.map((fieldName) => {
        const { fields, append, remove } = useFieldArray({
          control,
          name: fieldName,
        });
        console.log(config);
        return (
          <div key={fieldName} className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="border p-4 rounded-lg space-y-2">
                {typeof field === "object" ? (
                  Object.keys(field).map(
                    (key) =>
                      key !== "id" && (
                        <FormInput
                          mediaType={key === "video" ? "video" : "image"}
                          key={`${fieldName}.${index}.${key}`}
                          name={`${fieldName}.${index}.${key}`}
                          single={key === "photo" || key === "video"}
                          label={key.charAt(0).toUpperCase() + key.slice(1)}
                          photo={key === "photo" || key === "video"}
                        />
                      )
                  )
                ) : (
                  <FormInput name={`${fieldName}.${index}`} label="URL" />
                )}
                <Button type="button" variant="destructive" onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={() => append(getDefaultItem(fieldName))}>
              Add {fieldName.replace(/_/g, " ")}
            </Button>
          </div>
        );
      })}
    </>
  );
}

function getDefaultItem(fieldName) {
  switch (fieldName) {
    case "numbers":
      return { number: 0, title: "", prefix: "", video: "" };
    case "facilities":
      return { title: "", photo: "" };
    default:
      return "";
  }
}
