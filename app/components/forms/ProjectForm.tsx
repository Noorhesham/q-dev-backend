"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { createEntity, updateEntity } from "@/app/actions/actions";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import ProjectTitleForm from "./projectforms/ProjectTitle";
import LocationForm from "./projectforms/LocationForm";
import FacilitiesForm from "./projectforms/FacilitiesForm";
import MasterPlanForm from "./projectforms/MasterPlanForm";
import VideosForm from "./projectforms/VideoForm";
import { DarkImagesForm, LightImagesForm } from "./projectforms/Gallery";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const formComponents = {
  title: ProjectTitleForm,
  location: LocationForm,
  facilities: FacilitiesForm,
  videos: VideosForm,
  darkImages: DarkImagesForm,
  lightImages: LightImagesForm,
  master_plan: MasterPlanForm,
};

export default function ProjectEditor({ initialData }) {
  const { id } = useParams();
  const [projectId, setProjectId] = useState(initialData?._id);
  const [selectedForm, setSelectedForm] = useState("title");

  const handleSubmit = async (sectionType, values) => {
    try {
      const data = { title: values.title, [sectionType]: values };
      const result = await updateEntity("Project", projectId, data);
      return result;
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const SelectedFormComponent = formComponents[selectedForm];

  return (
    <MaxWidthWrapper className="space-y-8">
      <Select onValueChange={setSelectedForm} defaultValue={selectedForm}>
        <SelectTrigger>
          <SelectValue placeholder="Select a section" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(formComponents).map((key) => (
            <SelectItem key={key} value={key}>
              {key.replace("_", " ").toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {SelectedFormComponent && (
        <SelectedFormComponent
          initialData={initialData?.[selectedForm]}
          onSubmit={(values) => handleSubmit(selectedForm, values)}
        />
      )}
    </MaxWidthWrapper>
  );
}
