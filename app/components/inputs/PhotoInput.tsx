"use client";

import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Trash } from "lucide-react";
import { uploadPhotoAction } from "@/app/actions/upload";

interface ImageType {
  secure_url: string;
  publicId: string;
}

export const PhotoInput = ({ name, single = false }: { name: string; single?: boolean }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);

  // Ensure images are always stored as an array
  const watchedValue = watch(name);
  const currentImages: ImageType[] = Array.isArray(watchedValue) ? watchedValue : watchedValue ? [watchedValue] : [];

  const handleUpload = useCallback(
    async (files: FileList) => {
      try {
        setIsUploading(true);
        setValue("isUploading", true);

        const uploadPromises = Array.from(files).map(async (file) => {
          const formData = new FormData();
          formData.append("photo", file);
          const result = await uploadPhotoAction(formData);
          return result;
        });

        const results = await Promise.all(uploadPromises);

        setValue(name, single ? results[0] : [...currentImages, ...results]);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
        setValue("isUploading", false);
      }
    },
    [currentImages, name, setValue, single]
  );

  const handleDelete = (publicId: string) => {
    setValue(
      name,
      currentImages.filter((img) => img.publicId !== publicId)
    );
  };

  return (
    <div className="space-y-4 w-full">
      <Input
        type="file"
        multiple={!single}
        accept="image/*"
        disabled={isUploading}
        onChange={(e) => e.target.files && handleUpload(e.target.files)}
        className="cursor-pointer"
      />

      <div className="grid grid-cols-3 gap-4">
        {currentImages.map((image, index) => (
          <div key={image.publicId} className="relative w-full h-44 group">
            <Image
              src={image.secure_url}
              alt={`Upload ${index + 1}`}
              fill
              className="rounded-lg w-full object-cover aspect-square"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDelete(image.publicId)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {isUploading && <p className="text-sm text-muted-foreground">Uploading images...</p>}

      {/* Show validation error */}
    </div>
  );
};
